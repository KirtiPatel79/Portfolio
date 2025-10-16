// app/api/analytics/route.ts (App Router)
import { NextRequest, NextResponse } from 'next/server';
import { getDeviceInfo, getClientIP } from '@/lib/deviceInfo'

interface AnalyticsPayload {
  eventType: 'button_click' | 'certification_verify' | 'certification_view' | 'custom';
  buttonName?: string;
  certificationTitle?: string;
  certificationIssuer?: string;
  page?: string;
  timestamp: string;
  userAgent: string;
  referrer: string;
  currentPage: string;
}

interface DiscordEmbed {
  title: string;
  description?: string;
  color: number;
  fields: Array<{
    name: string;
    value: string;
    inline?: boolean;
  }>;
  timestamp: string;
  footer?: {
    text: string;
  };
}


export async function POST(request: NextRequest) {
   const ip = getClientIP(request);
    const deviceInfo = getDeviceInfo(request);
  try {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error('Discord webhook URL not configured');
      return NextResponse.json(
        { error: 'Webhook not configured' },
        { status: 500 }
      );
    }

    const data: AnalyticsPayload = await request.json();

    // Create embed based on event type
    let embed: DiscordEmbed;

    switch (data.eventType) {
      case 'certification_verify':
        embed = {
          title: '🔍 Certification Verification Click',
          description: 'A user clicked to verify a certification',
          color: 0x5865F2,
          fields: [
            {
              name: '📜 Certification Details',
              value: [
                '```',
                '┌─────────────┬────────────────────────────┐',
                `│ Title       │ ${data.certificationTitle || 'Unknown'}`,
                `│ Issuer      │ ${data.certificationIssuer || 'Unknown'}`,
                '└─────────────┴────────────────────────────┘',
                '```'
              ].join('\n'),
              inline: false
            },
            {
              name: '🌐 Browser Information',
              value: [
                '```',
                '┌─────────────┬────────────────────────────┐',
                `│ Device      │ ${deviceInfo.deviceType}`,
                `│ Browser     │ ${deviceInfo.browser}`,
                `│ OS          │ ${deviceInfo.os}`,
                `│ Language    │ ${deviceInfo.language}`,
                '└─────────────┴────────────────────────────┘',
                '```'
              ].join('\n'),
              inline: false
            },
            {
              name: '📍 Location Details',
              value: [
                '```',
                '┌─────────────┬────────────────────────────┐',
                `│ IP Address  │ ${ip}`,
                `│ Page        │ ${data.currentPage}`,
                `│ Referrer    │ ${data.referrer || 'Direct'}`,
                `│ Time        │ ${new Date(data.timestamp).toLocaleString()}`,
                '└─────────────┴────────────────────────────┘',
                '```'
              ].join('\n'),
              inline: false
            }
          ],
          timestamp: data.timestamp,
          footer: {
            text: '📊 Portfolio Analytics • Tracked by kpatel.site'
          }
        };
        break;

      case 'certification_view':
        embed = {
          title: '📄 Certificate View Click',
          description: 'A user clicked to view a certificate',
          color: 0x57F287, // Green
          fields: [
            {
              name: '📜 Certification',
              value: data.certificationTitle || 'Unknown',
              inline: true
            },
            {
              name: '🏢 Issuer',
              value: data.certificationIssuer || 'Unknown',
              inline: true
            },
            {
              name: '📍 Page',
              value: data.currentPage,
              inline: false
            },
            {
              name: '🌐 User Agent',
              value: data.userAgent.substring(0, 100) + (data.userAgent.length > 100 ? '...' : ''),
              inline: false
            },
            {
              name: '🔗 Referrer',
              value: data.referrer,
              inline: true
            }
          ],
          timestamp: data.timestamp,
          footer: {
            text: 'Portfolio Analytics'
          }
        };
        break;

      case 'button_click':
        embed = {
          title: '🖱️ Button Click Tracked',
          description: `User interacted with: **${data.buttonName || 'Unknown Button'}**`,
          color: 0xFEE75C,
          fields: [
            {
              name: '🔘 Interaction Details',
              value: [
                '```',
                '┌─────────────┬───────────────────────┐',
                `│ Button      │ ${data.buttonName || 'Unknown'}`,
                `│ Page        │ ${data.page || data.currentPage}`,
                `│ Time        │ ${new Date(data.timestamp).toLocaleString()}`,
                '└─────────────┴───────────────────────┘',
                '```'
              ].join('\n'),
              inline: false
            },
            {
              name: '💻 System Information',
              value: [
                '```',
                '┌─────────────┬───────────────────────┐',
                `│ Device      │ ${deviceInfo.deviceType}`,
                `│ Browser     │ ${deviceInfo.browser}`,
                `│ OS          │ ${deviceInfo.os}`,
                '└─────────────┴───────────────────────┘',
                '```'
              ].join('\n'),
              inline: false
            },
            {
              name: '🌍 Network Details',
              value: [
                '```',
                '┌─────────────┬───────────────────────┐',
                `│ IP Address  │ ${ip}`,
                `│ Referrer    │ ${data.referrer || 'Direct'}`,
                '└─────────────┴───────────────────────┘',
                '```'
              ].join('\n'),
              inline: false
            }
          ],
          timestamp: data.timestamp,
          footer: {
            text: '📊 Click Analytics • Tracked by kpatel.site'
          }
        };
        break;

      case 'custom':
      default:
        embed = {
          title: '📊 Custom Event',
          description: 'A custom analytics event occurred',
          color: 0xEB459E, // Pink
          fields: [
            {
              name: '📍 Page',
              value: data.page || data.currentPage,
              inline: false
            },
            {
              name: '🌐 User Agent',
              value: data.userAgent.substring(0, 100) + (data.userAgent.length > 100 ? '...' : ''),
              inline: false
            }
          ],
          timestamp: data.timestamp,
          footer: {
            text: 'Analytics by kpatel.site'
          }
        };
    }

    // Send to Discord
    const discordResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'Portfolio Analytics',
        embeds: [embed]
      })
    });

    if (!discordResponse.ok) {
      console.error('Failed to send to Discord:', discordResponse.statusText);
      return NextResponse.json(
        { error: 'Failed to send to Discord' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in analytics API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}