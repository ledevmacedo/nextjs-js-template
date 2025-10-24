import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Post } from "@/models/Post";

export async function GET() {
  await connectDB();
  const posts = await Post.find();
  return NextResponse.json(posts);
}

export async function POST(req) {
  const data = await req.json();
  await connectDB();
  const newPost = await Post.create(data);
  return NextResponse.json(newPost, { status: 201 });
}
