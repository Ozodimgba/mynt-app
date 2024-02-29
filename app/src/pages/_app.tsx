import "@/styles/globals.css";
import type { AppProps } from "next/app";
import localFont from 'next/font/local';
import {
  DynamicContextProvider,
  DynamicWidget,
  useDynamicContext
} from "@dynamic-labs/sdk-react-core";
import { EdgeStoreProvider } from '../lib/edgestore';
import { SolanaWalletConnectors } from "@dynamic-labs/solana";

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
    <DynamicContextProvider
      settings={{
        // Find your environment id at https://app.dynamic.xyz/dashboard/developer
        environmentId: "8c3a7ed4-bb69-4baa-9883-3111947ee06c",
        appName: 'Mynt',
        appLogoUrl: 'https://wwovyaerbcdsadifomap.supabase.co/storage/v1/object/public/receipt_metadata/logo.png',
        walletConnectors: [SolanaWalletConnectors],
      }}
    >
      <EdgeStoreProvider>
  <Component {...pageProps} /> 
  </EdgeStoreProvider>
  </DynamicContextProvider>
  </main>;
}
