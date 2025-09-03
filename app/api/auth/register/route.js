import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Temporary in-memory user store (demo only)
let users = [
  { id: 1, email: "test@example.com", password: bcrypt.hashSync("123456", 10), name: "Test User" }
];

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    // Check if email already exists
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: users.length + 1,
      name,
      email,
      password: hashedPassword,
    };

    users.push(newUser);

    // Generate JWT
    const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: "1h" });

    // Create response and set HttpOnly cookie
    const response = NextResponse.json({
      message: "Registration successful",
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60,
      path: "/",
    });

    return response;
  } catch (err) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
