import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import '@tailwindcss/forms'
import { ToastContainer } from 'react-toastify';
import { store } from '@/Store/store';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        pauseOnVisibilityChange
        closeOnClick
        pauseOnHover
      />
    </Provider>
  )
}
