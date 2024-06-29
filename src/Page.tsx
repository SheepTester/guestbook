import { App, AppProps } from './App'

export function Page (props: AppProps) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />

        <title>Guestbook</title>
        <meta
          name='description'
          content="The comments section of my website. Ask questions, give feedback, your opinions, or say what's on your mind!"
        />

        <link rel='stylesheet' type='text/css' href='/sheep3.css' />
        <link rel='stylesheet' type='text/css' href='./index.css' />
        <script src='/sheep3.js'></script>
      </head>
      <body>
        <App {...props} />
      </body>
    </html>
  )
}
