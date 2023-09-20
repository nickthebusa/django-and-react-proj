import React, { Component } from "react";

import axios from "axios";

class SongUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            song: {
                song_title: '',
                song_artist: '',
                sound_file: '',
            },
            uploading: false
        }
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getCookie(name) {
        // from django docs
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    handleFileChange(e) {

        console.log(e.target.files[0])

        if (e.target.files[0]) {
            this.setState({
                song: {
                    ...this.state.song,
                    sound_file: e.target.files[0]
                }
            })
        }
        else {
            this.setState({
                ...this.state.song,
                song: { sound_file:'' }
            })
        }
    }
    handleTitleChange(e) {
        this.setState({
            song: {
                ...this.state.song,
                song_title: e.target.value
            }
        })
    }


    // SUBMIT FORM
    handleSubmit(e) {

        e.preventDefault();

        this.setState({
            uploading: true
        })

        let csrftoken = this.getCookie('csrftoken');
        let configAxios = {
            headers: {
              'Content-Type': 'multipart/form-data',
              'X-CSRFToken': csrftoken
            }
        }

        let data = new FormData();
        data.append('sound_file', this.state.song.sound_file)
        data.append('song_title', this.state.song.song_title)

        axios
            .post('myApp/song-create', data, configAxios)
            .then((res) => {
                console.log(res);
                this.setState({
                    song: {
                        song_title: '',
                        song_artist: '',
                        sound_file: '',
                    },
                    uploading: false
                })
            })
            .catch((err) => {
                console.log('ERROR: ', err);
            })
    }

    render() {
        return (
            <div className="song-upload-form-div">
                <form encType="multipart/form-data"
                onSubmit={this.handleSubmit}>
                    <label htmlFor="audio"><strong>Upload Audio:</strong></label>
                    <input type="file" name="audio" accept="audio/*"
                    onChange={this.handleFileChange}
                    src={this.state.song.sound_file} />
                    <label htmlFor="title">Song Title:</label>
                    <input type="text" name="title" 
                    onChange={this.handleTitleChange} 
                    value={this.state.song.song_title} />
                    <button type="submit">Upload</button>
                </form>
            </div>
        )
    }
}

export default SongUpload;