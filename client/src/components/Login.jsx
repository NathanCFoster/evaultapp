import axios from 'axios';
import { useState } from 'react';
import bcrypt from 'bcryptjs';
import { Link, useNavigate } from 'react-router-dom';

export default props => {
    // variable setting
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();

        // grab the user that is connected to the username user inputted
        let user = await (await (axios.get("http://localhost:8000/api/user/name/" + username + "/"))).data[0];

        console.log(user);
        // check if the users password and the password found in db are same
        if (user && bcrypt.compareSync(password, user.password)) {
            props.login(user._id);
            navigate("/");
        } else {
            setErr(true);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="form m-5 p-5">
            <p className="display-2 ms-3 text-start ps-3 mb-3">Login</p>
            {err && <div className="alert alert-danger m-3">Oops... looks like either your username or password is incorrect!</div>}
            <div className="ms-3">
                <div className="form-floating mb-3">
                    <input type="text" vlaue={username} onChange={e => setUsername(e.target.value)} placeholder="e" className="form-control" style={{ width: 750 }} />
                    <label className="text-black">Username</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="e" className="form-control" style={{ width: 750 }} />
                    <label className="text-black">Password</label>
                </div>
                <div className="d-flex align-items-start flex-column">
                    <input type="submit" value="Login" className="btn btn-outline-dark align-self-start" style={{ width: 350 }} />
                    <Link className="nav-link p-0 mt-3" to="/register">Create an account</Link>
                </div>
            </div>
        </form>
    );
}