import { useState, useRef } from 'react'
import { mimify } from './utils/Mimificator'
import { noCopy } from './utils/noCopy'
import { textFromUrl } from './utils/textFromUrl'
import { XIcon } from '@heroicons/react/solid'

function App() {
  const defaultText = textFromUrl()
  const [mimified, setMimified] = useState(mimify(defaultText))
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const minimize = () => {
    setMimified(mimify(textareaRef.current?.value || ''))
  }

  const copyToClipboard = (text: string) => {
    if (noCopy()) return false
    navigator.clipboard.writeText(text)
  }

  const handleClear = () => {
    if (!textareaRef.current) return

    textareaRef.current.value = ''
    setMimified('')
  }

  return (
    <div className='App'>
      <div className='container mx-auto flex flex-col h-screen p-8 gap-7'>
        <div>
          <h1 className='text-3xl font-bold'>Mimificador</h1>
          <h2 className='mt-2'>Convierte texto a "mi mi mi"</h2>
        </div>

        <div className='flex flex-col md:flex-row gap-3 md:h-1/2'>
          <div className='relative'>
            <textarea
              ref={textareaRef}
              onKeyUp={minimize}
              className='text-lg resize-none block w-full p-5 rounded-lg border-4 border-gray-700 focus:border-gray-600 bg-gray-800 md:h-full focus:outline-none'
              placeholder='Escribe algo...'
              autoComplete='off'
              defaultValue={defaultText}
            />
            {mimified && (
              <XIcon
                onClick={handleClear}
                className='w-6 h-6 absolute top-0 right-0 mt-3 mr-3 text-gray-500'
              />
            )}
          </div>

          <div
            onClick={() => copyToClipboard(mimified)}
            className='text-lg resize-none block w-full p-5 rounded-lg border-4 border-sky-700 bg-sky-800 md:h-full focus:outline-none cursor-pointer break-all'
            title={noCopy() ? '' : 'Click para copiar'}>
            {mimified}
          </div>
        </div>

        <div>
          <button
            onClick={() => copyToClipboard(mimified)}
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
