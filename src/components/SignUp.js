import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
const SignUp = (props) => {
  let Navigator = useNavigate();
  let onsubmit = async(e) => {
    e.preventDefault();
    if(/\d/.test(data.Name)){
      props.showAlert('danger', "Name shouldn't contains numers");
      return;
    }
    let host = 'http://localhost:5000';
    let {Name, Email, Password} = data;
    fetch(`${host}/api/auth/newuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({Name, Email, Password }),
    })
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        response.json().then((val)=>{
          props.showAlert('danger', val.errors[0].msg);
        })
      }
    })
    .then((response) => {
      if(response.success){
        localStorage.setItem("authToken", response.authToken);
        Navigator('/');
      }
      else{
        props.showAlert({type:'danger', msg:response.msg});
      }
    }).catch((error) => {
      // Handle the error
      props.showAlert({type:'danger', msg:"an unexpected error occurred"});
      setData({
        ...data, Password:'', reEnterPassword:''
      });
    });
  };

  const [data, setData] = useState({
    Email:'',
    Password:'',
    reEnterPassword:'',
    Name:''
  })
  let onchange = (event)=>{
    setData({...data, [event.target.name]:event.target.value})
  }
  return (
    <div style={{
      maxWidth:'44rem',
      margin:"auto"
    }}>
      <h1>Welcome</h1>
      <form onSubmit={onsubmit}>
        <div className="mb-3">
          <label htmlFor="Name" className="form-label">
            Enter Your Name:{" "}
          </label>
          <input type="text" name="Name" className="form-control" id="Name" value={data.Name} onChange={onchange} />
          {/\d/.test(data.Name) && <div className="text-danger">The Name Shouldn't contains numbers.</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address:{" "}
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="Email"
            onChange={onchange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Create a Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name='Password'
            value={data.Password}
            onChange={onchange}
          />
          {(data.Password.length<6 && data.Password.length !== 0) && <div className="text-danger">Password must be alteast 6 Characters long</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="reEnterPassword" className="form-label">
            Re-Enter the password
          </label>
          <input
            type="password"
            className="form-control"
            id="reEnterPassword"
            name="reEnterPassword"
            value={data.reEnterPassword}
            onChange={onchange}
          />
          {(data.Password !== data.reEnterPassword) && <div className="text-danger">The two fields doesn't match</div>}
        </div>

        <button disabled={(data.Password !== data.reEnterPassword)|| (data.Password.length<6) || (/\d/.test(data.Name))}type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUp;
