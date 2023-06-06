import React from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";



const TicketsList = ({ setRegModal, buyTicket, ...props }) => {

  const auth = getAuth();

  const hanleClick = () =>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
          buyTicket()
      }   else{
        setRegModal(true)
      }
  });
  }



    return (
        <div>
             <div className='tickets-list'>
      <div className='tiket-list'>
        <div className='ticket'>
          <p className='route'>{props.origin} → {props.destination}</p>
          <p className='date1'>{props.departure_at?.split('T')[1].split(':')[0]}:{props.departure_at?.split('T')[1].split(':')[1]}<br/><b>{props.departure_at?.split('T')[0]}</b></p>
          
          
          <p className='rote2'>Пересадок: 0<br/><b>-------•------‣</b><br/></p>
          <p className='date2'>{props.return_at?.split('T')[1].split(':')[0]}:{props.return_at?.split('T')[1].split(':')[1]}<br/><b>{props.return_at?.split('T')[0]}</b></p>
          
          <button className='buy-btn' onClick={hanleClick}>Купить за <b>{props.price}₽</b></button>
    
        </div>
      </div>
    </div>
            
        </div>
    );
};

export default TicketsList;