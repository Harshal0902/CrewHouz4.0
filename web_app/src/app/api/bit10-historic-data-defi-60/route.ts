import { NextResponse } from 'next/server';

export const revalidate = 600;

export async function GET() {
    const url = 'https://testnet.bit10.app/bit10-historic-data-defi-60';
    try {
        const res = await fetch(url);
        const data = await res.json();
        return NextResponse.json(data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error fetching data' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
