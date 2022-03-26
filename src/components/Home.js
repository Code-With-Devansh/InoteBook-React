import React, {useEffect} from "react";
import Notes from "./Notes";
import { useNavigate } from "react-router-dom";
const Home = (props) => {
  let Navigator = useNavigate();
  
  useEffect(() => {
    if(localStorage.getItem('authToken') === null){
      Navigator('/login');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <div>
      <Notes showAlert={props.showAlert}/>
    </div>
  );
};

export default Home;
