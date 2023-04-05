import type { AppProps } from 'next/app'
import '@/pages/_app.scss'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
