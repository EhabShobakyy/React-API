import React, {Component} from 'react';
import './App.css';
import ViewUser from './Components/ViewUser';
import { getUsers, deleteUser ,updateUser,addUser} from './API/Users';
import UserForm from './Components/UserForm';

class App extends Component{
  
  state = {
    users: [],
    user : {}
}
  
  componentDidMount=() => {
    getUsers()
      .then(response => {
      this.setState({
        users: response.data
      })
      .catch(error => {
      alert('Some Thing Wrong'); 
      });
      });
  }

  setActive = (user) =>{
    this.setState({ 'user': user });
  }

  deleteUser = (user) =>{
    // delete from server
    deleteUser(user.id)
    .then(() => {
    let users = this.state.users;    // to get users from server
    const index = users.indexOf(user); // to get user index
    users.splice(index, 1);            // to remove user
      this.setState({ users })
         .catch (error=> {
        alert('Some Thing Wrong'); 
         })
        ;          // to update users in server
    })
  }
  
     updateUser = (values) => {
       const id = this.state.user.id;
       updateUser(id, values)
         .then(() => {
           alert('Success');
         });
     }
  addUser = (values) => {
    addUser(values).then(() => {
      alert('Success');
    })
      .catch(error => {
        alert("Some Thing Wrong");
      });
  }
  
  render() {
    return (
      <div className="App">
        <ul>
          {this.state.users.map(user => 
            <li key={user.id}>
              {user.name} {' '}
              <button onClick={() => this.setActive(user)}>View</button>
              <button onClick={()=>this.deleteUser(user)}>Delete</button>
            </li>
          )}
        </ul>
        <div>
          <h3>User Details</h3>   
          {this.state.user.id > 0 ?
            <ViewUser user={this.state.user} />
            : 'Please Select a User'
          }
        </div>
          <div>
          <h3>Edit User</h3>   
          {this.state.user.id > 0 ?
            <UserForm
              values={this.state.user}
              onSubmit={this.updateUser} />
            : 'Please Select a User'
          }
        </div>
          <div>
          <h3>ADD new User</h3>   
            <UserForm
            values={{
              name: '',
              email : ''
              }}
              onSubmit={this.addUser} />
    
        </div>
        </div>
    );
  }
}

export default App;
