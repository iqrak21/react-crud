import React from 'react'
import {Typography,Box,makeStyles,Grid,TableContainer,Table,TableBody,TableCell,TableHead,TableRow,Button,IconButton,Tooltip,
} from "@material-ui/core";
import {deepPurple,green,orange} from "@material-ui/core/colors";
import {Link} from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import { useState,useEffect } from 'react';


const useStyles=makeStyles({

    addlistColor:{
        backgroundColor:orange[400],
        color:"white"
    },
    tableHeadCell:{
        color:"white",
        fontWeight:"bold",
        fontSize:16
    }
})

const List = () => {
    const classes=useStyles();
    const [students,setStudents]=useState([]);

    useEffect(()=>{
        async function getAllStudent(){
            try{
           const students=await axios.get("http://localhost:3000/students")
         //   console.log(students.data);
            setStudents(students.data);
            }catch(error){
           console.log("something went wrong")
            }
        }
        getAllStudent();
    },[])

   const handleDelete = async id =>{
       await axios.delete(`http://localhost:3000/students/${id}`);
       var newstudent= students.filter((item)=>{
           return item.id !== id;
       })
       setStudents(newstudent);
   }

    return (
        <>
          <Box textAlign="center" p={2} className={classes.addlistColor} mb={2}>
           <Typography variant="h4">Students List</Typography>
       </Box>

       <TableContainer >
           <Table>
               <TableHead>
                   <TableRow style={{backgroundColor:"#616161"}}>
                       <TableCell align="center" className={classes.tableHeadCell}>No</TableCell>
                       <TableCell align="center"  className={classes.tableHeadCell} >Name</TableCell>
                       <TableCell align="center"  className={classes.tableHeadCell}>Email</TableCell>
                       <TableCell align="center"  className={classes.tableHeadCell}>Action</TableCell>
                   </TableRow>
               </TableHead>
               <TableBody>
                   {
                       students.map((student, i)=>{
                           return (
                            <TableRow key={i}>
                            <TableCell align="center">{i+1}</TableCell>
                            <TableCell align="center">{student.stuname}</TableCell>
                            <TableCell align="center">{student.email}</TableCell>
                            <TableCell align="center">
                                <Tooltip title="view">
                                  <IconButton><Link to={`/view/${student.id}`}><VisibilityIcon color="primary"/></Link></IconButton>
                                </Tooltip>
                                <Tooltip title="Edit">
                                  <IconButton><Link to={`/edit/${student.id}`}><EditIcon/></Link></IconButton>
                                </Tooltip>
                                <Tooltip title="Delete">
                                  <IconButton onClick={()=>handleDelete(student.id)}><DeleteIcon color="secondary"/></IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                           )
                       })
                   }
                  
               </TableBody>
           </Table>
       </TableContainer>  
       
        </>
    )
}

export default List
