import { getPosts } from "@/lib/data"
import { NextResponse } from "next/server"

export const GET = async (req: Request, res: Response) => {
  try {
    const posts = getPosts()
    return NextResponse.json({ message: "ok", posts }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: "Error", err }.err, {
      status: 500,
    })
  }
}
