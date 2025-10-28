import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";

export async function GET(request, { params }) {
  await connectDB();
  const { id } = params;
  const posts = await Post.find({ author: id });
  return NextResponse.json(posts);
}
