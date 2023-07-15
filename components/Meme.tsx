import { mimify } from "@/lib/Mimificator"
import cx from "clsx"
import Image from "next/image"

const mainCx = cx("Meme w-full relative")

const imgCx = cx("Img block w-full h-auto object-cover rounded-lg")

const textCx = cx(
  "Text",
  "absolute left-0 right-0 bottom-0",

  "px-2 py-4",
  "text-2xl mm:text-3xl ml:text-4xl",
  "text-white uppercase font-semibold leading-none text-center tracking-wide"
)

export default function Meme({ text }: { text: string }) {
  return (
    <div className={mainCx}>
      <Image
        className={imgCx}
        src="/mimimi-boy.jpg"
        alt="mimimi"
        width={576}
        height={433}
      />
      <p className={textCx}>{mimify(text)}</p>
    </div>
  )
}
