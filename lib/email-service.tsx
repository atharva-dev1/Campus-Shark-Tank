// Mock email service for admin approval workflow
export interface AdminApprovalRequest {
  id: string
  firstName: string
  lastName: string
  email: string
  university: string
  position: string
  department: string
  reason: string
  timestamp: string
  status: "pending" | "approved" | "rejected"
}

export interface ApprovalEmailData {
  requestId: string
  adminData: AdminApprovalRequest
  approvalUrl: string
  rejectionUrl: string
}

export class EmailService {
  static async sendAdminApprovalRequest(adminData: Omit<AdminApprovalRequest, "id" | "status">) {
    const requestId = Math.random().toString(36).substring(2, 15)

    const request: AdminApprovalRequest = {
      ...adminData,
      id: requestId,
      status: "pending",
    }

    // Mock email content that would be sent to campussharktanka@gmail.com
    const emailContent = {
      to: "campussharktanka@gmail.com",
      subject: "New Admin Access Request - Campus Shark Tank",
      html: `
        <h2>New Admin Access Request</h2>
        <p><strong>Name:</strong> ${request.firstName} ${request.lastName}</p>
        <p><strong>Email:</strong> ${request.email}</p>
        <p><strong>University:</strong> ${request.university}</p>
        <p><strong>Position:</strong> ${request.position}</p>
        <p><strong>Department:</strong> ${request.department}</p>
        <p><strong>Reason:</strong> ${request.reason}</p>
        <p><strong>Requested on:</strong> ${new Date(request.timestamp).toLocaleString()}</p>
        
        <div style="margin: 20px 0;">
          <a href="https://campus-shark-tank.vercel.app/admin/approve?id=${requestId}" 
             style="background: #10b981; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-right: 10px;">
            APPROVE
          </a>
          <a href="https://campus-shark-tank.vercel.app/admin/reject?id=${requestId}" 
             style="background: #ef4444; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            REJECT
          </a>
        </div>
      `,
    }

    console.log("[v0] Mock email sent:", emailContent)
    return { success: true, requestId }
  }

  static async sendTemporaryPassword(email: string, tempPassword: string) {
    const emailContent = {
      to: email,
      subject: "Admin Access Approved - Campus Shark Tank",
      html: `
        <h2>Admin Access Approved!</h2>
        <p>Your request for admin access to Campus Shark Tank has been approved.</p>
        <p><strong>Temporary Password:</strong> <code>${tempPassword}</code></p>
        <p>Please login with your email and this temporary password, then change your password immediately.</p>
        <p><a href="https://campus-shark-tank.vercel.app/auth">Login Here</a></p>
      `,
    }

    console.log("[v0] Temporary password email sent:", emailContent)
    return { success: true }
  }

  static generateTemporaryPassword(): string {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }
}
