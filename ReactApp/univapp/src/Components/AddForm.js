import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      width:400,
    
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  
   
export default function AddForm(props){
    const classes = useStyles();

   return( <div> 
       <Typography variant="h6">Enter University Name</Typography>
       <FormControl className={classes.formControl}>
       <InputLabel id="demo-simple-select-helper-label"></InputLabel>
       <TextField
         id="filled-textarea"
         placeholder="University Name"
         variant="filled"
         onChange={props.handleNameChange}
       />  </FormControl>
       <Typography variant="h6">Enter Country</Typography>
       <FormControl className={classes.formControl}>
       <InputLabel id="demo-simple-select-helper-label"></InputLabel>
       <TextField
         id="filled-textarea"
         placeholder="Country"
         variant="filled"
         onChange={props.handleCountryChange}
       />  </FormControl>
       <Typography variant="h6">Enter Domain</Typography>
       <FormControl className={classes.formControl}>
       <InputLabel id="demo-simple-select-helper-label"></InputLabel>
       <TextField
         id="filled-textarea"
         placeholder="Domain"
         variant="filled"
         onChange={props.handleDomainChange}
       />  </FormControl>
       <Typography variant="h6">Enter WebPage</Typography>
       <FormControl className={classes.formControl}>
       <InputLabel id="demo-simple-select-helper-label"></InputLabel>
       <TextField
         id="filled-textarea"
         placeholder="WebPage"
         variant="filled"
         onChange={props.handleWebChange}
       />  </FormControl>
       <Typography variant="h6">Enter Country Code</Typography>
       <FormControl className={classes.formControl}>
       <InputLabel id="demo-simple-select-helper-label"></InputLabel>
       <TextField
         id="filled-textarea"
         placeholder="Country Code"
         variant="filled"
         onChange={props.handleCodeChange}
       />  
       </FormControl>
       <Typography variant="h6">Enter Description</Typography>
       <FormControl className={classes.formControl}>
       <InputLabel id="demo-simple-select-helper-label"></InputLabel>
       <TextField
         id="filled-textarea"
         placeholder="Description"
         variant="filled"
         onChange={props.handleDescriptionChange}
       />  
       </FormControl>
       </div>
      );
}