import React, { useState } from 'react';
// import Users from './Users';


const UserForm = props => {
    const [user, setUser] = useState({
        id: Math.random(),
        user: "",
        email: "",
        password: ""
    })


    const changeHandler = (event) =>  {
        setUser({
           ...user, 
           [event.target.name]: event.target.value
        })   
    }


    return (
    <form 
     onSubmit={event => {
         event.preventDefault();
         props.addUser(user);
         
         
        setUser({user: "", email:"", password:"", id: Math.random()})
     }}
    >
    <h3>Please fill in all data</h3>
        <label htmlFor="username">UserName (4 to 8 characters):</label><br />
        <input type="text" 
            id="user" 
            name="user" 
            value={user.user}
            required 
            minLength="4" 
            maxLength="8" 
            size="40" 
            onChange={changeHandler}
            />
            <br />

        <label htmlFor="email">Email Address : </label>
        <pre>(example: username@myemail.com)</pre>
        <input 
            type="email" 
            name="email" 
            value={user.email}
            id="email" 
            size="40" 
            required 
            onChange={changeHandler}
            />
            <br />
       
        <label htmlFor="pass">Password:</label>
        <pre>(8 characters minimum)</pre>
        
        <input 
            type="password" 
            name="password" 
            size="40"
            required 
            value={user.password}
            onChange={changeHandler}
            />
            <br />
        <button type="submit">Click to submit</button>

    </form>
    )
};

export default UserForm;