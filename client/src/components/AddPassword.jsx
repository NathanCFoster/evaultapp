import { useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import cryptr from 'cryptr';



const validPass = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
const validWebsite = new RegExp("^(?=.*http://|https://)(?=.*[a-z])\.(?=.*[a-z])")

export default props => {
    const { darkMode, uid, setThisState } = props;
    const [website, setWebsite] = useState("");
    const [socket] = useState(() => io(":8000"));
    const [websiteErr, setWebsiteErr] = useState("");
    const [passErr, setPassErr] = useState(false);
    const crypt = new cryptr("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    const handleSubmit = e => {
        e.preventDefault();

        const createPass = () => {
            let passChoice = "abfilmnqtvwABCNSUVZ124567890!@#$%^&*()_-+=";
            let pass = "";
            for (let index = 0; index < 13; index++) {
                let rand = Math.floor(Math.random() * (passChoice.length - 1));
                pass += passChoice[rand];
            }
            console.log(pass)
            if (validPass.test(pass) == true) {
                return pass
            } else {
                createPass();
            }
        }

        if (validWebsite.test(website)) {
            let pass = createPass();
            console.log(pass);
            axios.post("http://localhost:8000/api/passwords/new", {
                "ownedby": uid,
                "password": crypt.encrypt(pass),
                "website":website
            }).then((d) => {
                console.log(d);
                if (d.data._id) {
                    socket.emit("newpass");
                    setThisState(false);
                }
            }).catch(e => console.log(e));
            setWebsite("");
        } else {
            setWebsiteErr("Must be a valid Website!");
        }
        
    }

    return (
        <form onSubmit={handleSubmit} className="form end-0 rounded-bottom d-flex justify-content-center" style={darkMode ? { backgroundColor: "#3d3d3d" } : { backgroundColor: "#F0F0F0" }}>
            <div className="d-flex flex-column align-items-center">
                <div className="form-floating">
                    <input type="text" value={website} className={darkMode ? "form-control bg-dark text-white" : "form-control bg-white text-black"} onChange={e => setWebsite(e.target.value)} placeholder="e" />
                    <label>Website Name</label>
                </div>
                {websiteErr != "" && <label className="form-text text-danger">{websiteErr}</label>}

            </div>
        </form>
    );
}