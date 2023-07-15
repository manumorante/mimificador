import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mimificador",
  description: "Mi mi mi",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <main className="max-w-ml ml:mx-auto p-6">
          <Link href="/">
            <h1 className="text-2xl my-8 font-black">Mimificador</h1>
          </Link>

          {children}
        </main>
      </body>
    </html>
  )
}
