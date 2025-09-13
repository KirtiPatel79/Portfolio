export async function sendDiscordWebhook(webhookUrl, data, type = 'form') {
  try {
    let embed

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
      const visitorDetailsCode = `IP: ${data.ip || 'Unknown'}
Page: ${data.page || 'Unknown'}
Referrer: ${data.referrer || 'Direct'}
Device: ${data.deviceInfo.deviceType} | ${data.deviceInfo.browser}
OS: ${data.deviceInfo.os}
Language: ${data.deviceInfo.language}
Time: ${new Date(data.deviceInfo.timestamp).toLocaleString()}`

      // Determine visitor type emoji based on referrer
      let visitorTypeEmoji = '👤'
      let visitorSource = 'Direct Visit'

      if (data.referrer && data.referrer !== 'Direct') {
        if (data.referrer.includes('google')) {
          visitorTypeEmoji = '🔍'
          visitorSource = 'Google Search'
        } else if (data.referrer.includes('facebook') || data.referrer.includes('twitter') || data.referrer.includes('linkedin')) {
          visitorTypeEmoji = '📱'
          visitorSource = 'Social Media'
        } else {
          visitorTypeEmoji = '🔗'
          visitorSource = 'External Link'
        }
      }

      embed = {
        title: `${visitorTypeEmoji} New Website Visitor`,
        description: `Someone visited **${data.page}** via *${visitorSource}*`,
        color: 0x2196F3, // Material Design Blue
        thumbnail: {
          url: data.deviceInfo.deviceType === 'Mobile' ?
            "https://cdn-icons-png.flaticon.com/512/3659/3659898.png" :
            "https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
        },
        fields: [
          {
            name: "📄 Page Visited",
            value: `\`${data.page || 'Unknown'}\``,
            inline: true
          },
          {
            name: "🔗 Traffic Source",
            value: data.referrer === 'Direct' ? '🎯 Direct Traffic' : `🔗 [${data.referrer}](${data.referrer})`,
            inline: true
          },
          {
            name: "📊 Session Details",
            value: `\`\`\`yaml\n${visitorDetailsCode}\n\`\`\``,
            inline: false
          },
          {
            name: "💻 Device & Browser",
            value: `${data.deviceInfo.deviceType === 'Mobile' ? '📱' : data.deviceInfo.deviceType === 'Tablet' ? '📱' : '💻'} ${data.deviceInfo.deviceType}\n🌐 ${data.deviceInfo.browser} on ${data.deviceInfo.os}`,
            inline: true
          },
          {
            name: "🌍 Network Info",
            value: `🔗 \`${data.ip || 'Unknown'}\`\n🗣️ ${data.deviceInfo.language}\n⏰ ${new Date(data.deviceInfo.timestamp).toLocaleTimeString()}`,
            inline: true
          }
        ],
        footer: {
          text: "👀 Visitor Analytics • Real-time Tracking",
          icon_url: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
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
    })

    if (!response.ok) {
      console.error('Discord webhook failed:', response.statusText)
    } else {
      console.log(`✅ Discord ${type} notification sent successfully`)
    }
  } catch (error) {
    console.error('Error sending Discord webhook:', error)
  }
}

// Optional: Enhanced version with geolocation (requires IP geolocation service)
export async function sendEnhancedDiscordWebhook(webhookUrl, data, type = 'form') {
  try {
    // Get location info from IP (you can use services like ipapi.co, ipinfo.io)
    let locationInfo = 'Unknown'
    try {
      const geoResponse = await fetch(`https://ipapi.co/${data.ip}/json/`)
      if (geoResponse.ok) {
        const geoData = await geoResponse.json()
        locationInfo = `${geoData.city || 'Unknown'}, ${geoData.region || ''} ${geoData.country_name || ''}`
      }
    } catch (geoError) {
      console.log('Could not fetch location data')
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
      const sessionDetails = `🌐 IP Address: ${data.ip || 'Unknown'}
📍 Location: ${locationInfo}
📄 Page Visited: ${data.page || 'Unknown'}
🔗 Came From: ${data.referrer || 'Direct Traffic'}
💻 Device Type: ${data.deviceInfo.deviceType}
🌍 Browser: ${data.deviceInfo.browser}
⚙️ OS: ${data.deviceInfo.os}
🗣️ Language: ${data.deviceInfo.language}
⏰ Visit Time: ${new Date(data.deviceInfo.timestamp).toLocaleString()}`

      let visitorIcon = '👤'
      let sourceDescription = 'Direct visitor'

      if (data.referrer && data.referrer !== 'Direct') {
        if (data.referrer.includes('google')) {
          visitorIcon = '🔍'
          sourceDescription = 'Found via Google Search'
        } else if (data.referrer.includes('social')) {
          visitorIcon = '📱'
          sourceDescription = 'Social media referral'
        } else {
          visitorIcon = '🔗'
          sourceDescription = 'External website referral'
        }
      }

      embed = {
        title: `${visitorIcon} New Website Visitor Detected`,
        description: `${sourceDescription} • Viewing **${data.page}**`,
        color: 0x2196F3,
        thumbnail: {
          url: data.deviceInfo.deviceType === 'Mobile' ?
            "https://cdn-icons-png.flaticon.com/512/3659/3659898.png" :
            "https://cdn-icons-png.flaticon.com/512/1055/1055687.png"
        },
        fields: [
          {
            name: "📍 Visit Details",
            value: `**Page:** \`${data.page}\`\n**Source:** ${data.referrer === 'Direct' ? '🎯 Direct' : `🔗 ${data.referrer}`}\n**Location:** ${locationInfo}`,
            inline: false
          },
          {
            name: "📊 Session Information",
            value: `\`\`\`yaml\n${sessionDetails}\n\`\`\``,
            inline: false
          },
          {
            name: "💻 Device Summary",
            value: `${data.deviceInfo.deviceType === 'Mobile' ? '📱' : '💻'} ${data.deviceInfo.deviceType} • ${data.deviceInfo.browser} • ${data.deviceInfo.os}`,
            inline: false
          }
        ],
        footer: {
          text: "👀 Real-time Analytics • Visitor Tracking System",
          icon_url: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
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
    })

    if (!response.ok) {
      console.error('Discord webhook failed:', response.statusText)
    } else {
      console.log(`✅ Enhanced Discord ${type} notification sent successfully`)
    }
  } catch (error) {
    console.error('Error sending enhanced Discord webhook:', error)
  }
}