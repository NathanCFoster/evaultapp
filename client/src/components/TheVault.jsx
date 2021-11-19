import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import cryptr from "cryptr";;


export default props => {
    const { mode } = props;
    const [user, setUser] = useState({});
    const [socket] = useState(() => io(":8000"));
    const [passwords, setPasswords] = useState([]);
    const [loading, setLoad] = useState(true);
    const crypt = new cryptr("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    useEffect(() => {
        axios.get("http://localhost:8000/api/user/" + props.uid + "/").then(e => setUser(e.data)).catch(e => console.log(e));
        socket.emit("newpass");
        setLoad(true);
        socket.on("passwords", async () => {
            await(axios.get("http://localhost:8000/api/passwords/" + props.uid + "/").then(e => {
                for (let index = 0; index < e.data.length; index++) {
                    e.data[index].hash = crypt.decrypt(e.data[index].password);
                }
                setPasswords(e.data);
            }).catch(e => console.log(e)));
            setLoad(false);
        })
    }, [])

    return (
        <div className={"container"}>
            <p className="display-2">{user.username}'s Vault</p>
            {loading && <p className="alert alert-danger m-5">Finding and encrypting passwords</p>}
            <table className={mode ? "table table-borderless table-hover text-white" : "table table-borderless table-hover text-black"}>
                <thead>
                    <th className="col-2">Website</th>
                    <th className="col-5">Password</th>
                </thead>
                <tbody>
                    {passwords.map((item) =>
                        <tr key={item._id} className="">
                            <th className=""><a href={item.website} className={mode ? "nav-link" : "nav-link"}>{item.website}</a></th>
                            {user.showpass == false && 
                            <th className=""><Link to='#' onClick={() => navigator.clipboard.writeText(item.hash)} className={mode ? "nav-link text-white" : "nav-link text-black"}>Hidden</Link></th>
                            }
                            {user.showpass == true && 
                            <th className=""><Link to='#' onClick={() => navigator.clipboard.writeText(item.hash)} className={mode ? "nav-link text-white" : "nav-link text-black"}>{item.hash}</Link></th>
                            }
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}