import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import LoginForm from './LoginForm/LoginForm.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <LoginForm />
    </StrictMode>,
)

