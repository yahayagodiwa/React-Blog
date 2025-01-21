import { useContext } from "react"
import { userContext } from "../Contexts/AuthContext"
import { Navigate, } from "react-router-dom"

const AuthRoute = ({children}) => {
const {token } = useContext(userContext)

if(!token) {
  return <Navigate to="/login" replace />
}

return children
}


export default AuthRoute