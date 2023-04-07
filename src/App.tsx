import data from '../public/data.json'
import cx from 'clsx'
import { useState, useRef } from 'react'
import { mimify } from './utils/Mimificator'
import { getParams } from './utils/getParams'

export default function App() {
  const { intro, text } = getParams()
  const [introNormal, setIntro] = useState(intro)
  const [textNormal, setTextNormal] = useState(text)
  const [textMimimi, setTextMimimi] = useState(mimify(textNormal))
  const introInputRef = useRef<HTMLTextAreaElement>(null)
  const textInputRef = useRef<HTMLTextAreaElement>(null)

  function update() {
    const intro = introInputRef.current?.value || ''
    const text = textInputRef.current?.value || ''
    const url = new URL(window.location.href)

    url.searchParams.set('intro', intro)
    url.searchParams.set('text', text)
    window.history.pushState({}, '', url.toString())

    setIntro(intro)
    setTextNormal(text)
    setTextMimimi(mimify(text))
  }

  function showExample(num: number) {
    if (!introInputRef.current || !textInputRef.current) return

    const example = data.examples[num]

    introInputRef.current.value = example.intro
    textInputRef.current.value = example.text

    update()
  }

  function handleClear() {
    if (!textInputRef.current || !introInputRef.current) return

    textInputRef.current.value = ''
    introInputRef.current.value = ''

    update()
  }

  function focusIntro() {
    if (!introInputRef.current) return

    introInputRef.current.focus()
  }

  function focusText() {
    if (!textInputRef.current) return

    textInputRef.current.focus()
  }

  const cleanLinkCx = cx(
    'text-right transition duration-500',
    { 'opacity-40 cursor-default': !textMimimi },
    { 'opacity-95 cursor-pointer': !!textMimimi }
  )

  const titleCx = cx(
    'my-6 text-var-xl text-neutral-900 dark:text-neutral-50 font-extrabold tracking-tight'
  )
  const descriptionCx = cx('mb-6 text-var-xl font-normal leading-tight sm:leading-none')

  const textareaCx = cx(
    'block w-full p-3 sm:p-4',
    'rounded-lg border-2 sm:border-4 focus:outline-none',
    'resize-none',
    'transition-colors duration-500'
  )
  const inputCx = cx(
    textareaCx,
    'text-var-md',

    // Light mode
    'bg-gray-50 border-gray-200',
    'focus:bg-white focus:border-green-500',

    // Dark mode
    'dark:bg-gray-800/60 dark:border-gray-600/50',
    'dark:focus:bg-gray-800 dark:focus:border-gray-600'
  )

  const textOutputCx = cx(
    'absolute',
    'w-full p-4 sm:p-5',
    'text-white uppercase  font-semibold leading-none text-center tracking-wide'
  )

  const introNormalCx = cx(textOutputCx, 'top-0 text-var-xl')
  const textMimimiCx = cx(textOutputCx, 'bottom-0 text-var-2xl')
  const boyCx = cx('w-full')

  return (
    <>
      <h1 className={titleCx}>
        <a href='/'>{data.title}</a>
      </h1>

      {/* <h2 className={descriptionCx}>
        <span className='italic'>mi mi mi ...</span> {data.description}.
      </h2> */}

      <div className='Main sm:flex sm:gap-10 mb-10'>
        <div className='Col max-w-2xl'>
          <div className='MEME mb-6 relative'>
            <div onClick={focusIntro} className={introNormalCx}>
              {introNormal}
            </div>
            <div onClick={focusText} className={textMimimiCx}>
              {textMimimi}
            </div>
            <img className={boyCx} src='/mimimi-boy.jpg' alt='Whiny boy' />
          </div>

          <div className='flex flex-col md:flex-row gap-3 mb-3'>
            <textarea
              ref={introInputRef}
              onKeyUp={update}
              className={inputCx}
              placeholder={data.intro.placeholder}
              autoComplete='off'
              defaultValue={introNormal}
            />

            <textarea
              ref={textInputRef}
              onKeyUp={update}
              className={inputCx}
              placeholder={data.input.placeholder}
              autoComplete='off'
              defaultValue={textNormal}
            />
          </div>

          <div onClick={handleClear} className={cleanLinkCx}>
            Limpiar
          </div>
        </div>

        <div className='Col sm:max-w-xs'>
          <span className=''>Ejemplos:</span>
          <ol
            className='flex flex-col gap-6 font-bold leading-none'
            style={{ fontSize: 'min(5vw, 30px)' }}>
            {data.examples.map((example, index) => (
              <li
                onClick={() => showExample(index)}
                key={index}
                className='cursor-pointer hover:text-black dark:hover:text-white transition-colors'>
                {example.intro}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  )
}
