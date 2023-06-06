import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

const UserTicket = (props) => {

    const [active, setActive] = useState(false);

    return (
        <div>
            <div className='main-ticket'>
                <div className='order-main-ticket'>
                    <p className='order-rote'>{props.origin} → {props.destination}</p>
                    
                        <div className='order-ticket-info'>
                            <p className='order-date1'>{props.departure_at?.split('T')[1].split(':')[0]}:{props.departure_at?.split('T')[1].split(':')[1]}<br/><b>{props.departure_at?.split('T')[0]}</b></p>
                            <p className='order-route'>Пересадок: 0<br/><b>------------------‣</b></p>
                            <p className='order-date1'>{props.return_at?.split('T')[1].split(':')[0]}:{props.return_at?.split('T')[1].split(':')[1]}<br/><b>{props.return_at?.split('T')[0]}</b></p>
                        </div>
                    <button onClick={() => setActive(!active)}>Больше</button>
                </div>


                <CSSTransition in={active} classNames='alert' timeout={400} unmountOnExit>

                <hr color='#777777' className='me-hr'/>

                </CSSTransition>


                <CSSTransition in={active} classNames='alert' timeout={400} unmountOnExit>

                

                   <div className='wrapper-user-info'>
                        <div className='order-user-info'> 
                            <div>
                                <p>Имя: {props.name}</p>
                                <p>Дата рождения: {props.dateBirth}</p>
                            </div>

                            <div>
                                <p>№ Документа: {props.docNum}</p>
                                <p>Действует до: {props.docUntil}</p>
                            </div>
                        </div>
                    </div>
                   
                </CSSTransition>
            </div>
        </div>
    );
};

export default UserTicket;