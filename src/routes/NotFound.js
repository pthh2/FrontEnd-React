import { Alert } from "react-bootstrap";
const NotFound = ()=>{
    return(
        <>
         <Alert variant="primary" className ="mt-3">
                <Alert.Heading> Ooopp !!!</ Alert.Heading>
                <p>
                NotFound. 
                </p>
            </Alert>
         
        </>
    )
}
export default NotFound;