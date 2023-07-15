import List from "@/components/List"
import Meme from "@/components/Meme"
import { getPost } from "@/lib/data"

export default function Page({ params }: { params: { id: string } }) {
  const post = getPost(params.id)
  if (!post) return <div>404</div>

  return (
    <div className="Page space-y-8">
      <Meme text={post.text} />

      <List active={post.id} />
    </div>
  )
}
