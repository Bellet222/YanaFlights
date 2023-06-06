import React, { useState } from 'react';
import beach from '../img/beach.webp'
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from '../firebase';
import { CSSTransition } from 'react-transition-group';



const EnterModal = ({modal, setModal, setRegModal}) => {

    const [email, setEmail] = useState();
    const [passw, setPassw] = useState();
    const [truePass, setTruePass] = useState(false);


    const openRegModal = () =>{
      setModal(false)
      setRegModal(true)
    }

    const enter = async () =>{
      try{
          const regUser = await signInWithEmailAndPassword(auth, email, passw);
          setModal(false)
          console.log(regUser)
      }
      catch (error) {
          console.log(error.message)
          setTruePass(true)
  }
  }
    

    return (



        <div>
            <div className={modal ? "modal-bg" : "close"} onClick={() => setModal(false)}>
            <CSSTransition in={modal} classNames='alert' timeout={700} unmountOnExit>

        <div className='modal' onClick={e => e.stopPropagation() }>
          <div className='modal-forms'>
            <h1>Зарегистрируйтесь или войдите в нашу систему</h1>

          <div>
            <label>Почта</label>
            <input type="text" placeholder='E-mail' required onChange={e => {setEmail(e.target.value); setTruePass(false)}}/>
          </div>

          <div>
            <label>Пароль</label>
            <input type="password" placeholder='Пароль' required onChange={e => setPassw(e.target.value)}/>
          </div>

            <button className='modal-enter-btn' onClick={enter}>Войти</button>
            <h2 className={truePass ? 'truePass' : 'danone'}>Логин или пароль введен не верно</h2>

            <p className=''>Нет аккаунта? Не проблема! </p>

            <button className='modal-reg-btn' onClick={openRegModal}>Зарегистрироваться</button>
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

export default EnterModal;