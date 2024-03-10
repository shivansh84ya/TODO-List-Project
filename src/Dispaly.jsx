import React, { useEffect } from "react";
import { useState } from "react";
import "./App.css"
import {
  addTask,
  deleteTask,
  CompleteTask,
  unCompleteTask,
  editData,
  MyEditSave
} from "./todoSlice";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch, useSelector } from "react-redux";

var editFlag = 0;

const Dispaly = () => {
  var sno = 0;
 

  const [val, setVal] = useState("");
  const [editBtnFlag, setEditBtnFlag]= useState(true);
  const [CompBtnFlag, setCompBtnFlag]= useState(true);
  const [tmpId, setTmpId]= useState("");
  
  const mydata = useSelector((state) => state.todo.task);
  const myeditData = useSelector((state) => state.todo.workdata);
  const MyDispach = useDispatch();


  console.log(myeditData);

  const myTaskAdd = () => {
    if (val.trim() !== "") { // Check if the input value is not empty after trimming whitespace
      MyDispach(addTask(val));
      setVal("");
      // toast.success("Task added"); 
      
    } else {
      // alert("Please enter a task."); // Display an alert if the input is empty
      toast.error("Enter a task!");
    }
  };
    
  const myTaskDelete = (myid) => {
    MyDispach(deleteTask(myid));
    toast.error("Task Deleted !");
    // alert("deleted")
  };

  const myTaskComplete = (myid) => {
    MyDispach(CompleteTask(myid));
    setCompBtnFlag(false)
    toast.success("Task Completed!");
  };
  
  const myTaskUncomplete = (myid) => {
    MyDispach(unCompleteTask(myid));
    setCompBtnFlag(true)
    
    toast.success("Task uncomplet!");
  };

  const myTaskEdit = (myid) => {
    MyDispach(editData(myid));
    editFlag++;
    setEditBtnFlag(false);
    setTmpId(myid);
    // toast.success("Task Edited !");

  };

 useEffect(()=>{

  setVal(myeditData);
 }, [editFlag]);


const editDataSave=()=>{
    
    MyDispach(MyEditSave({id:tmpId, myData: val  }))
    setEditBtnFlag(true);
   setVal("")
  
}


  const ans = mydata.map((key) => {
    sno++;
    return (
      <>
        <tr>
          <td>{sno}</td>
          <td>
            {key.status ? (
              key.work
            ) : (
              <span style={{ color: "red", textDecoration: "line-through" }}>
                {key.work}
              </span>
            )}
          </td>
          <td>
            <button className="button"
              onClick={() => {
                myTaskDelete(key.id);
              }}
            >
              Delete
            </button>
          </td>
          <td>
       
            {CompBtnFlag?   <button   className="button" onClick={() => {
                myTaskComplete(key.id);
              }}>COMPLETE</button> : 
               <button  className="button"  onClick={() => {
                myTaskUncomplete(key.id);
              }}>UNCOMPLETE</button> }
          </td>
          {/* <td>
            <button
              onClick={() => {
                myTaskUncomplete(key.id);
              }}
            >
              UnComplete
            </button>
          </td> */}
          <td>
            <button className="button"
              onClick={() => {
                myTaskEdit(key.id);
              }}
            >
              Edit
            </button>
            <ToastContainer />
          </td>
        </tr>
      </>
    );
  });

  return (
    <>
     <center><h1 style={{"fontSize":"40px",color:"#cf9b01"}}>TO-DO LIST</h1></center>
      Enter Task :{" "}
      <input
        type="text"
        placeholder="Enter task here..."
        name="task"
        value={val}
        onChange={(e) => {
          setVal(e.target.value);
        }}
      />
      
      {editBtnFlag?   <button onClick={myTaskAdd} className="button"> Add task</button> :  <button onClick={editDataSave} className="button"> Edit save</button> }

      <hr size="4" color="blue" />
      <table width="700" border="1" >
        <tr bgcolor="#ffc107">
          <th>SNO</th>
          <th>MY TASK</th>
          <th>DELETE</th>
          <th>{CompBtnFlag ? "COMPLETE" : "UNCOMPLETE" }</th>
          <th> EDIT </th>
        </tr>
        {ans}
      </table>
    </>
  );
};

export default Dispaly;
