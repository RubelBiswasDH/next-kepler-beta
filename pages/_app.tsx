import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { store } from '../redux/store'
import 'mapbox-gl/dist/mapbox-gl.css';

// @ts-ignore
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
