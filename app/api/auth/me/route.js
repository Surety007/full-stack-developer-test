import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export async function GET(request) {
  try {
    // Get cookie
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    return NextResponse.json({
      user: {
        id: decoded.id,
        email: decoded.email,
      },
    });
  } catch (err) {
    console.error("JWT verify error:", err);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
