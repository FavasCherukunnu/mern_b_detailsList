import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export function UpdatePage() {
    const [formData,setFormData] = useState({_id:'',fullName:'',fatherName:''});
    const {id} = useParams();
    const navigate = useNavigate();
    useEffect(
        ()=>{
            axios.get(`http://localhost:3002/${id}`).then(
                (res)=>{
                    console.log('rebuilding');
                    setFormData(res.data);
                }
            )
        }
        ,[]
    )
  const onClickHandler = (e)=>{
    e.preventDefault();
    console.log(`http://localhost:3002/${formData._id}`);
    axios.put(`http://localhost:3002/${formData._id}`,formData).then((res)=>{
      console.log(res);
      navigate('/');
    })
    // axios({url:'http://localhost:3002/',method:'POST',data:formData}).then((res)=>{
    //   console.log(res);
    // });
  }

  const onChangeInput = (e)=>{
    formData[e.target.name]= e.target.value;
    setFormData({...formData});
  }
  return (
    <div style={{ "width": "500px", "borderStyle": "ridge", "padding": "10px"}}>
        <form method="post" >
          <label for="">Full name</label><br />
          <input type="text" name="fullName" onChange={onChangeInput} value={formData.fullName}/><br />
          <br />
          <label for="">Father Name</label>
          <br />
          <input type="text" name="fatherName" onChange={onChangeInput} value={formData.fatherName} /><br /><br /><br />
          <input type="submit" onClick={onClickHandler}/>
        </form>
      </div>
  )
}
