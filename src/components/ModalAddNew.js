import {Modal, Button} from 'react-bootstrap';
import { useState } from 'react';
import {postCreateUser} from './Services/UserService';
import { toast } from 'react-toastify';

const ModalAddNew = (props)=>{
const {show,handleClose,handleUpdateTable} = props;
const [name,setName] =useState("");
const [job,setJob]   =useState("");
const handleSaveUser =async()=>{
  let res = await postCreateUser(name,job);
  if(res && res.id)
  {
    handleClose();
    setName('');
    setJob('');
    toast.success('Create new user sucessed');
    handleUpdateTable({first_name: name,id: res.id});
  }
  else
  {
     toast.error('An error!!');
  }
   // console.log(">>> check value name=",res);
}
    return(
    <>
    <Modal 
        show={show} 
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        >
        <Modal.Header closeButton>
        <Modal.Title>Add new user</Modal.Title>
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
          <Button variant="primary" onClick={()=>handleSaveUser()}>
            Save Changes
          </Button>
      </Modal.Footer>
      </Modal>
    </>
  );

}
export default ModalAddNew;