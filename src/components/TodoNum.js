
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Button, Card, Container } from 'react-bootstrap'

function TodoNum(){
    const [nums, setNums] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5984/to-do-list/_design/allTodos/_view/noTodos", {
           auth: {
             username: 'admin',
             password: 'admin'
           }
         }).then((result)=>{
           setNums(result.data.rows)
          console.log(result.data.rows)
          console.log(nums[0])

         });
   }, []);

 function GetNum(){
    useEffect(() => {
        axios.get("http://localhost:5984/to-do-list/_design/allTodos/_view/noTodos", {
           auth: {
             username: 'admin',
             password: 'admin'
           }
         }).then((result)=>{
           setNums(result.data.rows)
          console.log(result.data.rows)
          console.log(nums[0])

         });
   }, []);
 }

//  {nums.map((num) => (
//     <h3>You have tasks <Button onClick={GetNum()}>Check</Button></h3>
// { nums && nums[0].value}
// ))}

 return (
    <div>
        <h3>You have {nums[0] ? nums[0].value : '0'} tasks <Button onClick={GetNum()}>Check</Button></h3>
    </div>
 )

}
export default TodoNum;