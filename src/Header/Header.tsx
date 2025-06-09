import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export function Header() {
    const handleLogin = () => {
        // тут будет логика AccountCircleIcon, которой пока нет
    };

    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                backgroundColor: '#2196F3',
                height: 64,
            }}
        >
            <Toolbar sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Typography
                    variant="body1"
                    sx={{fontSize: 20}}
                >
                    Фильмы
                </Typography>
                <Button
                    variant="text"
                    onClick={handleLogin}
                    sx={{ cursor: 'pointer' }}
                >
                    <AccountCircleIcon sx={{color: 'white'}} />
                </Button>
            </Toolbar>
        </AppBar>
    );
}
