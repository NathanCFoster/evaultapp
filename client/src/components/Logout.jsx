import { useNavigate } from "react-router";
import { useEffect } from "react"; 

export default (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        props.login("");
        localStorage.clear();
        navigate("/");
    }, [])

    return(
        <div>
            
        </div>
    );
}