import { NextResponse } from 'next/server';
import { getAllEvents } from '@/actions/events';

export async function GET() {
  try {
    const events = await getAllEvents();
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
} 