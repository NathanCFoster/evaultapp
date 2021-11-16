
import { Link } from "react-router-dom";

export default props => {

    return (
        <div className="container-fluid row">
            <div className="nav justify-content-between me-0">
                <p className="fs-3 m-3 text-center">EVault</p>
                <div className="d-flex flex-row align-items-center justify-content-evenly">
                    <Link to="/about" className="nav-link text-black">About Us</Link>
                    <Link className="nav-link text-black" to="/pricing">Pricing</Link>
                    <Link className="nav-link text-black" to="/reviews">Reviews</Link>
                </div>
            </div>
            <div className="container">
                <p className="display-2 mt-3">Welcome to EVault</p>
                <div className="row">
                    <div className="col"></div>
                    <p className="mt-5 fs-3 col">We ensure you never have to worry about passwords again!</p>
                    <div className="col"></div>
                </div>
            </div>
            <div className="d-flex flex-row justify-content-evenly m-3 mt-5">
                <Link className="btn-outline-dark btn" to="/login" style={{width:200}}>Login</Link>
                <Link className="btn-outline-dark btn" to="/register" style={{width:200}}>Register</Link>
            </div>
        </div>
    );
}