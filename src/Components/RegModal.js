import React, { useState } from 'react';
import beach from '../img/beach.webp'
import { createUserWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from '../firebase';
import { useSpring, animated } from 'react-spring';
import { CSSTransition } from 'react-transition-group';



const RegModal = ({regModal, setRegModal, setModal, setNamesReg}) => {
    
const [emailReg, setEmailReg] = useState();
const [passReg, setPassReg] = useState();


    const register = async (user) => {
        try{
                const regUser = await createUserWithEmailAndPassword(auth, emailReg, passReg);
                console.log(regUser)
                setRegModal(false)
            }
        catch (error) {
            console.log(error.message)
        }
    }

    const spring = useSpring({
        from: {opacity: 0},
        to: { opacity: 1 },
      })
    

  


    const openEnterModal = () =>{
        setModal(true)
        setRegModal(false)
    }

    return (
        <div>
            <div className= {regModal ? "modal-bg-reg" : "close"} onClick={() =>setRegModal(false)}>
            <CSSTransition in={regModal} classNames='alert' timeout={400} unmountOnExit>



        <div className='modal' onClick={e => e.stopPropagation() }>
          <div className='modal-forms-reg'>

            <h1>Зарегистрируйтесь и получайте доступ к билетам в любое время</h1>

            <div className='reg-inputs'>
            {/* <div>
            <label>Имя и фамилия</label>
            <input type="text" placeholder='Иванов Иван' onChange={e => setNamesReg(e.target.value)} required/>
          </div> */}

            <div>
                <label>Почта</label>
                <input type="text" placeholder='E-mail' required onChange={e => setEmailReg(e.target.value)}/>
            </div>

            <div>
                <label>Пароль</label>
                <input type="password" placeholder='Пароль' required onChange={e => setPassReg(e.target.value)}/>
            </div>


                <button className='modal-reg-main-btn' onClick={register}>Зарегистрироваться</button>
                <p>Уже есть аккаунт? <b onClick={openEnterModal}>Войти</b></p>
                </div> 
            </div>
            <div className='modal-img'>
                <img src={beach} alt="" />
                
            </div>
        </div>
        </CSSTransition>
      </div>
        </div>
    );
};

export default RegModal;