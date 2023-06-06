import { useEffect, useState } from "react";
import plane from '../img/plane.png'
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { Link } from 'react-router-dom';



const Header = ({iAuth, setIAuth, setModal, setRegModal, namesReg}) => {


  const openEnterModal = () =>{
    setModal(true)
    
  }

  const openRegModal = () =>{
    setRegModal(true)
    
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) =>{
      if (user) {
        setIAuth(true)
        console.log(user.uid)
      } else{
        setIAuth(false)
      }
    })
  }, [])
  
  


  const logOut = () =>{
    signOut(auth) 
    setIAuth(false)
}





  return (
    <div>
      <div className="header">
        <div className="logo">
          <img src={plane} alt="" />
          <h1>Yana.Flights</h1>
        </div>
        <div className="reg-ent">
          <button className={iAuth ? "close" : "enter-btn"} onClick={openEnterModal}>Войти</button>
          <button className={iAuth ? "close" : "reg-btn"} onClick={openRegModal}>Регистрация</button>

          <Link to="/Account" className={iAuth ? "userName" : "close"}>Личный кабинет</Link>
          <button className={iAuth ? "logOut" : "close"} onClick={logOut}>Выйти</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
