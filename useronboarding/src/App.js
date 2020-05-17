import React, {useState} from 'react';
import Users from './component/Users';
import UsersForm from './component/UsersForm';
import './App.css';

function App(props) {
  const [users, setUsers] = useState([
    {
      id: 1,
      user: "Hoolio Osuna",
      email: "hoolio.osuna@gmail.com",
      password: "password"

    }
  ])

    const addUser = (newUser) => {
            setUsers([...users, newUser])
    }

return (
   <div className="App">
   <h1>User Registration</h1>
   <UsersForm addUser={addUser} />
   <Users users={users}/>
   </div>
  );
}


export default App;