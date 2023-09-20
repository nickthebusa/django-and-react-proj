import React, { Component } from "react";
import axios from "axios";

class ThingsList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        viewCompleted: false,
        thingsList: [],
        activeItem: {
          id: null,
          thing: '',
          good: false
        },
        editing: false,
      }
      this.fetchThings = this.fetchThings.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.getCookie = this.getCookie.bind(this);
      this.startEdit= this.startEdit.bind(this);
      this.deleteItem = this.deleteItem.bind(this);
      this.checkUnCheck = this.checkUnCheck.bind(this);
    }
  
    componentDidMount() {
      this.fetchThings();
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
  
    // api call to /thing-list/
    fetchThings() {
      axios
        .get('/myApp/thing-list/')
        .then(res => {
          this.setState({
            thingsList: res.data
          })
        })
    }
  
    handleChange(e) {
      //let name = e.target.name;
      let value = e.target.value;
      //console.log({'Name': name, "Value": value});
      this.setState({
        activeItem:{
          ...this.state.activeItem,
          thing:value
        }
      })
    }
  
    handleSubmit(e) {
      e.preventDefault();
  
      let csrftoken = this.getCookie('csrftoken');
  
      // if editing is false
      let url = 'myApp/thing-create';
  
      // to edit thing
      if (this.state.editing) {
        url = `myApp/thing-update/${this.state.activeItem.id}`;
        this.setState({
          editing: false
        })
      }
  
      let configAxios = {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken
        }
      }
      axios
        .post(url, JSON.stringify(this.state.activeItem), configAxios)
        .then((res) => {
          console.log(res);
          this.fetchThings();
          this.setState({
            activeItem: {
              id: null,
              thing: ''
            }
          })
        })
        .catch((err) => {
          console.log('ERROR: ', err);
        })
    }
  
    startEdit(thing) {
      this.setState({
        activeItem: thing,
        editing: true
      })
    }
  
    deleteItem(thing) {
      let csrftoken = this.getCookie('csrftoken');
  
      let configAxios = {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken
        }
      }
      axios
        .delete(`myApp/thing-delete/${thing.id}`, configAxios)
        .then((res) => {
          console.log(res);
          this.fetchThings();
        })
        .catch((err) => {
          console.log(err);
        })
    }
  
    checkUnCheck(thing) {
      thing.good = !thing.good;
  
      let csrftoken = this.getCookie('csrftoken');
  
      let configAxios = {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken
        }
      }
      axios
        .post(`myApp/thing-update/${thing.id}`,
        JSON.stringify(thing), configAxios)
        .then((res) => {
          console.log(res);
          this.fetchThings();
        })
        .catch((err) => {
          console.log(err);
        })
    }
  
    // render all the list items
    renderList() {
  
    // allows this to be accessible in loop (thing.map)
    let self = this;
  
    if(this.state.thingsList.length > 0) {
        let things = this.state.thingsList;
        return (
        <div id="list-wrapper">
        {things.map((thing, index)=>{
            return (
            <div key={index} className="thing-wrapper flex-wrapper">

                <div style={{flex: 7}}>
                <span className="id-list">{thing.id}</span>
                </div>

                <div 
                onClick={() => self.checkUnCheck(thing)}
                onKeyDown={(e) => {
                if (e.key==="Enter") {
                    self.checkUnCheck(thing);
                }
                }}
                role="button"
                tabIndex="0"
                style={{flex: 2}}>
                {!thing.good ? (
                    <span>{thing.thing}</span>
                    ) : (
                    <span style={{color: '#07ed48'}}>{thing.thing}</span>
                    )}
                
                </div>

                <div style={{flex: 1}}>
                <button 
                onClick={() => self.startEdit(thing)} 
                className="btn btn-sm btn-outline-info">EDIT</button>
                </div>

                <div style={{flex: 1}}>
                <button 
                onClick={() => self.deleteItem(thing)}
                className="btn btn-sm btn-outline-dark delete">🗑️</button>
                </div>

            </div>
            )
        })}
        </div> 
        )
        }
    }
  
    render() {
        return (
        <div className="container">
            <div id="user-container"> 
            <div id="form-wrapper">
                <form id="form" onSubmit={this.handleSubmit}>
                <div className="flex-wrapper">
                    <div style={{flex: 6}}>
                    <input className="form-control" 
                            id="title" 
                            type="text" 
                            name="title"
                            placeholder="Add Thing"
                            onChange={this.handleChange}
                            value={this.state.activeItem.thing}
                    />
                    </div>
                    <div style={{flex: 1}}>
                    <input className="btn btn-warning"
                            id="submit"
                            type="submit"
                            name="Add"
                    />
                    </div>
                </div>
                </form>
            </div>
            {this.renderList()}
            </div>        
        </div>
        )
    }
}
  
export default ThingsList;