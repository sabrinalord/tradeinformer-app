import { NextResponse } from 'next/server';
import { WidgetData} from '../../types';

export async function GET() {

    const apiUrl = `https://slothadmin.tradeinformer.com/wp-json/banner-ads/v1/list`;
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);

        const banners: WidgetData[] = await response.json();

        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': process.env.NODE_ENV === 'development' 
            ? 'http://localhost:3000' 
             : 'https://www.tradeinformer.com',  
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',  // Enforces HTTPS connections
            'X-Content-Type-Options': 'nosniff',  // Prevents MIME type sniffing, which helps to prevent XSS
            'X-Frame-Options': 'DENY',  // Prevents page to be embedded in an iframe
            'X-XSS-Protection': '1; mode=block',  
            'Referrer-Policy': 'strict-origin-when-cross-origin',  // Ensures that referrer headers are sent securely
            'Cache-Control': 'no-store, max-age=0, must-revalidate', // Prevent caching for sensitive API data 
            'Pragma': 'no-cache',  // Prevents caching for older HTTP/1.0 caches
            'Expires': '0',  // Ensures that caches do not store sensitive data
        };

        return NextResponse.json(banners, { headers });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch banners' }, { status: 500 });
    }
}