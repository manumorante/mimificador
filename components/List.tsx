import cx from "clsx"
import { getPosts } from "@/lib/data"
import Link from "next/link"

const mainCx = cx(
  "List",
  "flex flex-col gap-4 p-4 mm:p-5 ml:p-6",
  "bg-gradient-to-tr from-green-900/30 to-black/10",
  "border border-white/10",
  "rounded-lg shadow"
)

const textCx = cx("text-xl")
const defaulCx = cx("text-white/80")
const activeCx = cx("text-white font-bold ")

const infoCx = cx("text-white/60")

export default function List({ active }: { active?: string }) {
  const posts = getPosts()

  return (
    <nav className={mainCx}>
      {posts.map(({ id, text, info }) => {
        const isActive = id === active

        return (
          <Link key={id} href={`/${id}`}>
            <span
              className={cx(textCx, {
                [defaulCx]: !isActive,
                [activeCx]: isActive,
              })}
            >
              {text}
            </span>
            <div className={infoCx}>{info}</div>
          </Link>
        )
      })}
    </nav>
  )
}
