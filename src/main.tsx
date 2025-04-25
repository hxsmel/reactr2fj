import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import EnterSiteForm from "./EnterSiteForm.tsx";


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <EnterSiteForm />
    </StrictMode>,
)

