import { useEffect, useImperativeHandle } from "react";
import { Link } from "react-router-dom";


export default (props) => {
    const { darkMode, setMode } = props; 

    return (
        <div className="d-flex align-items-center justify-content-between" style={{ height: 75, backgroundColor: "#F0F0F0" }}>
            <div className="form-check form-switch ms-3">
                <input type="checkbox" role="switch" onChange={() => setMode(!darkMode)} className="form-check-input" />
            </div>
            <div className="nav d-flex flex-row justify-content-end align-items-center rounded-bottom">

                <Link to="/" className={darkMode ? "nav-link text-white" : "nav-link text-black"}>Home</Link>
                <Link to={"/account/" + props.uid} className="nav-link text-black">Your Account</Link>
                <Link to="/add" className="nav-link text-black">Add a password</Link>
            </div>
        </div>
    );
}