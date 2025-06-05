import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function BoxBasic() {
    const [value, setValue] = useState('');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };
    const handleClick = () => {
        alert(value);
    };
    return (
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
            <Button variant="contained" onClick={handleClick}>
                Показать значение
            </Button>
            <TextField
                id="outlined-basic"
                label="Введите текст"
                variant="outlined"
                value={value}
                onChange={handleChange}
                sx={{ ml: 2 }}
            />
        </Box>
    );
}