import { useState } from 'react'
import { mimify } from './utils/Mimificator'

const noCopy = () => {
  const isSupported = Boolean(
    navigator.clipboard && navigator.clipboard.writeText
  )
  return isSupported
}

const textFromUrl = () => {
  const url = new URL(window.location.href)
  const params = new URLSearchParams(url.search)
  return params.get('text') || ''
}

function App() {
  const defaultText = textFromUrl()
  const [mimified, setMimified] = useState(mimify(defaultText))

  const handleKey = (e: KeyboardEvent) => {
    const textarea = e.target as HTMLTextAreaElement
    const textMimified = mimify(textarea.value)
    setMimified(textMimified)
  }

  const copyToClipboard = () => {
    if (!navigator.clipboard) return false
    navigator.clipboard.writeText(mimified)
  }

  return (
    <div className='App'>
      <div className='container mx-auto flex flex-col h-screen p-8 gap-7'>
        <div>
          <h1 className='text-3xl font-bold'>Mimificador</h1>
          <h2 className='mt-2'>Convierte texto a "mi mi mi"</h2>
        </div>

        <div className='flex flex-col md:flex-row gap-3 md:h-1/2'>
          <textarea
            onKeyUp={(e) => handleKey(e)}
            className='text-lg resize-none block w-full p-5 rounded-lg border-4 border-gray-700 focus:border-gray-600 bg-gray-800 md:h-full focus:outline-none'
            placeholder='Escribe algo...'
            autoComplete='off'
            defaultValue={defaultText}
          />
          <div
            onClick={copyToClipboard}
            className='text-lg resize-none block w-full p-5 rounded-lg border-4 border-sky-700 bg-sky-800 md:h-full focus:outline-none cursor-pointer break-all'
            title={noCopy() ? '' : 'Click para copiar'}>
            {mimified}
          </div>
        </div>

        <div>
          <button
            onClick={copyToClipboard}
            className={`w-full p-4 rounded-md bg-gray-700 ${
              noCopy() && 'cursor-not-allowed'
            }`}
            data-clipboard-action='copy'
            data-clipboard-target='#output'
            disabled={noCopy()}>
            Copiar
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
