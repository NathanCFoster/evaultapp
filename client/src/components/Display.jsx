

export default props => {
    const { display, setMode, darkMode, setPass, pass } = props;

    return(
        <div className="col row">
        {display == "Settings" && 
        <div className="row">
            <p className="display-2 mb-3">Settings</p>
            <div className="form-check justify-content-start d-flex">
                <input type="checkbox" className="form-check-input" onChange={() => setPass()} checked={pass} id="passcheck" value="" />
                <label className="form-check-label ms-3" htmlFor="passcheck">Show passwords</label>
            </div>
        </div> }
        {display == "Preferences" && 
        <div className="row">
            <p className="display-2 mb-3">Preferences</p>
            <div className="form-check form-switch row">
                <label className="form-check-label text-start" htmlFor="darkmode">{darkMode ? "Light mode" : "Dark mode"}</label>
                <input type="checkbox" role="switch" onChange={() => setMode()} className="form-check-input" checked={darkMode} id="darkmode" />
            </div>
        </div>
        }
        </div>
    );
}