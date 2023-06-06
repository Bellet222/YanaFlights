import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { db } from '../firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import UserTicket from './UserTicket';
import { auth } from '../firebase';



const UserAccount = () => {

    const [uid, setUid] = useState();
    const [buyTickets, setBuyTickets] = useState([]);

    const authi = getAuth();
    useEffect(() => {
        onAuthStateChanged(authi, (user) => {
            if (user) {
                setUid(user.uid)
            } 
            else {
                setUid('')
            }
        });

        
      }, [])

      

      const logOut = () =>{
        signOut(auth) 
    }


      const fetchPost = async (uid) => {
       
       await getDocs(collection(db, 'Users', 'UsersList', uid))
            .then((querySnapshot)=>{               
                const newData = querySnapshot.docs
                    .map((ticket) => ({...ticket.data(), id:ticket.id }));
                setBuyTickets(newData);
                console.log(buyTickets, newData);
            })
    }

    useEffect(() => {
        if (uid)
       fetchPost(uid)
   
 }, [uid]) 
  



    return (
        <div className='UserAccount'>
            <div className='user-header'>
                <Link to={'/'}><p className='user-back'>← Назад</p></Link>
                <h1>Личный кабинет</h1>
                <Link to={'/'}><p className='user-exit' onClick={() => logOut}>Выход</p></Link>
            </div>


            <div className='user-tickets'>
                <p onClick={() => fetchPost()}>Ваши билеты</p>
            </div>
        
            <div className='user-bgc'>
                <div className='user-tickets-list'>
                {buyTickets.map((ticket, index) =>
                    <UserTicket
                    docNum = {ticket.docNum}
                    docUntil = {ticket.docUntil}
                    dateBirth = {ticket.dateBirth}
                    price = {ticket.price} 
                    departure_at = {ticket.departure} 
                    return_at = {ticket.returnAt} 
                    destination = {ticket.destination} 
                    origin = {ticket.origin}
                    name = {ticket.name}
                    key = {index}
                    />
                    )}

                    {/* <button onClick={() => fetchPost()}>react</button> */}
                </div>
            </div>
        </div>
    );
};

export default UserAccount;