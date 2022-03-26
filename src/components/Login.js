import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
const Login = (props) => {
  let Navigator = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [alert, setAlert] = useState({})
  let handleOnChange = (event) => {
    switch (event.target.name) {
      case "Email":
        setEmail(event.target.value);
        break;
      case "Password":
        setPassword(event.target.value);
        break;

      default:
        break;
    }
  };
  let handleSubmit = async (e) => {
    let host = "http://localhost:5000";
    fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Email, Password }),
    })
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        setAlert({type:'danger', msg:'Incorrect Email or Password'});
      }
    })
    .then((response) => {
      if(response.success){
        localStorage.setItem("authToken", response.authToken);
        Navigator('/');
      }
      else{
        setAlert({type:'danger', msg:response.msg});
      }
    }).catch((error) => {
      // Handle the error
      setAlert({type:'danger', msg:'Incorrect Email or Password'});
      setPassword('');
    });
    // let token = await response.json();
    // console.log(token);
  };
useEffect(() => {
  let {type, msg} = alert;
  props.showAlert(type, msg);
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [alert])

  return (
    <div
      style={{
        maxWidth: "44rem",
        margin: "auto",
      }}
    >
      <h1>Welcome Back</h1>
      <div className="container">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            value={Email}
            onChange={handleOnChange}
            name="Email"
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            value={Password}
            onChange={handleOnChange}
            name="Password"
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          Submit
        </button>
      </div>
      <h4 className="text-center">
        Are you a new User?{" "}
        <Link className="text-success" to="/signup">
          SignUp
        </Link>
      </h4>
    </div>
  );
};

export default Login;
