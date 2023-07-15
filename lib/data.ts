type Post = {
  id: string
  intro: string
  text: string
}

let posts: Post[] = [
  {
    id: "1",
    intro: "cambiando el idioma a una web",
    text: "inglés, francés, japonés",
  },
  {
    id: "2",
    intro: "siempre que estás sola y suena el teléfono",
    text: "que tipos de masaje haceis?",
  },
  {
    id: "3",
    intro: "viendo un prototipo inédito de iphone",
    text: "mi cuñado tiene un xiaomi mas rápido",
  },
  {
    id: "4",
    intro: "tu cita tinder hablando de machismo",
    text: "ni machismo ni feminismo",
  },
]

export const getPosts = () => posts

export const getPost = (id: string) => posts.find((post) => post.id === id)
