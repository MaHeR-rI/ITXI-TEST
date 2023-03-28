import logo from "../logo.png"
import { useEffect, useContext } from "react"
import AuthContext from "../store/AuthContext"
import { useNavigate } from "react-router-dom"
const Login = () => {
    const CLIENT_ID = 'f5184d90a4794a38afce64f34972b328'
    const REDIRECT_URI = 'http://localhost:3000/'
    const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
    const RESPONSE_TYPE = 'token'
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate()
    useEffect(() => {
        const hash = window.location.hash;
        if (!authCtx.token && hash) {
            const spotToken = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
            const expiration = hash.substring(1).split("&").find(elem => elem.startsWith("expires_in")).split("=")[1];
            window.location = "";
            navigate('/')
            const expirationTime = new Date(new Date().getTime() + (+expiration * 1000))
            authCtx.login(spotToken, expirationTime.toISOString());
        }
    }, [authCtx])

    return (<div className="login">
        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>
            <span>login</span>
            <img src={logo} alt="spotify" />
        </a>
    </div>)
}
export default Login;