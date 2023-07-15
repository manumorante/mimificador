import List from "@/components/List"
import Meme from "@/components/Meme"
import { getPost } from "@/lib/data"

export default function Page({ params }: { params: { id: string } }) {
  const post = getPost(params.id)
  if (!post) return <div>404</div>

  const mainCx = "Page bg-white rounded-lg shadow"

  return (
    <div className={mainCx}>
      <Meme text={post.text} />

      <div className="py-6">
        <List active={post.id} />
      </div>
    </div>
  )
}
