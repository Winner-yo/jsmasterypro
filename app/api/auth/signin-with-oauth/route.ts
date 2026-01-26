import { Mongoose } from "mongoose";

import dbConnect from "@/lib/db/connect";

export async function POST(request: Request) {
    await dbConnect();
    const [provider, code] = await request.json();
  return new Response(
    JSON.stringify({ message: `Sign in with ${provider} OAuth endpoint` }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}