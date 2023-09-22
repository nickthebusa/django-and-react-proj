import { Component } from "react";

class ThemeSwitch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            darkModeSwitched: false,
            darkModeStatus: "OFF"
        }
    }

    componentDidMount() {
        // check user's system settings for theme
        if (window.matchMedia && 
            window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.setState({
                darkModeSwitched: true,
                darkModeStatus: "ON"
            })
        }
    }

    toggleDarkMode = () => {
        this.setState((prevState) => ({
            darkModeSwitched: !prevState.darkModeSwitched,
            darkModeStatus: prevState.darkModeSwitched ? "OFF" : "ON"
        }));
        
    }

    render() {
        // update the theme
        let themeClass = this.state.darkModeSwitched ? 'darkmode' : 'lightmode';
        document.querySelector("body").setAttribute('id', `${themeClass}`);

        // the HTML for the theme switch
        return (
            <div className="switch-div">
                <p className="dark-mode-status">Dark mode: {this.darkModeStatus}</p>
                <label className="switch" htmlFor="toggle-theme">
                    <input title="toggle-theme" id="toggle-theme" type="checkbox" 
                            checked={this.state.darkModeSwitched}
                            onChange={this.toggleDarkMode}/>
                    <span className="slider"></span>
                </label>
            </div>
        )
    }
}

export default ThemeSwitch;