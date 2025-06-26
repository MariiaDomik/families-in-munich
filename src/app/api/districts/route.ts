import { NextResponse } from 'next/server';
import getDistricts from '@/actions/district';

export async function GET() {
  try {
    const districts = await getDistricts();
    return NextResponse.json(districts);
  } catch (error) {
    console.error('Error fetching districts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch districts' },
      { status: 500 }
    );
  }
} 