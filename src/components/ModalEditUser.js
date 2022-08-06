import {Modal, Button} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import {putupdateUser} from './Services/UserService';
//import {postCreateUser} from '../components/Services/UserService';
import { toast } from 'react-toastify';

const ModalEditUser = (props)=>{
const {show,handleClose,dataUserEdit,handleEditUserFromModel} = props;
const [name,setName] =useState("");
const [job,setJob]   =useState("");


const handleEditUser = async ()=>{
    let res = await putupdateUser(name,job);
    if(res && res.updatedAt){
      handleEditUserFromModel({
        first_name :name,
        id: dataUserEdit.id
    })
    handleClose();
    toast.success('Update the user success!!');
    }
    //console.log(">>> data putupdateUser: ",res);
}

useEffect(()=>{
    if(show){
        setName(dataUserEdit.first_name);
    }

},[dataUserEdit]) // eslint-disable-line react-hooks/exhaustive-deps
//console.log('>>> data from tableUsers: ',dataUserEdit);
    return(
    <>
        <Modal 
          show={show} 
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          >
        <Modal.Header closeButton>
        <Modal.Title>Edit an user</Modal.Title>
        </Modal.Header>
        <Modal.Body className='body-add-new'>
        <form>
            <div className="form-group">
                <label >Name</label>
                <input 
                    type="text" 
                    className="form-control" 
                    value={name}
                    onChange = {(event)=> setName(event.target.value)}
                    />   
            </div>
            <div className="form-group">
                <label >Job</label>
                <input 
                    type="text" 
                    className="form-control" 
                    value={job}
                    onChange = {(event)=> setJob(event.target.value)}
                    />
            </div>
        </form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>handleEditUser()}>
            Confirm
          </Button>
      </Modal.Footer>
      </Modal>
    </>
  );

}
export default ModalEditUser;