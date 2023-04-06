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
    'text-white',
    'bg-gradient-to-tr from-emerald-500 to-emerald-700',
    'font-bold'
  )

  const titleCx = cx(
    'text-var-2xl text-neutral-900 dark:text-neutral-50 font-extrabold tracking-tight'
  )
  const descriptionCx = cx('mb-3 text-var-xl font-normal leading-tight sm:leading-none ')

  const textareaCx = cx(
    'block w-full p-3 xs:p-4 sm:p-5',
    'rounded-lg border-4 focus:outline-none',
    'resize-none',
    'transition-colors duration-500'
  )
  const inputCx = cx(
    textareaCx,
    'text-var-md',

    // Light mode
    'bg-gray-50 border-gray-200',
    'focus:bg-white focus:border-gray-300',

    // Dark mode
    'dark:bg-gray-800/60 dark:border-gray-600/50',
    'dark:focus:bg-gray-800 dark:focus:border-gray-600'
  )

  const outputPlaceholderCx = cx(
    textareaCx,
    'text-var-md text-center',

    // Light mode
    'text-sky-500/60  bg-sky-100 border-sky-100',

    // Dark mode
    'dark:text-sky-500 dark:bg-sky-950 dark:border-sky-950'
  )

  const outputCx = cx(
    textareaCx,
    'text-var-lg text-center tracking-wide',

    // Light mode
    'text-sky-500  bg-sky-200 border-sky-200/50',

    // Dark mode
    'dark:text-sky-300 dark:bg-sky-900 dark:border-sky-900'
  )

  return (
    <>
      <h1 className={titleCx}>{data.title}</h1>

      <h2 className={descriptionCx}>
        <span className='italic'>mi mi mi ...</span> {data.description}.
      </h2>

      <div className='flex flex-col md:flex-row gap-3'>
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
      </div>

      <div
        onClick={handleClear}
        className={cx(
          'text-right transition duration-500',
          { '-translate-y-4 opacity-0 cursor-default': !mimified },
          { 'opacity-60 cursor-pointer': !!mimified }
        )}>
        Limpiar
      </div>

      <div className='sticky bottom-8 flex justify-center'>
        <button onClick={handleCopy} className={buttonCx}>
          {data.cta.text}
        </button>
      </div>

      <section className='text-var-md mb-6'>
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
    </>
  )
}
