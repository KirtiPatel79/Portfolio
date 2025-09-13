import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { name, email, message,'h-captcha-response': hCaptchaToken } = await request.json()
    const ACCESS_KEY = process.env.WEB3FORMS_ACCESS_KEY || "dd0277ac-728e-474d-b099-1cb0d5178553"

    if (!ACCESS_KEY) {
      return NextResponse.json(
        { message: 'API key not configured' },
        { status: 500 }
      )
    }
    if (!hCaptchaToken) {
      return NextResponse.json(
        { message: 'hCaptcha token is missing' },
        { status: 400 }
      )
    }

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        from_name: name,
        from_email: email,
        subject: `kpatel.site:New message from ${name} (${email})`,
        message: `Name: ${name},
        Message: ${message}`,
        'h-captcha-response': hCaptchaToken,
      }),
    })

    if (response.ok) {
      return NextResponse.json(
        { message: 'Email sent successfully' },
        { status: 200 }
      )
    } else {
      const errorData = await response.json()
      console.error('Web3Forms error:', errorData)
      return NextResponse.json(
        { message: 'Failed to send email' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { message: 'Failed to send email' },
      { status: 500 }
    )
  }
}