import { FC } from 'react';
import { List, ListItemText } from '@mui/material';
import { CastListProps } from '../../types';

export const CastList: FC<CastListProps> = ({ cast }) => (
    <List disablePadding sx={{ mb: 4 }}>
        {cast.slice(0, 4).map(actor => (
            <ListItemText
                key={actor.id}
                primary={actor.name}
                slotProps={{
                    primary: {
                        sx: { color: '#fff', fontWeight: 'bold' }
                    }
                }}
            />
        ))}
    </List>
);