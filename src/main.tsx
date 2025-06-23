import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '@/App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@context/auth-provider.tsx'
import { Provider } from 'react-redux'
import { store } from '@store/store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
