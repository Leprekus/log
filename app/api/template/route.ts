import { create_template } from "@/app/queries.actions";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

type ResponseData = {
  message: string
}
 
export async function POST(
  req: NextRequest
) {
	const template = await req.json();
	create_template(template);
  	return NextResponse.json({ message: 'Hello from Next.js!' });
}
