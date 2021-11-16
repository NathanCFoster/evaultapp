import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";

export default props => {
    const { mode, uid, setDisplay } = props;
    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get("http://localhost:8000/api/user/" + uid + "/").then(e => setUser(e.data)).catch(e => console.log(e));
    }, [])

    return (
        <div className="col-5">
            <ul className="nav flex-column">
                <Link to="#" onClick={() => setDisplay("Settings")} className={mode ? "nav-link text-white" : "nav-link text-black"}>Settings</Link>
                <Link to="#" onClick={() => setDisplay("Preferences")} className={mode ? "nav-link text-white" : "nav-link text-black"}>Preferences</Link>
                <Link to="/logout" className="text-danger nav-link">Logout</Link>
            </ul>
        </div>
    );
}