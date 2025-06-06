import { NextResponse } from 'next/server';

// Helper to get API URL
const getApiUrl = (path = '') => {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'http://localhost:5000/api' 
    : 'http://localhost:5000/api';
  return `${baseUrl}${path}`;
};

// GET all tasks
export async function GET() {
  try {
    const res = await fetch(getApiUrl('/tasks'), {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch tasks' },
        { status: res.status }
      );
    }
    
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST new task
export async function POST(request) {
  try {
    const body = await request.json();
    
    const res = await fetch(getApiUrl('/tasks'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to create task' },
        { status: res.status }
      );
    }
    
    const data = await res.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}