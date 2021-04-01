import React from "react";
import DoneIcon from '@material-ui/icons/Done';
import {MenuList,Paper,ClickAwayListener,MenuItem, IconButton, makeStyles} from  '@material-ui/core';
import { green } from '@material-ui/core/colors';


const useStyles = makeStyles((theme)=>({
    btnEdit:{
        padding: "0"
    }
}))

const Dropdown = (props) => {
       const classes = useStyles();
    function handleChange(e){
        console.log("sds",e.target);
        props.onCountryChange((e.target.innerText).toString().trim());
       } 
    var icon = null;
    console.log("daata",props.data);
    const dropdownData = props.data.map( dropdown => {
        icon = null;
            props.selectedData.map(selectedData => {
                console.log("selectedData",selectedData);
                if(dropdown === selectedData){
                    console.log("If condition ");
                    icon = (<IconButton disabled classes={{root:classes.btnEdit}}><DoneIcon style={{ color: green[500] }} /></IconButton>);
                }
               
            } )    

        // return  <MDBDropdownItem className="mr-20" size="sm" onClick={handleChange} >{dropdown}  
        // { icon }</MDBDropdownItem>

        return (<MenuItem  onClick={handleChange}> {dropdown}
                   {icon}
                </MenuItem>);

    });

    

  return (
//     <MDBDropdown className=" w-20">
//     <MDBDropdownToggle size="sm" gradient="aqua" className="mr-auto w-20" rounded >
//      Country Filter
//     </MDBDropdownToggle>
//     <MDBDropdownMenu  basic>
//      {dropdownData}
//     </MDBDropdownMenu>
//   </MDBDropdown>
<Paper>
<ClickAwayListener onClickAway={props.handleFilterClose}>
<MenuList autoFocusItem={props.open} id="menu-list-grow" onKeyDown={props.handleListKeyDown}>
    {dropdownData} </MenuList>
        
    </ClickAwayListener>
              </Paper>

)};

export default Dropdown;