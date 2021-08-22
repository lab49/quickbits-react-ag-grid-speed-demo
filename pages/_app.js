import '../styles/globals.css'
import 'tailwindcss/tailwind.css'

import StoreProvider from '../components/StoreProvider'

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  )
}

export default MyApp
