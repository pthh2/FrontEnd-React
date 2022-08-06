const Home=()=>{
return(

<div className="home-container">

        <h1>Hanh's app functions</h1>
        <p>Description: </p>
        <p> 
        Here is my app with below functions. Because  https://reqres.in/ it is a frontend application, it is limited to not using a database link but it is connected from an API (<a href="https://reqres.in/" target="_blank">  https://reqres.in/ </a>). Because it uses data from an API, its functionality is somewhat limited. However, the functions included on this app are a summary of the necessary functions of an app to be used in real life.
        </p>
        <br/>
        <div className="row">
        <div className=" col-12 col-sm-4">
                <ul className="list-group"><b> 1.	Login. Axios. Store to local storage</b></ul>
                <ul className="list-group"><b> 2.	Private routes. Check token</b></ul>
                <ul className="list-group"><b> 3.	CRUD users</b>
                        <li  className="list-group-item">List users </li>
                        <li  className="list-group-item">Create a user </li>
                        <li  className="list-group-item">Edit a user </li>
                        <li  className="list-group-item">Delete a user </li>
                </ul>
                <ul className="list-group"><b> 	4.	Customize list users</b>
                        <li  className="list-group-item">Paginate list user</li>
                        <li  className="list-group-item">Filter by id/email </li>
                        <li  className="list-group-item">Edit a user </li>
                        <li  className="list-group-item">Sort by first name </li>
                </ul>
                <ul className="list-group"><b> 	5.	Working with excel</b>
                        <li  className="list-group-item">Import excel (read file excel)</li>
                        <li  className="list-group-item">Export excel</li>
                </ul>
  </div>
  </div>
  </div>
)
}
export default Home;