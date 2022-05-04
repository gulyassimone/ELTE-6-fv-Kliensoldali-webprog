import {examplePlaylists} from "../../domain/playlist";
import cn from 'classnames';
import {PlaylistsLis} from "./PlaylistsLis";
import {Playlist} from "./PlayList";
import {TrackDetail} from "./TrackDetail";
import {exampleTracks} from "../../domain/track";
import {useState} from "react";

const Playlists = () => {
    const playlists = examplePlaylists;
    const tracks = exampleTracks;

    const defaultId = playlists[0].id;
    const [chosenPlaylistId, setChosenPlayListId] = useState(defaultId);
    const chosenPlayList = playlists.find(
        playlist => playlist.id === setChosenPlayListId
    );
    const [chosenTrackId, setChosenTrackId] = useState();
    const chosenTrack = tracks.find(
        track => track.id === chosenTrackId
    );

    const handleChosePlayList = id => {
        setChosenPlayListId(id);
        setChosenTrackId(null);
    };

    return (
        <div className="ui container">
            <h1>My Playlists</h1>
            <div className="ui stackable two column grid">
                <PlaylistsLis>

                </PlaylistsLis>
                <Playlist></Playlist>
            </div>
            <TrackDetail></TrackDetail>
            <div className="ui divider"></div>
            <div className="ui modal">
                <i className="close icon"></i>
                <div className="header">Add new Playlist</div>
                <div className="image content">
                    <div className="description">
                        <div className="ui form">
                            <div className="field">
                                <label>Name</label>
                                <input required type="text" placeholder="My Playlist"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="actions">
                    <div className="ui black deny button">
                        Cancel
                    </div>
                    <div className="ui positive right labeled icon button">
                        Add
                        <i className="plus icon"></i>
                    </div>
                </div>
            </div>
            <div className="ui modal">
                <i className="close icon"></i>
                <div className="header">Add new Playlist</div>
                <div className="image content">
                    <div className="description">
                        <div className="ui form">
                            <div className="field">
                                <label>Name</label>
                                <input required type="text" placeholder="My Playlist"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="actions">
                    <div className="ui black deny button">
                        Cancel
                    </div>
                    <div className="ui positive right labeled icon button">
                        Add
                        <i className="plus icon"></i>
                    </div>
                </div>
            </div>
        </div>


    )
        ;
}

export default Playlists;