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
    } else {
      alert("Please enter a task."); // Display an alert if the input is empty
    }
  };
    
  const myTaskDelete = (myid) => {
    MyDispach(deleteTask(myid));
  };

  const myTaskComplete = (myid) => {
    MyDispach(CompleteTask(myid));
    setCompBtnFlag(false)
  };

  const myTaskUncomplete = (myid) => {
    MyDispach(unCompleteTask(myid));
    setCompBtnFlag(true)
  };

  const myTaskEdit = (myid) => {
    MyDispach(editData(myid));
    editFlag++;
    setEditBtnFlag(false);
    setTmpId(myid);

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
      <center><h1>TO-DO LIST</h1></center>
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
            <button
              onClick={() => {
                myTaskDelete(key.id);
              }}
            >
              Delete
            </button>
          </td>
          <td>
       
            {CompBtnFlag?   <button    onClick={() => {
                myTaskComplete(key.id);
              }}>COMPLETE</button> : 
               <button   onClick={() => {
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
            <button
              onClick={() => {
                myTaskEdit(key.id);
              }}
            >
              Edit
            </button>
          </td>
        </tr>
      </>
    );
  });

  return (
    <>
     <center><h1 style={{"fontSize":"20px"}}>TO-DO LIST</h1></center>
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
      
      {editBtnFlag?   <button onClick={myTaskAdd}>Add task</button> :  <button onClick={editDataSave}> Edit save</button> }
     
    


      <hr size="4" color="blue" />
      <table width="700" border="1" bgcolor="pink">
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
