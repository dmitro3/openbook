import Image from 'next/image';
import {Box} from "@mui/material";
export const VaultIcon = () => {
    return (
        <Box sx={{mr:'5px !important'}}>
            <Image height='27px' width="27px" src="/static/images/top_navigation_bar_icons/safe.png"></Image>
        </Box>
    )
}