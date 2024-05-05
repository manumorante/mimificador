import cx from "clsx"
import { getPosts } from "@/lib/data"
import Link from "next/link"

const mainCx = cx("List", "flex flex-col gap-4")

const textCx = cx("text-xl")
const defaulCx = cx("text-neutral-600")
const activeCx = cx("text-neutral-800 font-bold ")

const infoCx = cx("text-neutral-500")

export default function List({ active }: { active?: string }) {
  const posts = getPosts()

  return (
    <div className="container">
      <nav className={mainCx}>
        {posts.map(({ id, text, info }) => {
          const isActive = id === active

          return (
            <Link key={id} href={`/?id=${id}`}>
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
    </div>
  )
}
