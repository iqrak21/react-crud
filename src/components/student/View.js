import React from 'react';
import {Typography,Box,makeStyles,Grid,TableContainer,Table,TableBody,TableCell,Button,TableHead,TableRow,IconButton,Tooltip,
} from "@material-ui/core";
import {orange} from "@material-ui/core/colors";
import { useParams,useHistory } from 'react-router-dom';
import {useState,useEffect,} from 'react' ;
import axios from "axios";



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


export const View = () => {
    const classes=useStyles();
    const {id} =useParams();
    const[student, setStudents]=useState([]);
    const histroy=useHistory();

    useEffect(()=>{
        async function getStudent(){
            try{
           const students=await axios.get(`http://localhost:3000/students/${id}`)
         //   console.log(students.data);
            setStudents(students.data);
            }catch(error){
           console.log("something went wrong")
            }
        }
        getStudent();
    },[id])

   

function handleClick() {
    histroy.push("/")
}

    return (
        <>
            <Box textAlign="center" p={2} className={classes.addlistColor} >
           <Typography variant="h4">Students Details</Typography>
       </Box>
      <TableContainer>
          <Table>
          <TableHead>
                   <TableRow style={{backgroundColor:"#616161"}}>
                       <TableCell align="center" className={classes.tableHeadCell}></TableCell>
                       <TableCell align="center"  className={classes.tableHeadCell} >Name</TableCell>
                       <TableCell align="center"  className={classes.tableHeadCell}>Email</TableCell>
                      
                   </TableRow>
               </TableHead>
               <TableBody>
                 
<TableRow>
                   <TableCell align="center">{student.id}</TableCell>
                       <TableCell align="center">{student.stuname}</TableCell>
                       <TableCell align="center">{student.email}</TableCell>
                   </TableRow>
                   
              
                   
               </TableBody>
          </Table>
      </TableContainer>
      <Box m={3} textAlign="center">
               <Button type="submit" variant="contained" color="primary" onClick={handleClick} >BACK TO HOME</Button>
           </Box>
        </>
    )
}
