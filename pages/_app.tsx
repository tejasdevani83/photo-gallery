import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '@/store/store';
import { QueryClient, QueryClientProvider } from 'react-query';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Head>
          <title>Photo Gallery - Agency Analytics</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className='main'>
          <Component {...pageProps} />
        </main>
      </QueryClientProvider>
    </Provider>
  )
}
