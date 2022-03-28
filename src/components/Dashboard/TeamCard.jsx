import { Avatar,  Typography} from '@mui/material';
import PropTypes from "prop-types";
import Image from "next/image";

export const TeamCard = (props) => (
<>
    <Avatar
        sx={{
            backgroundColor: '#f5f5f5',
            height: 56,
            width: 56,
            margin: 'auto'
        }}
        >
        <div style={{
        width:"40px",
        height:"40px",
        margin:"auto"
        }}>

        {/* <Image
            src={props.teamIconPath}
            alt="logo"
            width="100"
            height="100"
            layout="responsive"
            className="logoStyle"
            loading="lazy"
        /> */}
        </div>

        </Avatar>

    <Typography sx={{marginLeft:'auto',marginRight:'auto',marginTop:'10px',textAlign:'center'}}>{props.teamName}</Typography>
</>
);

TeamCard.propTypes = {
    teamName:PropTypes.string,
    teamIconPath:PropTypes.string
}