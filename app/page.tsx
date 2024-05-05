"use client"

import List from "@/components/List"
import Meme from "@/components/Meme"
import Link from "next/link"
import { getPost } from "@/lib/data"
import { useSearchParams } from "next/navigation"

export default function Page() {
  const searchParams = useSearchParams()
  const id = searchParams.get("id") || ""
  let text = searchParams.get("text") || ""

  if (id) {
    const post = getPost(id)
    text = post?.text || ""
  }

  return (
    <div className="Page max-w-sm mx-auto">
      <Meme text={text} />

      <div className="container">
        <div className="flex items-center justify-between">
          <Link href="/">
            <h1 className="text-2xl my-6 font-black">mi mi mi</h1>
          </Link>

          {/* Share */}
          <div>Compartir</div>
        </div>
      </div>

      <List active={id} />
    </div>
  )
}
