import { useEffect, useImperativeHandle, useState } from "react";
import { Link } from "react-router-dom";
import AddPassword from "./AddPassword";

export default (props) => {
    const { darkMode, scroll, uid } = props;
    const [showAdd, setAdd] = useState(false);

    return (
        <div className={scroll ? "d-flex fixed-top align-items-center justify-content-between" : "d-flex sticky-top align-items-center justify-content-between"} style={darkMode ? { backgroundColor: "#3d3d3d" } : { backgroundColor: "#F0F0F0" }}>
            <p className="display-4 ms-3">EVault</p>
            <div className={"nav d-flex flex-row justify-content-end align-items-center rounded-bottom"}>
                <Link to="/" className={darkMode ? "nav-link text-white" : "nav-link text-black"}>Home</Link>
                <Link to={"/account/"} className={darkMode ? "nav-link text-white" : "nav-link text-black"}>Your Account</Link>
                <Link to="#" onClick={() => setAdd(!showAdd)} className={darkMode ? "nav-link text-white" : "nav-link text-black"}>Add a password</Link>
                {showAdd && <AddPassword darkMode={darkMode} uid={uid} setThisState={setAdd} />}
            </div>
        </div>
    );
}