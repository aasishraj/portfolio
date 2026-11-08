import type { APIRoute } from 'astro';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

export const prerender = false;

interface VisitorData {
  count: number;
  visitors: Record<string, string>; // hashed_ip -> timestamp
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'visitors.json');

function ensureDataFile(): VisitorData {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DATA_FILE)) {
    const initial: VisitorData = { count: 0, visitors: {} };
    fs.writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2), 'utf-8');
    return initial;
  }

  try {
    const content = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(content) as VisitorData;
  } catch (err) {
    console.error('Failed to parse visitors.json, resetting', err);
    const initial: VisitorData = { count: 0, visitors: {} };
    fs.writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2), 'utf-8');
    return initial;
  }
}

function saveVisitorData(data: VisitorData) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const tempFile = `${DATA_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempFile, DATA_FILE);
  } catch (err) {
    console.error('Failed to save visitor data', err);
  }
}

function getClientIP(headers: Headers): string {
  const forwardedFor = headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0].trim();
  const realIP = headers.get('x-real-ip');
  if (realIP) return realIP;
  const cfConnectingIP = headers.get('cf-connecting-ip');
  if (cfConnectingIP) return cfConnectingIP;
  return '127.0.0.1';
}

function hashIP(ip: string): string {
  const salt = process.env.IP_SALT || 'portfolio-salt-aasishraj';
  return createHash('sha256').update(ip + salt).digest('hex');
}

export const GET: APIRoute = async ({ request }) => {
  try {
    const clientIP = getClientIP(request.headers);
    const hashedIP = hashIP(clientIP);

    const data = ensureDataFile();
    const isNewVisitor = !data.visitors[hashedIP];

    data.visitors[hashedIP] = new Date().toISOString();
    if (isNewVisitor) {
      data.count += 1;
      saveVisitorData(data);
    }

    return new Response(
      JSON.stringify({
        count: data.count,
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
      JSON.stringify({ count: 0, isNewVisitor: false, error: 'Internal error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
