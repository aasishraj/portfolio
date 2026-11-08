import type { APIRoute } from 'astro';
import { neon } from '@neondatabase/serverless';
import { createHash } from 'node:crypto';

export const prerender = false;

function getClientIP(headers: Headers): string {
  const forwardedFor = headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0].trim();
  const realIP = headers.get('x-real-ip');
  if (realIP) return realIP;
  const cfConnectingIP = headers.get('cf-connecting-ip');
  if (cfConnectingIP) return cfConnectingIP;
  return 'unknown';
}

function hashIP(ip: string): string {
  const salt = process.env.IP_SALT || 'default-salt';
  return createHash('sha256').update(ip + salt).digest('hex');
}

export const GET: APIRoute = async ({ request }) => {
  try {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      console.warn('DATABASE_URL is not configured');
      return new Response(
        JSON.stringify({ count: 0, isNewVisitor: false, error: 'DATABASE_URL not configured' }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const sql = neon(databaseUrl);
    const clientIP = getClientIP(request.headers);
    const hashedIP = hashIP(clientIP);

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
    const count = parseInt(countResult[0].count, 10);

    return new Response(
      JSON.stringify({
        count,
        isNewVisitor,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    );
  } catch (error) {
    console.error('Error in visitor count API:', error);
    return new Response(
      JSON.stringify({
        count: 0,
        isNewVisitor: false,
        error: 'Failed to get visitor count',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
