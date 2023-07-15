type Post = {
  id: string
  text: string
  info?: string
}

let posts: Post[] = [
  {
    id: "1",
    text: "Ni machismo ni feminismo",
    info: "Tu cita tinder",
  },
  {
    id: "2",
    text: "Masaje con final feliz",
    info: "Clientes preguntando",
  },
  {
    id: "3",
    text: "Xiaomi calidad precio",
    info: "Hablando del nuevo iPhone",
  },
  {
    id: "4",
    text: "Inglés, francés, japonés",
    info: "Buscando los subtitulos en español",
  },
]

export const getPosts = () => posts

export const getPost = (id: string) => posts.find((post) => post.id === id)
