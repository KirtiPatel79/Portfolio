import { NextResponse } from 'next/server'
import { getDeviceInfo, getClientIP } from '@/lib/deviceInfo'
import { sendDiscordWebhook } from '@/lib/discord'

export async function POST(request) {
  try {
    const { page, referrer } = await request.json()
    const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL

    if (!DISCORD_WEBHOOK_URL) {
      return NextResponse.json(
        { message: 'Discord webhook not configured' },
        { status: 500 }
      )
    }

    // Get IP and device info
    const ip = getClientIP(request);
    const deviceInfo = getDeviceInfo(request);

    // Check if IP is a localhost/loopback address
    const isLocalIP = /^(::1|127\.0\.0\.1|localhost|::ffff:127\.0\.0\.1)$/.test(ip);

    // Skip sending webhook if local IP
    if (!isLocalIP) {
      // Send Discord notification for visitor
      await sendDiscordWebhook(DISCORD_WEBHOOK_URL, {
        ip,
        deviceInfo,
        page,
        referrer
      }, 'visitor');
    }

    return NextResponse.json(
      { message: 'Visitor tracked successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error tracking visitor:', error)
    return NextResponse.json(
      { message: 'Failed to track visitor' },
      { status: 500 }
    )
  }
}