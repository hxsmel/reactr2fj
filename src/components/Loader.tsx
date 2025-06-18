import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

export const Loader = () => (
    <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        p={2}
    >
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>
            Загрузка...
        </Typography>
    </Box>
)