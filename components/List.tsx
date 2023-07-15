import cx from "clsx"
import { getPosts } from "@/lib/data"
import Link from "next/link"

export default function List({ active }: { active?: string }) {
  const posts = getPosts()

  const mainCx = cx("List px-4 mm:px-5 ml:px-6")
  const linkCx = cx(
    "inline-block py-2 px-2 my-1 rounded-lg text-lg leading-tight"
  )

  return (
    <ul className={mainCx}>
      {posts.map((post) => (
        <li key={post.id}>
          <Link
            href={`/posts/${post.id}`}
            className={cx(linkCx, {
              "bg-cyan-100 dark:bg-cyan-50 text-cyan-900 dark:text-cyan-950":
                post.id === active,
              "text-gray-500": post.id !== active,
            })}
          >
            {post.text}
          </Link>
        </li>
      ))}
    </ul>
  )
}
