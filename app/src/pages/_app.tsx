import "@/styles/globals.css";
import type { AppProps } from "next/app";
import localFont from 'next/font/local';

const geeki = localFont({
  src: [
    {
      path: './fonts/Geeeki-Regular.ttf',
      weight: '700',
      style: 'normal',
    }, 
  ],
  variable: '--font-general'
})

const satoshi = localFont({
  src: [
    {
      path: './fonts/Satoshi-Black.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: './fonts/Satoshi-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/Satoshi-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Satoshi-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Satoshi-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    
  ],
  variable: '--font-main'
})

export default function App({ Component, pageProps }: AppProps) {
  return <main className={`${geeki.variable} ${satoshi.variable}`}>
  <Component {...pageProps} /> 
  </main>;
}
