import { memo, useCallback } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useLoginDialog } from '../hooks/useLoginDialog'
import { APPBAR_SX, TOOLBAR_SX, TITLE_SX, BUTTON_SX, ICON_SX } from './headerStyles'

const MoviesTitle = memo(() => (
    <Typography variant="body1" sx={TITLE_SX}>
        Фильмы
    </Typography>
))
MoviesTitle.displayName = 'MoviesTitle'

const ProfileIcon = memo(({ onLogin }: { onLogin: () => void }) => (
    <Button variant="text" onClick={onLogin} sx={BUTTON_SX}>
        <AccountCircleIcon sx={ICON_SX} />
    </Button>
))
ProfileIcon.displayName = 'ProfileIcon'

function HeaderComponent() {
    const { openDialog, dialog } = useLoginDialog()
    const handleLogin = useCallback(() => {
        openDialog()
    }, [openDialog])

    return (
        <>
            <AppBar position="static" elevation={0} sx={APPBAR_SX}>
                <Toolbar sx={TOOLBAR_SX}>
                    <MoviesTitle />
                    <ProfileIcon onLogin={handleLogin} />
                </Toolbar>
            </AppBar>
            {dialog}
        </>
    )
}

export const Header = memo(HeaderComponent)
Header.displayName = 'Header'