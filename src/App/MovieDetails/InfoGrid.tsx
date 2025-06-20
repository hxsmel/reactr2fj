import { FC, Fragment } from 'react';
import { Box, Typography } from '@mui/material';
import { getInfoGridRows } from '../../utils/infoGridHelper';
import { InfoGridProps } from '../../types';

export const InfoGrid: FC<InfoGridProps> = ({ movie, credits }) => {
    const rows = getInfoGridRows(movie, credits);

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: 'max-content auto',
                rowGap: 1,
                columnGap: 2,
            }}
        >
            {rows.map(([label, val]) => (
                <Fragment key={label}>
                    <Typography variant="body1" color="#fff">
                        {label}
                    </Typography>
                    <Typography variant="body1" color="#fff">
                        {val}
                    </Typography>
                </Fragment>
            ))}
        </Box>
    );
};