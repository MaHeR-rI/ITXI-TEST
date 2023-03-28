import { useContext } from "react";
import AuthContext from "../store/AuthContext";
const NavBar = () => {
    const authCtx=useContext(AuthContext)

    return (<div className="navbar">
        <h2><a href="/">Spotify Artist Search</a></h2>
       {authCtx.isLoggedIn && <span onClick={authCtx.logout}>logout</span>}
    </div>)
}
export default NavBar;