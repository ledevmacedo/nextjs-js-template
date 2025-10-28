import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";

export async function GET(request, { params }) {
  await connectDB();
  const post = await Post.findById(params.id);

  if (!post) {
    return NextResponse.json(
      { error: "Postagem não encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json(post);
}
