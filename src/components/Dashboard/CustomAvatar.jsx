import { createAvatar } from '@dicebear/avatars';
import * as miniavsStyle from '@dicebear/miniavs';
import * as botStyle from '@dicebear/avatars-bottts-sprites';
import * as bigSmileStyle from '@dicebear/big-smile';


export const CustomAvatar = (props) => {
    let svg = createAvatar(botStyle, {
        seed: props.seed,
        dataUri: true
        // ... and other options
    });

    return (
        <img src={svg} alt="avatar" />
    )
}