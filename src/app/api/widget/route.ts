import { NextResponse } from 'next/server';
import { WidgetData, WidgetType } from '../../types';

export async function GET(request: Request) {

    const apiUrl = `https://tradeinformer.com/wp-json/banner-ads/v1/list`;
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);

        const banners: WidgetData[] = await response.json();

        const headers = {
            'Content-Type': 'application/json',
            // Allow all origins (useful in development, but consider restricting in production)
            'Access-Control-Allow-Origin': '*', 
            // 'Access-Control-Allow-Origin': 'www.tradeinformer.com',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        };

        return NextResponse.json(banners, { headers });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch banners' }, { status: 500 });
    }
}