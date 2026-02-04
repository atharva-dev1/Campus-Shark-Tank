import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const requestId = searchParams.get("id")
  const action = searchParams.get("action")

  if (!requestId || !action) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 })
  }

  try {
    if (action === "approve") {
      // Generate temporary 6-digit password
      const tempPassword = Math.floor(100000 + Math.random() * 900000).toString()

      console.log(`[v0] Admin request ${requestId} APPROVED`)
      console.log(`[v0] Temporary password generated: ${tempPassword}`)

      // Mock sending password to admin's email
      console.log(`[v0] Sending temporary password to admin's email`)

      return new Response(
        `
        <html>
          <body style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color: #10b981;">✅ Admin Request Approved</h2>
            <p>The admin access request has been approved successfully.</p>
            <p><strong>Request ID:</strong> ${requestId}</p>
            <p><strong>Temporary Password:</strong> <code style="background: #f3f4f6; padding: 4px 8px;">${tempPassword}</code></p>
            <p>The temporary password has been sent to the admin's email address.</p>
          </body>
        </html>
      `,
        {
          headers: { "Content-Type": "text/html" },
        },
      )
    } else if (action === "reject") {
      console.log(`[v0] Admin request ${requestId} REJECTED`)

      return new Response(
        `
        <html>
          <body style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color: #ef4444;">❌ Admin Request Rejected</h2>
            <p>The admin access request has been rejected.</p>
            <p><strong>Request ID:</strong> ${requestId}</p>
            <p>The applicant has been notified of the rejection.</p>
          </body>
        </html>
      `,
        {
          headers: { "Content-Type": "text/html" },
        },
      )
    }
  } catch (error) {
    console.error("[v0] Error processing approval:", error)
    return NextResponse.json({ error: "Failed to process approval" }, { status: 500 })
  }
}
