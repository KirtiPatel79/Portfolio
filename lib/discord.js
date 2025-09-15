export async function sendDiscordWebhook(webhookUrl, data, type = 'form') {
  try {
    // Fetch IP details first
    const ipDetails = await getIPDetails(data.ip);
    let embed;

    if (type === 'form') {
      // Create a formatted message block for better readability
      const messagePreview = data.message?.length > 100
        ? data.message.substring(0, 100) + '...'
        : data.message || 'No message provided'

      const userDetailsCode = `IP: ${data.ip || 'Unknown'}
Device: ${data.deviceInfo.deviceType} | ${data.deviceInfo.browser} | ${data.deviceInfo.os}
Language: ${data.deviceInfo.language}
Timestamp: ${new Date(data.deviceInfo.timestamp).toLocaleString()}`

      const fullMessageCode = `From: ${data.name} <${data.email}>
Message: "${data.message || 'No message provided'}"`

      embed = {
        title: "🎉 New Contact Form Submission",
        description: `**${data.name}** just submitted a contact form!`,
        color: 0x4CAF50, // Material Design Green
        thumbnail: {
          url: "https://cdn-icons-png.flaticon.com/512/3059/3059989.png" // Contact form icon
        },
        fields: [
          {
            name: "👤 Contact Information",
            value: `**Name:** ${data.name || 'Not provided'}\n**Email:** ${data.email || 'Not provided'}`,
            inline: false
          },
          {
            name: "💬 Message Preview",
            value: `\`\`\`\n${messagePreview}\n\`\`\``,
            inline: false
          },
          {
            name: "🔍 Technical Details",
            value: `\`\`\`yaml\n${userDetailsCode}\n\`\`\``,
            inline: false
          },
          {
            name: "📱 Device Info",
            value: `${data.deviceInfo.deviceType === 'Mobile' ? '📱' : data.deviceInfo.deviceType === 'Tablet' ? '📱' : '💻'} ${data.deviceInfo.deviceType}\n🌐 ${data.deviceInfo.browser}\n⚙️ ${data.deviceInfo.os}`,
            inline: true
          },
          {
            name: "🌍 Location & Network",
            value: `🔗 IP: \`${data.ip || 'Unknown'}\`\n🗣️ ${data.deviceInfo.language}\n📍`,
            inline: true
          }
        ],
        footer: {
          text: "✨ Contact Form Tracker • kpatel.site",
          icon_url: "https://cdn-icons-png.flaticon.com/512/3094/3094829.png"
        },
        timestamp: new Date().toISOString(),
        author: {
          name: "Website Contact System",
          icon_url: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        }
      }
    } else if (type === 'visitor') {
      // Create formatted table-like strings
      const basicInfo = [
        '```',
        '│ Page    │ ' + (data.page || 'Unknown'),
        '│ Source  │ ' + (data.referrer || 'Direct Visit'),
        '│ Time    │ ' + new Date(data.deviceInfo.timestamp).toLocaleString(),
        '```'
      ].join('\n');

      const deviceInfo = [
        '```',
        '│ Device  │ ' + data.deviceInfo.deviceType,
        '│ Browser │ ' + data.deviceInfo.browser,
        '│ OS      │ ' + data.deviceInfo.os,
        '│ Lang    │ ' + data.deviceInfo.language,
        '```'
      ].join('\n');

      const locationInfo = ipDetails ? [
        '```',
        '│ IP      │ ' + data.ip,
        '│ City    │ ' + ipDetails.city,
        '│ Region  │ ' + ipDetails.region,
        '│ Country │ ' + ipDetails.country,
        '│ ISP     │ ' + ipDetails.isp,
        '│ Coords  │ ' + ipDetails.location,
        '```'
      ].join('\n') : '```\nLocation data unavailable\n```';

      const networkStatus = [
        ipDetails?.proxy ? '🔒 VPN/Proxy Detected' : '✅ Direct Connection(No VPN/Proxy detected)',
        ipDetails?.mobile ? '📱 Mobile Network' : '🖥️ Wifi/Fixed Network',
        ipDetails?.hosting ? '☁️ Hosting/Datacenter' : '🏠 Regular Network(Hosting/Datacenter not detected)'
      ].join('\n');

      embed = {
        title: `${getVisitorEmoji(data.referrer)} New Website Visit`,
        description: `Visitor from **${ipDetails?.city || 'Unknown Location'}** viewing **${data.page}**`,
        color: getColorByReferrer(data.referrer),
        fields: [
          {
            name: "📌 Visit Details",
            value: basicInfo,
            inline: false
          },
          {
            name: "💻 System Information",
            value: deviceInfo,
            inline: true
          },
          {
            name: "🌍 Location Data",
            value: locationInfo,
            inline: true
          },
          {
            name: "🔍 Network Analysis",
            value: networkStatus,
            inline: false
          }
        ],
        thumbnail: {
          url: getDeviceIcon(data.deviceInfo.deviceType)
        },
        footer: {
          text: `IP: ${data.ip} • Analytics by kpatel.site`,
          icon_url: "https://cdn-icons-png.flaticon.com/512/1947/1947128.png"
        },
        timestamp: new Date().toISOString()
      }
    }

    const payload = {
      embeds: [embed]
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Discord webhook failed: ${response.statusText}`);
    }
  } catch (error) {
    // Handle errors silently or log to a monitoring service
  }
}

// First, let's add a new function to fetch IP details

async function getIPDetails(ip) {
  const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,isp,org,as,mobile,proxy,hosting,query`);
  const data = await response.json();

  if (data.status === 'success') {
    return {
      city: data.city || 'Unknown',
      region: data.regionName || 'Unknown',
      country: data.country || 'Unknown',
      timezone: data.timezone || 'Unknown',
      isp: data.isp || 'Unknown',
      org: data.org || 'Unknown',
      proxy: data.proxy,
      mobile: data.mobile,
      hosting: data.hosting,
      location: `${data.lat},${data.lon}`
    };
  }
  return null;
}

// Optional: Enhanced version with geolocation (requires IP geolocation service)
export async function sendEnhancedDiscordWebhook(webhookUrl, data, type = 'form') {
  try {
    // Get location info from IP (you can use services like ipapi.co, ipinfo.io)
    let locationInfo = 'Unknown';
    const geoResponse = await fetch(`https://ipapi.co/${data.ip}/json/`);
    if (geoResponse.ok) {
      const geoData = await geoResponse.json();
      locationInfo = `${geoData.city || 'Unknown'}, ${geoData.region || ''} ${geoData.country_name || ''}`;
    }

    let embed

    if (type === 'form') {
      const messagePreview = data.message?.length > 150
        ? data.message.substring(0, 150) + '...'
        : data.message || 'No message provided'

      const technicalDetails = `🌐 IP Address: ${data.ip || 'Unknown'}
📍 Location: ${locationInfo}
💻 Device: ${data.deviceInfo.deviceType}
🌍 Browser: ${data.deviceInfo.browser}
⚙️ System: ${data.deviceInfo.os}
🗣️ Language: ${data.deviceInfo.language}
⏰ Submitted: ${new Date(data.deviceInfo.timestamp).toLocaleString()}
🔧 User Agent: ${data.deviceInfo.userAgent.substring(0, 80)}...`

      embed = {
        title: "🎉 New Contact Form Submission Received!",
        description: `**${data.name}** has reached out through your website contact form.`,
        color: 0x4CAF50,
        thumbnail: {
          url: "https://cdn-icons-png.flaticon.com/512/2343/2343701.png"
        },
        fields: [
          {
            name: "👤 Contact Details",
            value: `**Name:** ${data.name || 'Not provided'}\n**Email:** \`${data.email || 'Not provided'}\``,
            inline: false
          },
          {
            name: "💬 Message Content",
            value: `\`\`\`\n${messagePreview}\n\`\`\``,
            inline: false
          },
          {
            name: "📊 Technical Information",
            value: `\`\`\`yaml\n${technicalDetails}\n\`\`\``,
            inline: false
          },
          {
            name: "📱 Quick Stats",
            value: `${data.deviceInfo.deviceType === 'Mobile' ? '📱 Mobile' : data.deviceInfo.deviceType === 'Tablet' ? '📱 Tablet' : '💻 Desktop'} • ${data.deviceInfo.browser} • ${locationInfo}`,
            inline: false
          }
        ],
        footer: {
          text: "✨ Contact Form System • Powered by Next.js",
          icon_url: "https://cdn-icons-png.flaticon.com/512/3094/3094829.png"
        },
        timestamp: new Date().toISOString(),
        author: {
          name: "kpatel.site - Contact System",
          icon_url: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
          url: "https://kpatel.site"
        }
      }
    } else if (type === 'visitor') {
      // Create formatted table-like strings
      const basicInfo = [
        '```',
        '│ Page    │ ' + (data.page || 'Unknown'),
        '│ Source  │ ' + (data.referrer || 'Direct Visit'),
        '│ Time    │ ' + new Date(data.deviceInfo.timestamp).toLocaleString(),
        '```'
      ].join('\n');

      const deviceInfo = [
        '```',
        '│ Device  │ ' + data.deviceInfo.deviceType,
        '│ Browser │ ' + data.deviceInfo.browser,
        '│ OS      │ ' + data.deviceInfo.os,
        '│ Lang    │ ' + data.deviceInfo.language,
        '```'
      ].join('\n');

      const locationInfo = ipDetails ? [
        '```',
        '│ IP      │ ' + data.ip,
        '│ City    │ ' + ipDetails.city,
        '│ Region  │ ' + ipDetails.region,
        '│ Country │ ' + ipDetails.country,
        '│ ISP     │ ' + ipDetails.isp,
        '│ Coords  │ ' + ipDetails.location,
        '```'
      ].join('\n') : '```\nLocation data unavailable\n```';

      const networkStatus = [
        ipDetails?.proxy ? '🔒 VPN/Proxy Detected' : '✅ Direct Connection',
        ipDetails?.mobile ? '📱 Mobile Network' : '🖥️ Fixed Network',
        ipDetails?.hosting ? '☁️ Hosting/Datacenter' : '🏠 Regular Network'
      ].join('\n');

      embed = {
        title: `${getVisitorEmoji(data.referrer)} New Website Visit`,
        description: `Visitor from **${ipDetails?.city || 'Unknown Location'}** viewing **${data.page}**`,
        color: getColorByReferrer(data.referrer),
        fields: [
          {
            name: "📌 Visit Details",
            value: basicInfo,
            inline: false
          },
          {
            name: "💻 System Information",
            value: deviceInfo,
            inline: true
          },
          {
            name: "🌍 Location Data",
            value: locationInfo,
            inline: true
          },
          {
            name: "🔍 Network Analysis",
            value: networkStatus,
            inline: false
          }
        ],
        thumbnail: {
          url: getDeviceIcon(data.deviceInfo.deviceType)
        },
        footer: {
          text: `IP: ${data.ip} • Analytics by kpatel.site`,
          icon_url: "https://cdn-icons-png.flaticon.com/512/1947/1947128.png"
        },
        timestamp: new Date().toISOString()
      }
    }

    const payload = {
      embeds: [embed]
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Discord webhook failed: ${response.statusText}`);
    }
  } catch (error) {
    // Handle errors silently or log to a monitoring service
  }
}

function getVisitorEmoji(referrer) {
  if (!referrer || referrer === 'Direct') return '👤';
  if (referrer.includes('google')) return '🔍';
  if (referrer.includes('facebook')) return '📱';
  if (referrer.includes('twitter')) return '🐦';
  if (referrer.includes('linkedin')) return '💼';
  return '🔗';
}

function getColorByReferrer(referrer) {
  if (!referrer || referrer === 'Direct') return 0x2196F3; // Blue
  if (referrer.includes('google')) return 0x4CAF50; // Green
  if (referrer.includes('facebook')) return 0x1877F2; // Facebook Blue
  if (referrer.includes('twitter')) return 0x1DA1F2; // Twitter Blue
  if (referrer.includes('linkedin')) return 0x0A66C2; // LinkedIn Blue
  return 0x9C27B0; // Purple for other sources
}

function getDeviceIcon(deviceType) {
  switch (deviceType.toLowerCase()) {
    case 'mobile':
      return "https://cdn-icons-png.flaticon.com/512/545/545245.png";
    case 'tablet':
      return "https://cdn-icons-png.flaticon.com/512/573/573169.png";
    default:
      return "https://cdn-icons-png.flaticon.com/512/3474/3474360.png";
  }
}