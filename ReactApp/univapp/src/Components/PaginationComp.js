import React from "react";
import {PaginationItem}  from '@material-ui/lab';


const PaginationComp = (props) => {
   function handleChange(e){
    props.onChange(parseInt(e.target.innerText));
   } 
  return (
      <div style={{margin:"0px 5px", display:"inline-block"}}>
      <PaginationItem page={props.number} variant="outlined" color="primary" onClick={handleChange}/>
      </div>
      )
}

export default PaginationComp;
