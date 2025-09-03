import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Temporary in-memory user store (demo only)
let users = [
  {
    id: 1,
    email: "admin@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    name: "Admin",
    role: "admin",
  },
  {
    id: 2,
    email: "user2@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    name: "user2",
    role: "user",
  },
  {
    id: 3,
    email: "user3@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    name: "user3",
    role: "user",
  },
];

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    console.log("Login attempt:", email, password);

    const user = users.find((u) => u.email === email);
    console.log("Found user:", user);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Create response and set HttpOnly cookie
    const response = NextResponse.json({
      message: "Login successful",
      user: { id: user.id, name: user.name, email: user.email },
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Only send over HTTPS in prod
      sameSite: "strict",
      maxAge: 60 * 60, // 1 hour
      path: "/",
    });

    return response;
  } catch (err) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
