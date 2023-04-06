import data from '../public/data.json'
import cx from 'clsx'
import { useState, useRef } from 'react'
import { mimify } from './utils/Mimificator'
import { getTextFromURLParam } from './utils/getTextFromURLParam'

export default function App() {
  const [defaultText, setDefault] = useState(getTextFromURLParam())
  const [mimified, setMimified] = useState(mimify(defaultText))
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const hundleKeyUp = () => {
    updateURL()
    minimize()
  }

  function showExampleNum(num: number) {
    if (!textareaRef.current) return

    textareaRef.current.value = data.examples[num]
    updateURL()
    minimize()
  }

  function updateURL() {
    if (!textareaRef.current) return

    const text = textareaRef.current.value
    const url = new URL(window.location.href)
    url.searchParams.set('t', text)
    window.history.pushState({}, '', url.toString())
  }

  const minimize = () => {
    setMimified(mimify(textareaRef.current?.value || ''))
  }

  const handleClear = () => {
    if (!textareaRef.current) return

    textareaRef.current.value = ''
    setMimified('')
    setDefault('')
  }

  const buttonCx = cx(
    'py-3 px-4 rounded-md',
    'text-white',
    'bg-gradient-to-tr from-emerald-500 to-emerald-700',
    'font-bold'
  )

  const cleanLinkCx = cx(
    'text-right transition duration-500',
    { 'opacity-40 cursor-default': !mimified },
    { 'opacity-95 cursor-pointer': !!mimified }
  )

  const titleCx = cx(
    'text-var-xl text-neutral-900 dark:text-neutral-50 font-extrabold tracking-tight'
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

  const paramOutputCx = cx(
    'absolute bottom-0',
    'w-full p-4 sm:p-5',
    'text-white uppercase text-var-2xl font-semibold leading-none text-center tracking-wide'
  )

  const boyCx = cx('w-full')

  return (
    <>
      <div>
        <h1 className={titleCx}>{data.title}</h1>

        <h2 className={descriptionCx}>
          <span className='italic'>mi mi mi ...</span> {data.description}.
        </h2>
      </div>

      <div className='relative'>
        <div className={paramOutputCx}>{mimified}</div>
        <img className={boyCx} src='/mimimi-boy.jpg' alt='Whiny boy' />
      </div>

      <div className='flex flex-col md:flex-row gap-3'>
        <textarea
          ref={textareaRef}
          onKeyUp={hundleKeyUp}
          className={inputCx}
          placeholder={data.input.placeholder}
          autoComplete='off'
          defaultValue={defaultText}
        />
      </div>

      <div className='flex justify-between mb-6'>
        <div className='flex flex-col gap-3 text-var-md'>
          {data.examples.map((example, index) => (
            <span
              onClick={() => showExampleNum(index)}
              key={index}
              className='cursor-pointer underline underline-offset-4'>
              {example}
            </span>
          ))}
        </div>

        <div onClick={handleClear} className={cleanLinkCx}>
          Limpiar
        </div>
      </div>

      <div className='sticky bottom-8 flex justify-center'>
        <button className={buttonCx}>{data.cta.text}</button>
      </div>
    </>
  )
}
