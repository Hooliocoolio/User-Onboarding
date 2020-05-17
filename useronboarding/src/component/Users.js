import React from 'react';


const Users = props => {
    return (
        <div className="user-list">
        {props.users.map(user => (
            <div className="user" key={user.id}>
            <h3>User:{user.user}</h3>
            <p>Email:{user.email}</p>
            <p>Password:{user.password}</p>
            </div>
        ))}
        </div>
    );
};

export default Users;
