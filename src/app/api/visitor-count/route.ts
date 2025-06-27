import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { createHash } from 'crypto';

function getClientIP(request: NextRequest): string {
  // Get IP from various headers that Vercel might set
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const vercelForwardedFor = request.headers.get('x-vercel-forwarded-for');
  
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  if (vercelForwardedFor) {
    return vercelForwardedFor.split(',')[0].trim();
  }
  
  // Fallback to a default if no IP is found
  return 'unknown';
}

function hashIP(ip: string): string {
  // Hash the IP for privacy - we don't store actual IPs
  return createHash('sha256').update(ip + process.env.IP_SALT || 'default-salt').digest('hex');
}

export async function GET(request: NextRequest) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const clientIP = getClientIP(request);
    const hashedIP = hashIP(clientIP);
    
    // Create visitors table if it doesn't exist
    // await sql`
    //   CREATE TABLE IF NOT EXISTS visitors (
    //     id SERIAL PRIMARY KEY,
    //     hashed_ip VARCHAR(64) UNIQUE NOT NULL,
    //     first_visit TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    //     last_visit TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    //   )
    // `;
    
    // Check if this IP has visited before
    const existingVisitor = await sql`
      SELECT hashed_ip FROM visitors WHERE hashed_ip = ${hashedIP}
    `;
    
    const isNewVisitor = existingVisitor.length === 0;
    
    if (isNewVisitor) {
      // Add new visitor
      await sql`
        INSERT INTO visitors (hashed_ip) VALUES (${hashedIP})
      `;
    } else {
      // Update last visit time for existing visitor
      await sql`
        UPDATE visitors SET last_visit = CURRENT_TIMESTAMP WHERE hashed_ip = ${hashedIP}
      `;
    }
    
    // Get total visitor count
    const countResult = await sql`SELECT COUNT(*) as count FROM visitors`;
    const count = parseInt(countResult[0].count);
    
    return NextResponse.json({ 
      count,
      isNewVisitor
    });
    
  } catch (error) {
    console.error('Error in visitor count API:', error);
    return NextResponse.json({ 
      count: 0,
      isNewVisitor: false,
      error: 'Failed to get visitor count'
    }, { status: 500 });
  }
} 