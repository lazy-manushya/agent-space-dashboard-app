import { NextRequest, NextResponse } from 'next/server';
import { StreamChat } from 'stream-chat';
import { STREAM_CONFIG } from '../../../config/stream';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Validate Stream.io configuration
    if (!STREAM_CONFIG.apiKey || !STREAM_CONFIG.secret) {
      return NextResponse.json(
        { error: 'Stream.io configuration is incomplete' },
        { status: 500 }
      );
    }

    // Create server-side Stream client
    const serverClient = StreamChat.getInstance(
      STREAM_CONFIG.apiKey,
      STREAM_CONFIG.secret
    );

    // Generate JWT token for the user
    const token = serverClient.createToken(userId);

    return NextResponse.json({ token });
  } catch (error) {
    console.error('Error generating Stream token:', error);
    return NextResponse.json(
      { error: 'Failed to generate token' },
      { status: 500 }
    );
  }
}