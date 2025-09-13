import { NextResponse } from "next/server";
import { getDeviceInfo, getClientIP } from '@/lib/deviceInfo'
import { sendDiscordWebhook } from '@/lib/discord'

export async function POST(request) {
  try {
    const {
      name,
      email,
      message,
      "h-captcha-response": hCaptchaToken,
    } = await request.json();
    const ACCESS_KEY = process.env.WEB3FORMS_ACCESS_KEY;
    const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

    if (!ACCESS_KEY) {
      return NextResponse.json(
        { message: "API key not configured" },
        { status: 500 }
      );
    }

    if (!hCaptchaToken) {
      return NextResponse.json(
        { message: "hCaptcha token is missing" },
        { status: 400 }
      );
    }

    // Get IP and device info
    const ip = getClientIP(request);
    const deviceInfo = getDeviceInfo(request);

    console.log("Form submission details:", {
      name,
      email,
      ip,
      deviceInfo,
    });

    // Send to Web3Forms with additional info
    const web3FormsResponse = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        from_name: name,
        from_email: email,
        subject: `kpatel.site: New message from ${name} (${email})`,
        message: `Name: ${name}
Email: ${email}
Message: ${message}

--- User Details ---
IP Address: ${ip}
Device: ${deviceInfo.deviceType}
Browser: ${deviceInfo.browser}
OS: ${deviceInfo.os}
Language: ${deviceInfo.language}
User Agent: ${deviceInfo.userAgent}
Timestamp: ${deviceInfo.timestamp}`,
        "h-captcha-response": hCaptchaToken,
      }),
    });

    // Send Discord notification for form submission
    if (DISCORD_WEBHOOK_URL) {
      await sendDiscordWebhook(
        DISCORD_WEBHOOK_URL,
        {
          name,
          email,
          message,
          ip,
          deviceInfo,
        },
        "form"
      );
    }

    if (web3FormsResponse.ok) {
      return NextResponse.json(
        { message: "Email sent successfully" },
        { status: 200 }
      );
    } else {
      const errorData = await web3FormsResponse.json();
      console.error("Web3Forms error:", errorData);
      return NextResponse.json(
        { message: "Failed to send email" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 }
    );
  }
}
