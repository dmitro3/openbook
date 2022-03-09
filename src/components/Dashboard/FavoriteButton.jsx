import {Box, Button} from '@mui/material';
import {RiStarLine} from 'react-icons/ri';

export const FavoriteButton = (props) => (
    <>
        <Box
        sx={{
        pt: 2,
        display: 'flex',
        alignItems: 'center',
        }}
        >
            <Button
            sx={{
                mr: 1,
                padding: '1rem',
                backgroundColor: "#f5f5f5",
                fontSize: '1.2rem'
            }}
            variant="body2"
            >
            <RiStarLine/>
            </Button>
        </Box>
    </>

);