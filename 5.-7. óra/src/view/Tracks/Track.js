import { TrackAction } from "./TrackAction";

export function Track({ track }){
    const {artist, title} = track;
    return(
        <><tr>
        <td><i className="user icon"></i> {artist}</td>
        <td><i className="music icon"></i> {title}</td>
        <td className="right aligned collapsing">
        <TrackAction></TrackAction>
        </td>
    </tr></>
    );
} 