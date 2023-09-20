import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";

// my modules
// import Modal from "./components/Modal"
import ThemeSwitch from "./components/ThemeSwitch.jsx";
import SongUpload from "./components/SongUpload.jsx";
import SongList from "./components/SongList.jsx"
import AudioPlayer from "./components/AudioPlayer.jsx";
import ThingsList from "./components/ThingsList.jsx";

const queryClient = new QueryClient()

//  !  from tutorial  !

//   defaultOptions: {
//     queries: {
//       staleTime: Infinity,
//       cacheTime: Infinity
//     },
//   },
// });



// class App extends Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         viewCompleted: false,
//         todoList: [],
//         modal: false,
//         activeItem: {
//           title: "",
//           description: "",
//           completed: false,
//         },
//       };
//     }

//     componentDidMount() {
//       this.refreshList();
//     }

//     refreshList = () => {
//       axios
//         .get("/myApp/user-list/")
//         .then((res) => this.setState({ todoList: res.data }))
//         .catch((err) => console.log(err));
//     }

//     handleSubmit = (item) => {
//       this.toggle();

//       if (item.id) {
//         axios
//           .put(`/api/todos/${item.id}/`, item)
//           .then(() => this.refreshList());
//         return;
//       }
//       axios
//         .post("/api/todos/", item)
//         .then(() => this.refreshList());
//         // .then((res) => this.refreshList());
//     }

//     handleDelete = (item) => {
//       axios
//         .delete(`/api/todos/${item.id}/`)
//         .then(() => this.refreshList());
//     }

//     toggle = () => {
//       this.setState({ modal: !this.state.modal });
//     }

//     createItem = () => {
//       const item = { title: "", description: "", completed: false };

//       this.setState({ activeItem: item, modal: !this.state.modal });
//     }

//     editItem = (item) => {
//       this.setState({ activeItem: item, modal: !this.state.modal });
//     }
  
//     displayCompleted = (status) => {
//       if (status) {
//         return this.setState({ viewCompleted: true });
//       }
  
//       return this.setState({ viewCompleted: false });
//     };
  
//     renderTabList = () => {
//       return (
//         <div className="nav nav-tabs">
//           <span
//             className={this.state.viewCompleted ? "nav-link active" : "nav-link"}
//             onClick={() => this.displayCompleted(true)}
//             onKeyDown={(e) => {if(e.key==="Enter")this.displayCompleted(true)}}
//             role="button"
//             tabIndex="0"
//           >
//             Complete
//           </span>
//           <span
//             className={this.state.viewCompleted ? "nav-link" : "nav-link active"}
//             onClick={() => this.displayCompleted(false)}
//             onKeyDown={(e) => {if(e.key==="Enter")this.displayCompleted(true)}}
//             role="button"
//             tabIndex="0"
//           >
//             Incomplete
//           </span>
//         </div>
//       );
//     };
  
//     renderItems = () => {
//       const { viewCompleted } = this.state;
//       const newItems = this.state.todoList.filter(
//         (item) => item.completed == viewCompleted
//       );
  
//       return newItems.map((item) => (
//         <li
//           key={item.id}
//           className="list-group-item d-flex justify-content-between align-items-center"
//         >
//           <span
//             className={`todo-title mr-2 ${
//               this.state.viewCompleted ? "completed-todo" : ""
//             }`}
//             title={item.description}
//           >
//             {item.title}
//           </span>
//           <span>
//             <button
//               className="btn btn-secondary mr-2"
//               onClick={() => this.editItem(item)}
//             >
//               Edit
//             </button>
//             <button
//               className="btn btn-danger"
//               onClick={() => this.handleDelete(item)}
//             >
//               Delete
//             </button>
//           </span>
//         </li>
//       ));
//     };
  
//     render() {
//       return (
//         <BrowserRouter>
//         <QueryClientProvider client={queryClient}>
//         <div>
//             <h1>SITE</h1>
//           <Routes>
//             {/* no routes yet */}
//           </Routes>
//         </div>
//         <main className="container">
//           <ThemeSwitch />
//           <h1 className="app-name">TODO APP</h1>
//           <div className="row">
//             <div className="col-md-6 col-sm-10 mx-auto p-0 todo-box">
//               <div className="card p-3">
//                 <div className="mb-4">
//                   <button
//                     className="btn btn-primary"
//                     onClick={this.createItem}
//                   >
//                     Add task
//                   </button>
//                 </div>
//                 {this.renderTabList()}
//                 <ul className="list-group list-group-flush border-top-0">
//                   {this.renderItems()}
//                 </ul>
//               </div>
//             </div>
//           </div>
//           {this.state.modal ? (
//             <Modal
//               activeItem={this.state.activeItem}
//               toggle={this.toggle}
//               onSave={this.handleSubmit}
//             />
//           ) : null}
//         </main>
//         </QueryClientProvider>
//         </BrowserRouter>
//       );
//     }
//   }
  
//   export default App;



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <React.StrictMode>
      <BrowserRouter>
      <QueryClientProvider client={queryClient}>
      
      <header className="myApp-header">
        <h1>MyApp</h1>
        <ThemeSwitch></ThemeSwitch>
      </header>

      <ThingsList></ThingsList>

      <SongUpload></SongUpload>

      <SongList ></SongList>

      <AudioPlayer ></AudioPlayer>

      </QueryClientProvider>
      </BrowserRouter>
      </React.StrictMode>
    )
  }
}

export default App;