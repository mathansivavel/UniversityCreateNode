import React, {  useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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
  
   
export default function EditDeleteForm(props){
    const classes = useStyles();
    const [univName, setUnivName] = React.useState([]);

    useEffect(() => {
      fetch("http://127.0.0.1:5000/editDropdown")
          .then(res => res.json())
          .then((res) => {
            setUnivName(res);
          });

  }, []);


    const menuItem = univName.map( univ => {
      return ( <MenuItem value={univ}> {univ}</MenuItem>);
    })
   

   return( <div> <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-helper-label">Select University</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={props.editUniversity}
          onChange={props.handleChange}
        >
         {menuItem}
        </Select>
        <FormHelperText>Select the university which u want to { props.crudActions}</FormHelperText>
      </FormControl> 
      { props.crudActions === "Edit"  ?
       ( <div>
       <Typography variant="h6">Enter University Name</Typography>
       <FormControl className={classes.formControl}>
       <InputLabel id="demo-simple-select-helper-label"></InputLabel>
       <TextField
         id="filled-textarea"
         placeholder="Placeholder"
         variant="filled"
         onChange={props.handleTextChange}
       />  </FormControl> </div>
       ) 
        : null
      }
      </div>
      );
}