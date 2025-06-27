import { NextRequest, NextResponse } from 'next/server';
import { get } from '@vercel/edge-config';
import { createHash } from 'crypto';

interface VisitorData {
  count: number;
  ips: Record<string, string>;
}

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
    const clientIP = getClientIP(request);
    const hashedIP = hashIP(clientIP);
    
    // Get current visitor data from Edge Config
    let visitorData: VisitorData;
    try {
      visitorData = await get('visitors') as VisitorData || { count: 0, ips: {} };
    } catch (error) {
      // If Edge Config is not set up yet, return current count as 0
      console.log('Edge Config not accessible:', error);
      visitorData = { count: 0, ips: {} };
    }
    
    // Check if this IP has visited before
    const isNewVisitor = !visitorData.ips[hashedIP];
    
    if (isNewVisitor) {
      // Add new visitor
      visitorData.count += 1;
      visitorData.ips[hashedIP] = new Date().toISOString();
      
      // Update Edge Config via Vercel API
      try {
        const edgeConfigId = process.env.EDGE_CONFIG_ID;
        const vercelToken = process.env.VERCEL_ACCESS_TOKEN;
        
        if (edgeConfigId && vercelToken) {
          const response = await fetch(
            `https://api.vercel.com/v1/edge-config/${edgeConfigId}/items`,
            {
              method: 'PATCH',
              headers: {
                'Authorization': `Bearer ${vercelToken}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                items: [
                  {
                    operation: 'upsert',
                    key: 'visitors',
                    value: visitorData
                  }
                ]
              })
            }
          );
          
          if (!response.ok) {
            console.error('Failed to update Edge Config:', await response.text());
          }
        }
      } catch (error) {
        console.error('Failed to update visitor count:', error);
        // Don't fail the request if Edge Config is not available
      }
    }
    
    return NextResponse.json({ 
      count: visitorData.count,
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