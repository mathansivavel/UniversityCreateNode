import React ,{useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditDeleteForm from './EditDeleteForm';
import AddForm from './AddForm';
import Banner from './Banner';

export default function EditModal(props) {
    const [editUniversity, setEditUniversity] = React.useState('');
    const [newUnivName, setNewUnivName] =  React.useState("");
    const [addName, setAddName] =  React.useState("");
    const [country, setCountry] =  React.useState("");
    const [domain, setDomain] =  React.useState("");
    const [web, setWeb] =  React.useState("");
    const [code, setCode] =  React.useState("");
    const [description, setDescription] =  React.useState("");
    const [banners, setBanners] = useState(false);

    const handleChange = (event) => {
      console.log("event.target.value", event.target.value)
      setEditUniversity(event.target.value);
      console.log("editUniversity", editUniversity );
    };
    
    const handleTextChange =(event) => {
      var newVal = event.target.value;
      console.log("sd",newVal);
      setNewUnivName(newVal);
      console.log("newName",newUnivName);
    };
    function handleNameChange(e){
      setAddName(e.target.value);
  }
  function handleCountryChange(e){
      setCountry(e.target.value);
  }
  function handleDomainChange(e){
      setDomain(e.target.value);
  }
  function handleWebChange(e){
      setWeb(e.target.value);
  }
  function handleCodeChange(e){
      setCode(e.target.value);
  }
  function handleDescriptionChange(e){
      setDescription(e.target.value);
  }
  function handleEdit(){
  
   if( props.crudActions === "Edit" ){
    if (editUniversity === "" || newUnivName === "" ){
      setBanners(true);
    }
    else{
      props.handleEdit(editUniversity, newUnivName);
    }
    
   }
   else if (props.crudActions === "Delete" ){
    if (editUniversity === ""){
      setBanners(true);
    }
    else{
    props.handleDelete(editUniversity);
    }
   }
   else if (props.crudActions === "Add" ){
      var formData = {
          name : addName,
          country: country,
          domain: domain,
          web_page : web,
        alpha_two_code : code,
      descrip: description  };
        console.log("formData", formData);
        if ( addName === "" || country === "" || domain === "" || web === "" || code === "" || description === "" ){
          setBanners(true);
        }
        else{
        props.handleAdd(formData);
        }
   }

  } 
  function handleCloseBanner(event, reason) {
    if (reason === 'clickaway') {
        return;
    }

    setBanners(false);
}

  return (
    <div>
      <Dialog onClose={props.handleClose} open={props.open}  aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" onClose={props.handleClose}>{props.crudActions} University</DialogTitle>
        <DialogContent>
          {props.crudActions === "Edit" || props.crudActions === "Delete"  ? 
          <EditDeleteForm handleTextChange={handleTextChange}  handleChange={handleChange} editUniversity={editUniversity} crudActions = {props.crudActions}/>
          : <AddForm           handleNameChange={handleNameChange}  
          handleCountryChange={handleCountryChange} 
          handleDomainChange={handleDomainChange}
          handleWebChange={handleWebChange}
          handleCodeChange={handleCodeChange}
          handleDescriptionChange={handleDescriptionChange}
           crudActions = {props.crudActions}/> }
        </DialogContent>
        <DialogActions>
        <Button onClick={handleEdit} color="primary">
          Save changes
        </Button>
        </DialogActions>
        { banners ? <Banner open={banners} handleCloseBanner={handleCloseBanner}
                    bannersValue={"Please Enter All Mandatory Feilds"} bannerType={"error"} />  : null };
      </Dialog>
    </div>
  )}