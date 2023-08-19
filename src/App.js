import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';
import { ListItem } from './component';

function App() {

  const [formData, setFormData] = useState({ fullName: '', fatherName: '', age: '' });
  const [togglesubmit, setToggleSubmit] = useState(false)
  const [err,setErr] = useState(null);

  const onClickHandler = async (e) => {
    e.preventDefault();
    // axios.get('http://localhost:3002/add').then((res)=>{console.log(res);})
    try {
      const res = await axios({ url: 'http://localhost:3002/add', method: 'POST', data: formData });
      setFormData({ fullName: '', fatherName: '', age: '' })
      setToggleSubmit(!togglesubmit)
    } catch (err) {
      console.log(err);
      if(err.response?.data.msg){
        setErr(err.response.data.msg);
      }else{
        setErr('something went wrong')
      }
    }
  }

  const onChangeInput = (e) => {
    formData[e.target.name] = e.target.value;
    setFormData({ ...formData });
  }
  return (
    <div style={{ "display": "flex", "height": "100vh", "width": "100%", "alignItems": "center", "justifyContent": "center", flexDirection: 'column', }}>
      <div style={{ "width": "500px", "borderStyle": "ridge", "padding": "10px" }}>
        <form method="post" >
          <label for="">Full name</label><br />
          <input type="text" name="fullName" onChange={onChangeInput} value={formData.fullName} /><br />
          <br />
          <label for="">Age</label><br />
          <input type="text" name="age" onChange={onChangeInput} value={formData.age} /><br />
          <br />
          <label for="">Father Name</label>
          <br />
          <input type="text" name="fatherName" onChange={onChangeInput} value={formData.fatherName} /><br /><br /><br />
          <input type="submit" onClick={onClickHandler} />
        </form>
        {err!==null?<h3 style={{color:'red'}}>
          {err}
          </h3>:null}
      </div>
      <div style={{ marginTop: '50px', borderStyle: 'ridge', overflowY: 'auto' }}>
        <ListItem val={togglesubmit} changeUi={() => { setToggleSubmit(!togglesubmit) }} />
      </div>
    </div>
  );
}

export default App;
