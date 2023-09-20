import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlay, faPause} from '@fortawesome/free-solid-svg-icons';

import axios from "axios";

class SongList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songsList: [],
            song_playing: null
        }
        this.loadList = this.loadList.bind(this);
        this.togglePlayPause = this.togglePlayPause.bind(this);
        this.isPlaying = this.isPlaying.bind(this);
        this.playSong = this.playSong.bind(this);
    }

    componentDidMount() {
        this.loadList();
    }

    loadList() {
        axios
            .get("/myApp/song-list/")
            .then((res) => {
                this.setState({
                    songsList: res.data
                })
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    togglePlayPause(id) {
        if (this.state.song_playing!==id) {
            this.setState({
                song_playing: id
            })
        }
        else {
            this.setState({
                song_playing: null
            })
        }
    }
    isPlaying(id) {
        if (this.state.song_playing===id) {
            return true;
        }
        return false;
    }
    // test
    playSong() {
        if (this.state.song_playing!==null) {
            let src = this.state.songsList.find(x => x.id === this.state.song_playing).sound_file;
            let audio = new Audio(src);
            audio.play();
        }
    }

    render() {
        let songsList = this.state.songsList;
        const self = this;
        this.playSong();

        return (
            <div className="songs-list">
                <div className="songs-list-header"><strong>Songs:</strong></div>
                {songsList.map((song, index) => {
                    return (
                    <div 
                    key={index} className="song-wrapper"
                    onClick={()=>this.togglePlayPause(song.id)}
                    onKeyDown={(e) => {if(e.key==="Enter")this.togglePlayPause(song.id)}}
                    role="button"
                    tabIndex='0'>
                        <p>{song.song_title || "-"}</p>
                        <p>{song.song_artist || "-"}</p>
                        <span className="play-pause-songs-list">
                        {self.isPlaying(song.id)
                        ? 
                        <FontAwesomeIcon icon={faPause}/> 
                        : 
                        <FontAwesomeIcon icon={faPlay} />}
                        </span>
                    </div>
                    )
                })}
            </div>
        )
    }
}

export default SongList;