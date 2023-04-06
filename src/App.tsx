import data from '../public/data.json'
import cx from 'clsx'
import { useState, useRef } from 'react'
import { mimify } from './utils/Mimificator'
import { textFromUrl } from './utils/textFromUrl'

export default function App() {
  const defaultText = textFromUrl()
  const [mimified, setMimified] = useState(mimify(defaultText))
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const hundleKeyUp = () => {
    minimize()
  }

  const handleCopy = () => {
    // alert('TBD')
  }

  function showExampleNum(num: number) {
    if (!textareaRef.current) return

    textareaRef.current.value = data.examples[num]
    minimize()
  }

  const minimize = () => {
    setMimified(mimify(textareaRef.current?.value || ''))
  }

  const handleClear = () => {
    if (!textareaRef.current) return

    textareaRef.current.value = ''
    setMimified('')
  }

  const buttonCx = cx(
    'py-3 px-4 rounded-md',
    'bg-gradient-to-tr from-emerald-500 to-emerald-700',
    'font-bold'
  )

  const titleCx = cx('text-var-xl font-extrabold tracking-tight')
  const descriptionCx = cx('text-var-lg font-normal leading-tight')

  const textareaCx = cx(
    'block w-full p-5',
    'rounded-lg border-4 focus:outline-none',
    'text-var-md',
    'resize-none',
    'transition-colors duration-500'
  )
  const inputCx = cx(
    textareaCx,
    'border-gray-700 focus:border-gray-600 bg-gray-800/60 focus:bg-gray-800'
  )
  const outputCx = cx(textareaCx, 'border-sky-700 bg-sky-800')
  const outputPlaceholderCx = cx(textareaCx, 'text-sky-500 border-sky-900 bg-sky-950')

  return (
    <>
      <h1 className={titleCx}>{data.title}</h1>

      <h2 className={descriptionCx}>
        Versiona texto a <strong>mi mi mi</strong> burlón reemplazando las vocales con{' '}
        <strong>i</strong>
      </h2>

      <div className='my-3 flex flex-col md:flex-row gap-3'>
        <textarea
          ref={textareaRef}
          onKeyUp={hundleKeyUp}
          className={inputCx}
          placeholder={data.input.placeholder}
          autoComplete='off'
          defaultValue={defaultText}
        />

        {!mimified ? (
          <div className={outputPlaceholderCx}>{data.output.placeholder}</div>
        ) : (
          <div className={outputCx}>{mimified}</div>
        )}

        <div
          onClick={handleClear}
          className={cx(
            'text-right transition duration-500',
            { '-translate-y-4 opacity-0 cursor-default': !mimified },
            { 'opacity-60 cursor-pointer': !!mimified }
          )}>
          Limpiar
        </div>
      </div>

      <section>
        <span>Ejemplos:</span>{' '}
        {data.examples.map((example, index) => (
          <>
            <span
              onClick={() => showExampleNum(index)}
              key={index}
              className='cursor-pointer underline underline-offset-4'>
              {example}
            </span>
            {',  '}
          </>
        ))}
        {'...'}
      </section>

      <div className='sticky bottom-8 flex justify-center'>
        <button onClick={handleCopy} className={buttonCx}>
          {data.cta.text}
        </button>
      </div>
    </>
  )
}
