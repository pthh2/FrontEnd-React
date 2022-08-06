import { Alert } from "react-bootstrap";
import { Routes,Route, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext, useEffect } from 'react';
const PrivateRoute =(props)=>{
    const {user}=useContext(UserContext)
    if(user && !user.auth){
        return(
            <>
            <Alert variant="danger" className ="mt-3">
                <Alert.Heading> Ooopp !!!</ Alert.Heading>
                <p>
                You have no permission to access this route
                </p>
            </Alert>
            </>
        )
    }
return(
    <>

         {props.children } 

    </>
)

}
export default PrivateRoute;