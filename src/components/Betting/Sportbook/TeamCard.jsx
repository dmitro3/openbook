import Image from "next/image";
import {useState} from 'react';
import {TeamCardAvatar,TeamCardDiv,TeamCardTypography} from "./SportbookStyle"

export const TeamCard = (props) => {
    const [imagePath,setImagePath] = useState(props.teamIconPath);
    let empty = "/static/images/team_and_player_icons/empty.png"

    const handleError = (e) =>{
        setImagePath(empty);
    }

    return(
        <>
            <TeamCardAvatar>
                <TeamCardDiv>
                    <Image
                    src={imagePath}
                    alt="logo"
                    width="50"
                    height="50"
                    layout="responsive"
                    className="logoStyle"
                    onError={e=>handleError(e)}
                    />
                </TeamCardDiv>
            </TeamCardAvatar>
        
            <TeamCardTypography>{props.teamName}</TeamCardTypography>
        </>
        );
}