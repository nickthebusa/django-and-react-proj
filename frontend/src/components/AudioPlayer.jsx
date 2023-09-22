import { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 
{
    faPlay, 
    faPause,
    faBackwardStep,
    faForwardStep,
} 
from '@fortawesome/free-solid-svg-icons';


class AudioPlayer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { isPlaying } = this.props;

        return(
        <div className="AudioPlayer-div-wrapper">

            <span>
                <FontAwesomeIcon icon={faBackwardStep} />
            </span>

            <span className="audio-player-btn">
            {isPlaying 
            ? 
            <FontAwesomeIcon icon={faPause}/> 
            : 
            <FontAwesomeIcon icon={faPlay} />}
            </span>

            <span>
                <FontAwesomeIcon icon={faForwardStep} />
            </span>

        </div>
        )
    }

}

export default AudioPlayer;