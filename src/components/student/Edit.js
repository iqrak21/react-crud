import React from 'react'
import {Typography,Box,makeStyles,Grid,
TextField,Button} from "@material-ui/core";
import {deepPurple,green} from "@material-ui/core/colors";
import {useState,useEffect} from "react";
import { useParams,useHistory } from 'react-router-dom';
import axios from 'axios';

const useStyles=makeStyles({
    headingColor:{
        backgroundColor:deepPurple[400],
        color:"white"
    },
    addStuColor:{
        backgroundColor:green[400],
        color:"white"
    }
   
})

export const Edit = () => {
    const classes=useStyles();
    const {id}=useParams();
    const histroy=useHistory();
    const [student,setStudent] = useState({
        stuname:"",
        email:""
    });
    useEffect(()=>{
        async function getStudent(){
            try{
           const student=await axios.get(`http://localhost:3000/students/${id}`)
         //   console.log(students.data);
            setStudent(student.data);
            }catch(error){
           console.log("something went wrong")
            }
        }
        getStudent();
    },[id])

    function onTextFieldChange(e) {
        setStudent({
            ...student,
            [e.target.name]:e.target.value
            
        });
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        try{
            await axios.put(`http://localhost:3000/students/${id}` , student)
            histroy.push("/")
             }catch(error){
            console.log("something went wrong")
             }
    }
  

    function handleClick() {
        histroy.push("/")
    }

    return (
        <>
        <Box textAlign="center" className={classes.headingColor} p={2} mb={2}>
     <Typography variant="h2">React CRUD with API Call</Typography>
 </Box>

<Grid container justify="center" spacing={4}>
    <Grid item md={6} xs={12}>
       <Box textAlign="center" p={2} className={classes.addStuColor} mb={2}>
           <Typography variant="h4">Edit Students</Typography>
       </Box>
       <form noValidate>
           <Grid container spacing={2}>
     <Grid item xs={12} >
        <TextField autoComplete="id" name="id" value={id} variant="outlined" required fullWidth id="id" label="ID" autoFocus disabled/>
</Grid>        
<Grid item xs={12} >
        <TextField autoComplete="stuname" name="stuname" value={student.stuname} variant="outlined" required fullWidth id="stuname"
        onChange={e=>onTextFieldChange(e)} label="Name" autoFocus/>
</Grid>
<Grid item xs={12} >
        <TextField autoComplete="email" name="email"value={student.email} variant="outlined" required fullWidth id="email"
        onChange={e=>onTextFieldChange(e)} label="Email Address" autoFocus/>
</Grid>
           </Grid>
           <Box m={3}>
               <Button type="button" variant="contained" color="primary" fullWidth onClick={e =>onFormSubmit(e)}>Update</Button>
           </Box>

       </form>
       <Box m={3} textAlign="center">
               <Button type="button" variant="contained" color="primary" onClick={handleClick} >BACK TO HOME</Button>
           </Box>
    </Grid>
  

</Grid>
        </>
    )
}
