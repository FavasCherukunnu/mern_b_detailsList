import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { UpdatePage } from './page/UpdatePage';
import { backEndUrl } from './staticFiles';

export function ListItem(props) {

    const [data, setData] = useState([])
    const navigate = useNavigate();
    console.log('rebuilding listItem');    
    useEffect(
        ()=>{
            axios.get(backEndUrl).then(
                (res)=>{
                    setData(res.data);
                },
              )
        },[props.val]
    )

    function handleDelete(item){
        axios.delete(`${backEndUrl}/${item._id}`).then((res)=>{
            axios.get(backEndUrl).then(
                (res)=>{
                    setData(res.data);
                },
              )
        })
    }


    function createList(){

        var html ;
        if(data){
        html =  data.map(
            (item, index) => {
                return <div style={{minWidth:'200px',padding:'20px',borderStyle:'ridge',borderBottom:'1px'}}>
                    <label>{item.fullName}</label><br/>
                    <label>fatherName: {item.fatherName}</label><br/>

                    <button onClick={()=>navigate(`update/${item._id}`)}>update</button>
                    <button onClick={()=>{handleDelete(item);props.changeUi()}}>Delete</button>
                </div>;
            }
        )
        }

        return  html;
    }


  return (
    <div>
       {createList()}
    </div>
  )
}
