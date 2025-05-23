import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import { App } from "./App/App";
import {EnterSiteForm} from "./Enter Site/EnterSiteForm/EnterSiteForm.tsx";


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
)

