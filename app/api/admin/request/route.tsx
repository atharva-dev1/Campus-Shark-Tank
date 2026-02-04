import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Generate unique request ID
    const requestId = Math.random().toString(36).substring(2, 15)

    setTimeout(async () => {
      // Simulate sending email to campussharktanka@gmail.com
      console.log(`[v0] Email sent to campussharktanka@gmail.com in 1 second`)
      console.log(`[v0] Admin Request Details:`, {
        requestId,
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        university: formData.university,
        position: formData.position,
        department: formData.department,
        reason: formData.reason,
        timestamp: new Date().toISOString(),
      })

      // Mock email content that would be sent
      const emailContent = {
        to: "campussharktanka@gmail.com",
        subject: `Admin Access Request - ${formData.firstName} ${formData.lastName}`,
        html: `
          <h2>New Admin Access Request</h2>
          <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>University:</strong> ${formData.university}</p>
          <p><strong>Position:</strong> ${formData.position}</p>
          <p><strong>Department:</strong> ${formData.department}</p>
          <p><strong>Reason:</strong> ${formData.reason}</p>
          <p><strong>Request ID:</strong> ${requestId}</p>
          
          <div style="margin: 20px 0;">
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/approve?id=${requestId}&action=approve" 
               style="background: #10b981; color: white; padding: 10px 20px; text-decoration: none; margin-right: 10px;">
              ✅ APPROVE
            </a>
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/approve?id=${requestId}&action=reject" 
               style="background: #ef4444; color: white; padding: 10px 20px; text-decoration: none;">
              ❌ REJECT
            </a>
          </div>
        `,
      }

      console.log(`[v0] Email content prepared:`, emailContent)
    }, 1000) // Exactly 1 second delay

    return NextResponse.json({
      success: true,
      message: "Admin request submitted successfully",
      requestId,
    })
  } catch (error) {
    console.error("[v0] Error processing admin request:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process admin request",
      },
      { status: 500 },
    )
  }
}
