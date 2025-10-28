import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";

export async function GET(request, { params }) {
  await connectDB();
  const user = await User.findById(params.id);

  if (!user) {
    return NextResponse.json(
      { error: "Usuário não encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json(user);
}
