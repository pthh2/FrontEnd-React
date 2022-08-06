import {Modal, Button} from 'react-bootstrap';
import { deleteUser } from './Services/UserService';
import {toast} from 'react-toastify';

const ModalConfirm = (props)=>{
const {show,handleClose,dataUserDelete,handleDeleteUserFromModal} = props;
const ConfirmDelete = async()=>{
    let res = await deleteUser(dataUserDelete.id);
    if(res && +res.statusCode === 204)
    {
        toast.success("Delete successful !!");
        handleClose();
        handleDeleteUserFromModal(dataUserDelete);
    }
    else{
        toast.error("Delete Error!!");
    }
    // console.log(">>>",res);
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
        <Modal.Title>Delete an user</Modal.Title>
        </Modal.Header>
        <Modal.Body className='body-add-new'>
                <b>Are you sure delete this user,</b>
                    <br/> email: {dataUserDelete.email}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>ConfirmDelete()}>
            Confirm
          </Button>
      </Modal.Footer>
      </Modal>
    </>
  );

}
export default ModalConfirm;