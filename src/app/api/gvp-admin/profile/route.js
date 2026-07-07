import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/adminAuth";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
    const payload = verifySessionToken(token, process.env.ADMIN_SESSION_SECRET);

    if (!payload) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const collection = await getCollection("admin_profiles");
    const profile = await collection.findOne({ userId: payload.userId });

    return NextResponse.json(profile || {
      userId: payload.userId,
      name: payload.name || "Admin User",
      email: "",
      avatarUrl: ""
    }, { status: 200 });
  } catch (error) {
    console.error("Profile GET error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
    const payload = verifySessionToken(token, process.env.ADMIN_SESSION_SECRET);

    if (!payload) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, email, avatarUrl } = body;

    const collection = await getCollection("admin_profiles");
    
    await collection.updateOne(
      { userId: payload.userId },
      { 
        $set: { 
          userId: payload.userId,
          name, 
          email, 
          avatarUrl,
          updatedAt: new Date()
        },
        $setOnInsert: {
          createdAt: new Date()
        }
      },
      { upsert: true }
    );

    const updatedProfile = await collection.findOne({ userId: payload.userId });

    return NextResponse.json(updatedProfile, { status: 200 });
  } catch (error) {
    console.error("Profile POST error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
