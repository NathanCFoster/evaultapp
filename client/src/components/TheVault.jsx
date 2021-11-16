import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


export default props => {
    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get("http://localhost:8000/api/user/" + props.uid + "/").then(e => setUser(e.data)).catch(e => console.log(e));
    }, [])

    return(
        <div className="container">
            <p className="display-2">{user.username}'s Vault</p>
            <table className="table">
                <thead>
                    <th>Website</th>
                    <th>Username</th>
                    <th>Password</th>
                </thead>
                <tbody>
                    <tr>
                        <th>This</th>
                        <th>That</th>
                        <th>Foo</th>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}