import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";


export default props => {
    const { mode } = props;
    const [user, setUser] = useState({});
    const [socket] = useState(() => io(":8000"));
    const [passwords, setPasswords] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/user/" + props.uid + "/").then(e => setUser(e.data)).catch(e => console.log(e));
        socket.emit("newpass");
        socket.on("passwords", () => {
            axios.get("http://localhost:8000/api/passwords/" + props.uid + "/").then(e => setPasswords(e.data)).catch(e => console.log(e));
        })
    }, [])

    return(
        <div className={"container"}>
            <p className="display-2">{user.username}'s Vault</p>
            <table className={mode ? "table table-borderless table-hover text-white" : "table table-borderless table-hover text-black"}>
                <thead>
                    <th>Website</th>
                    <th>Password</th>
                </thead>
                <tbody>
                {passwords.map((item) => 
                    <tr key={item._id}>
                        <th>{item.website}</th>
                        <th>{item.password}</th>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}