import { NextResponse } from 'next/server';

// Helper to get API URL
const getApiUrl = (path = '') => {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'http://localhost:5000/api' 
    : 'http://localhost:5000/api';
  return `${baseUrl}${path}`;
};

// GET single task
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const res = await fetch(getApiUrl(`/tasks/${id}`), {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      return NextResponse.json(
        { error: 'Task not found' },
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

// PUT update task
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    
    const res = await fetch(getApiUrl(`/tasks/${id}`), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to update task' },
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

// DELETE task
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    const res = await fetch(getApiUrl(`/tasks/${id}`), {
      method: 'DELETE',
    });
    
    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to delete task' },
        { status: res.status }
      );
    }
    
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}