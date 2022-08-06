/**********************************************
* Description: This function, TableUsers,  get data from API by getUsers through function fetchAllUser
* data is displayed list of people with  their emails and names
*
**********************************************/
import { useState,useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import {fetchAllUser} from '../components/Services/UserService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';
import ModalConfirm from './ModalConfirm';
import  './TableUsers.scss';
import _ from 'lodash';
import { debounce } from 'lodash';
import { CSVLink, CSVDownload } from "react-csv";
import Papa from "papaparse";
import { toast } from 'react-toastify';

const TableUsers =(props)=>{
    const [listUsers,setListUsers]= useState([]);
    //const [totalUsers,setTotalUsers]=useState(0);//working on paginate
    const [totalPages,setTotalPages]=useState(0);
    const [isShowModalAddNew,setisShowModalAddNew]=useState(false);
    const [isShowModalEditUser,setisShowModalEditUser]=useState(false);
    const [dataUserEdit,setdataUserEdit]=useState({});
    const [isShowModalDelete,setisShowModalDelete]=useState(false);
    const [dataUserDelete,setdataUserDelete]=useState({});
    const [sortBy, setsortBy] = useState("asc");
    const [sortField,setsortField] =useState("id");
    const [keyword,setkeyword] = useState("");
    const [dataExport,setdataExport] = useState([]);

    const handleClose =()=>{
         setisShowModalAddNew(false);
         setisShowModalEditUser(false);
         setisShowModalDelete(false);
    }

    const handleUpdateTable=(user)=>{
        setListUsers([user, ...listUsers])
    }
    useEffect(() => {
        //call api
        getUsers(1);// 1 is to get items of first page
          }, []);

    const getUsers=async(page)=>{
        let res = await fetchAllUser(page);
        if(res && res.data)
        {
            //console.log(res);
            setListUsers(res.data);
            setTotalPages(res.total_pages);
        }
        //console.log(">>>check data gotten from API",res);
    };

    const handlePageClick =(event)=>{
        getUsers(+event.selected +1);
     } 
     const handleEditUser = (user)=>{
        console.log(user);
        setdataUserEdit(user);
        setisShowModalEditUser(true);
     }

     const handleDeleteUser=(user)=>{
        setisShowModalDelete(true);
        setdataUserDelete(user);
        // console.log("user delete data: ", user);

     }
     //update data for parent
     const handleEditUserFromModel=(user)=>{
        let cloneListUser = _.cloneDeep(listUsers);
        let index = listUsers.findIndex(item=>item.id===user.id);
        cloneListUser[index].first_name=user.first_name;
        setListUsers(cloneListUser);
       
    }
    const handleDeleteUserFromModal=(user)=>{
        let cloneListUser = _.cloneDeep(listUsers);
        cloneListUser = cloneListUser.filter(item=>item.id!==user.id)
        setListUsers(cloneListUser);  
    }

    const handleSort=(sortBy,sortField)=>{
        setsortBy(sortBy);
        setsortField(sortField);
        let cloneListUser = _.cloneDeep(listUsers);
        cloneListUser= _.orderBy(cloneListUser, [sortField], [sortBy]);
        setListUsers(cloneListUser);  
        //console.log(">>>check sort",cloneListUser);
    }
    
    const handleSearch=debounce((event)=>{
        let term = event.target.value;
        if(term){
            let cloneListUser = _.cloneDeep(listUsers);
            cloneListUser= cloneListUser.filter(item=>item.email.includes(term));
            setListUsers(cloneListUser);  
        }
        else{
            getUsers(1);
        }
    } ,200); 

      const getUsersExport = (event,done)=>{
        let result = [];
        if(listUsers && listUsers.length>0)
        {
            result.push(["Id","Email","First name","Last name"])
            listUsers.map((item,index)=>{
                let arr=[];
                arr[0] = item.id;
                arr[1] = item.email;
                arr[2] = item.first_name;
                arr[3] = item.last_name;
                result.push(arr);
            })
            setdataExport(result);
            done();
        }
      }
      const handleImportCSV=(event )=>{
        if(event.target && event.target.files && event.target.files[0])
        {
            let file = event.target.files[0];
            //console.log("checking type...",file);
            if(file.type !== "text/csv")
            {
                toast.error("Accept only csv file");
                return;
            }
            Papa.parse(file, {
            complete: function(results) {
                let rawCSV = results.data;
                if(rawCSV.length>0){
                    if(rawCSV[0] && rawCSV[0].length === 3){
                     if(rawCSV[0][0] !== "email"
                       || rawCSV[0][1] !== "first_name"
                       || rawCSV[0][2] !== "last_name"
                     ){
                        toast.error("Wrong format header!!")
                     }
                     else
                     {
                        let result =[];
                        //console.log(rawCSV);
                        rawCSV.map((item,index)=>{
                            if(index>0 && item.length ===3){
                                let obj ={};
                                obj.email = item[0]
                                obj.first_name = item[1]
                                obj.last_name = item[2]
                                result.push(obj);
                            }

                        })
                        setListUsers(result);
                        console.log(">>> check result", result)
                     }
                    }
                    else{
                        toast.error("Wrong format!!");
                    }
                }
                else
                toast.error("Not found csv file")
            }
            });
           
        }
    
      }
        return(
        <>
            <div className="my-3 add-new d-sm-flex">
               <span><b>List Users</b></span>
                 <div className="group-btns mt-sm-0 mt-2">
                   <button className="btn btn-primary" onClick = {()=>setisShowModalAddNew(true)}>
                     <i className="fa-solid fa-circle-plus"></i> Add new 
                   </button>
            <label htmlFor="test" className="btn btn-warning"><i className="fa-solid fa-file-import"></i> Import</label>
            
            <input 
                id="test" 
                type="file" hidden 
                onChange={(event)=>handleImportCSV(event)}
                />
            <CSVLink 
                    data={dataExport}
                    asyncOnClick={true}
                    onClick={getUsersExport} 
                    // hay viet vay deu giong nhau onClick= (event,done)=>getUsersExport(event,done)
                    filename={"users.csv"}
                    className="btn btn-secondary"
                >
                <i className="fa-solid fa-download"></i>Export 
            </CSVLink> 
            </div>
            </div> 
            <div className="col-12 col-sm-4 my-3">
                <input 
                className="form-control" 
                placeholder="Search by Email? Fill keyword here..."
                onChange={(event)=>handleSearch(event)}
                />
            </div>
            <div className="customize-table" >
            <Table striped bordered hover>
            <thead>
                <tr>
                <th >
                    <div className="sort-header">
                    
                        <span>ID</span>
                        <span>
                            <i 

                            onClick={()=>handleSort("desc","id")}
                            className="fa-solid fa-arrow-down-long"></i>
                            <i 
                            onClick={()=>handleSort("asc","id")}
                            className="fa-solid fa-arrow-up-long"></i>
                        </span>
                    
                    </div>
                </th>
                <th>EMAIL</th>
                <th>
                    <div  className="sort-header">
                        <span>FIRSTNAME</span>
                        <span>
                            <i 
                            onClick={()=>handleSort("desc","first_name")}
                            className="fa-solid fa-arrow-down-long"></i>
                            <i 
                            onClick={()=>handleSort("asc","first_name")}
                            className="fa-solid fa-arrow-up-long"></i>
                        </span>
                    </div>
                </th>
                <th>LASTNAME</th>
                <th>ACTIONS</th>
                </tr>
            </thead>
            <tbody>
               
                {listUsers && listUsers.length> 0 && 
                listUsers.map((item, index)=>{
                    return(
                       
                <tr key={`users-${index}`}>
                    <td>{item.id}</td>
                    <td>{item.email}</td>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>
                        <button className="btn btn-warning" onClick={()=>handleEditUser(item)}>Edit</button>
                        <button className="btn btn-danger"
                           onClick={()=>handleDeleteUser(item)}
                        >Delete</button>
                    </td>
                </tr>
                    )
                })
                }
            </tbody>
            </Table>
            </div>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel ="< previous"

                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                />
            <ModalAddNew 
                show={isShowModalAddNew} 
                handleClose={handleClose}

                // truyen sang ModalAddNew
                handleUpdateTable={handleUpdateTable}
            />
            <ModalEditUser 

            // truyen props
                 show={isShowModalEditUser}
                 dataUserEdit={dataUserEdit}
                 handleClose={handleClose}
                 handleUpdateTable={handleUpdateTable}
                 //truyen sang con de update listUsers
                 handleEditUserFromModel={handleEditUserFromModel}
            />
            <ModalConfirm
                show={isShowModalDelete}
                handleClose={handleClose}
                dataUserDelete={dataUserDelete}
                handleDeleteUserFromModal={handleDeleteUserFromModal}
                
            />
        </>
)
}

// console.log = console.warn = console.error = () => {};

// // Look ma, no error!
// console.error('Something bad happened.');
export default TableUsers;