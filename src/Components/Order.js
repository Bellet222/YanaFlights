import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc } from "firebase/firestore";




const Order = ({ticketModal, setTicketModal, ...props}) => {

    const [orderName, setOrderName] = useState();
    const [dateBirth, setDateBirth] = useState();
    const [docNum, setDocNum] = useState();
    const [docUntil, setDocUntil] = useState();


    const goDoc = () =>{
        addDoc(collection(db, 'Users', 'UsersList', props.uid), {
            docUntil: docUntil,
            docNum: docNum,
            dateBirth: dateBirth,
            name: orderName,
            origin: props.origin,
            destination: props.destination,
            departure: props.departure,
            returnAt: props.returnAt,
            price: props.price
          });
    }
    


    return (
        <div>
            <div className={ticketModal ? 'modal-bg-reg' : 'close'} onClick={() => setTicketModal(false)}>
                <div className='order-modal' onClick={(e) => e.stopPropagation()}>
                    
                    <h1>Для покупки билета введите свои данные</h1>
                    <div className='order-ticket'>
                        <p>{props.origin} → {props.destination}</p>
                        <div className="order-dates">
                        <p className='order-date1'>{props.departure?.split('T')[1].split(':')[0]}:{props.departure?.split('T')[1].split(':')[1]}<br/><b>{props.departure?.split('T')[0]}</b></p>
                        <p className='order-rote2'>Пересадок: 0<br/><b>-------•------‣</b><br/></p>
                        <p className='order-date2'>{props.returnAt?.split('T')[1].split(':')[0]}:{props.returnAt?.split('T')[1].split(':')[1]}<br/><b>{props.returnAt?.split('T')[0]}</b></p>
                        <p className='order-price'>Стоимость:<br/><b>{props.price}₽</b></p>
                        </div>
                    </div>
                        <form>
                    <div className='order-inputs'>
                        <div className='order-inputs1'>

                        <div>
                            <label>Имя и фамилия</label>
                            <input type="text" placeholder='IVANOV IVAN' onChange={e => setOrderName(e.target.value)} required/>
                        </div>

                        <div>
                            <label>Дата рождения</label>
                            <input type="text" placeholder='22.02.2022' onChange={e => setDateBirth(e.target.value)} required/>
                        </div>

                            
                        </div>
                        <div className='order-inputs2'>

                        <div>
                            <label>Номер Документа</label>
                            <input type="text" placeholder='23 11 323445' onChange={e => setDocNum(e.target.value)} required/>
                        </div>

                        <div>
                            <label>Действует до</label>
                            <input type="text" placeholder='23.05.2025' onChange={e => setDocUntil(e.target.value)} required/>
                        </div>


                        
                        </div>
                        <div className='odrer-btn'>
                            <Link to="/Account"><button onClick={goDoc}>Купить</button></Link>
                        </div>
                    </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Order;