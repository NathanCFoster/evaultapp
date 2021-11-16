import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs';
import { validPass } from "./passregex";

export default props => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPw, setConfirm] = useState("");
    const [errs, setErrs] = useState({
        username: "",
        password: "",
        email: "",
        confirmPW: ""
    })

    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        let updatedErrs = { ...errs };
        if (password == confirmPw) {
            updatedErrs["confirmPW"] = "";

            
            // get any users with the associated username and email that user inputed
            if (username.length == 0) {
                updatedErrs["username"] = "Username is required";
            } else {
                updatedErrs["username"] = "";
            }
            if (email.length == 0) {
                updatedErrs["email"] = "Email is required";
            } else {
                updatedErrs["email"] = "";
            }
            if (updatedErrs["email"] == "" && updatedErrs["username"] == "") {
                let nameRes = await (await (axios.get("http://localhost:8000/api/user/name/" + username + "/"))).data;
                let emailRes = await (await (axios.get("http://localhost:8000/api/user/email/" + email + "/"))).data;
                
                // check if there are any users found
                if (nameRes.length != 0) {
                    updatedErrs["username"] = "Looks like someone has already used that username...";
                }
                if (emailRes.length != 0) {
                    updatedErrs["email"] = "Looks like someone has already used that email...";
                }
            }
            
            if (!validPass.test(password)) {
                updatedErrs["password"] = "Password must be at least 8 characters and have at least 1 number"
            } else {
                updatedErrs["password"] = "";
            }
            
            console.log("e")
            // finally check if any of that happened and validate backside if it didn't
            if (Object.keys(updatedErrs).every(e => updatedErrs[e] == "")) {
                let res = await (axios.post("http://localhost:8000/api/user/new", {
                    username,
                    password: bcrypt.hashSync(password, 8),
                    email
                }));
                if (res.data.error) {
                    // loop through the errors if any and set error messages to be those messages
                    for (const error in res.data.error.errors) {
                        updatedErrs[error] = res.data.error.errors[error]["message"];
                    }
                    console.log(res.data);
                } else {
                    // finally if there are no errors go ahead and login with the id that the server assigned
                    props.login(res.data._id);
                    navigate("/");
                }
            }

        } else {
            updatedErrs["confirmPW"] = "Passwords must be the same!";
        }
        setErrs(updatedErrs);
    }


    return (
        <form onSubmit={handleSubmit} className="form m-5 p-5">
            <p className="display-2 text-start ps-3 mb-3">Register</p>
            <div className="ms-3">
                {errs["username"] != "" && <div className="alert alert-danger m-3">{errs["username"]}</div>}
                <div className="form-floating mb-3">
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="e" className="form-control" style={{width:750}} />
                    <label className="text-black">Username</label>
                </div>
                {errs["email"] != "" && <div className="alert alert-danger m-3">{errs["email"]}</div>}
                <div className="form-floating mb-3">
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="e" className="form-control" style={{width:750}} />
                    <label className="text-black">Email</label>
                </div>
                {errs["password"] != "" && <div className="alert alert-danger m-3">{errs["password"]}</div>}
                <div className="form-floating mb-3">
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" placeholder="e" style={{width:750}} />
                    <label className="text-black">Password</label>
                    {errs["password"] == "" && <p className="form-text ms-3 text-start">Password must be alphanumeric and have at least 8 chars long.</p>}
                </div>
                {errs["confirmPW"] != "" && <div className="alert alert-danger m-3">{errs["confirmPW"]}</div>}
                <div className="form-floating mb-3">
                    <input type="password" value={confirmPw} onChange={e => setConfirm(e.target.value)} placeholder="e" style={{width:750}} className="form-control" />
                    <label className="text-black">Confirm Password</label>
                </div>
                <div className="d-flex align-items-start flex-column">
                    <input type="submit" value="Register" className="btn btn-outline-dark" style={{ width: 350 }} />
                    <Link className="nav-link p-0 mt-3" to="/login">Already have an account?</Link>
                </div>
            </div>
        </form>
    );
}