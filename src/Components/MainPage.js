import "../App.css";
import { useEffect, useState } from "react";
import TicketsList from "./TicketsList";
import Header from "./Header";
import Blocks from "./Blocks";
import EnterModal from "./EnterModal";
import RegModal from "./RegModal";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Order from "./Order";
import { useSpring, animated } from "react-spring";

const MainPage = (props) => {
  const [from, setFrom] = useState();
  const [fromActive, setFromActive] = useState(false);
  const [to, setTo] = useState();
  const [toActive, setToActive] = useState(false);
  const [dateTo, setDateTo] = useState();
  const [dateFrom, setDateFrom] = useState();
  const [pass, setPass] = useState(1);
  const [isActive, setActive] = useState("false");
  const [modal, setModal] = useState(false);
  const [regModal, setRegModal] = useState(false);
  const [namesReg, setNamesReg] = useState();
  const [uid, setUid] = useState();
  const [price, setPrice] = useState();
  const [departure, setDeparture] = useState();
  const [returnAt, setReturnAt] = useState();
  const [destination, setDestination] = useState();
  const [origin, setOrigin] = useState();
  const [ticketModal, setTicketModal] = useState(false);
  const [iAuth, setIAuth] = useState(false);
  const [activeTo, setActiveTo] = useState(false);
  const [valueTo, setValueTo] = useState();

  console.log(namesReg);

  const spring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  const [list, setList] = useState([
    // {price: '2213'}
  ]);

  const plus = (e) => {
    e.preventDefault();
    setPass(pass + 1);
  };

  const minus = (e) => {
    e.preventDefault();
    setPass(pass - 1);
  };

  const searc = (e) => {
    e.preventDefault();

    let newFrom = "";
    let newTo = "";

    if (from == "Москва") newFrom = "MOW";
    if (from == "Уфа") newFrom = "UFA";
    if (from == "Самара") newFrom = "KUF";
    if (from == "Дубай") newFrom = "DXB";

    if (to == "Москва") newTo = "MOW";
    if (to == "Уфа") newTo = "UFA";
    if (to == "Самара") newTo = "KUF";
    if (to == "Дубай") newTo = "DXB";

    const api = `https://api.travelpayouts.com/aviasales/v3/prices_for_dates?origin=${from}&destination=${to}&direct=true&currency=rub&departure_at=${dateTo}&return_at=${dateFrom}&sorting=price&limit=10&token=097bb2c731a1143763f325619ec93b6b`;


    https://api.travelpayouts.com/aviasales/v3/prices_for_dates?origin=MOW&destination=IST&direct=true&currency=rub&departure_at=2023-05-23&return_at=2023-05-27&sorting=price&limit=10&token=097bb2c731a1143763f325619ec93b6b


    fetch(api)
      .then((response) => response.json())
      .then((json) => setList(json.data));

    console.log(list);

    setActive(false);
  };

  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      }
    });
  }, []);

  return (
    <div>
      <EnterModal modal={modal} setModal={setModal} setRegModal={setRegModal} />

      <RegModal
        regModal={regModal}
        setRegModal={setRegModal}
        setModal={setModal}
        namesReg={namesReg}
        setNamesReg={setNamesReg}
      />

      <Order
        origin={origin}
        price={price}
        departure={departure}
        returnAt={returnAt}
        destination={destination}
        ticketModal={ticketModal}
        setTicketModal={setTicketModal}
        uid={uid}
      />

      <Header
        setModal={setModal}
        setRegModal={setRegModal}
        namesReg={namesReg}
        iAuth={iAuth}
        setIAuth={setIAuth}
      />

      <div className="searc" onClick={() => {setFromActive(false); setToActive(false)}}>
        <div className="searc-block">
          <form onSubmit={searc}>
            <div className="search-form">
              <div>
                <label>Откуда летите?</label>
                <input
                  list="Cities1"
                  type="text"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  placeholder="Откуда"
                  required
                  onClick={(e) => {setFromActive(true); e.stopPropagation()}}
                />
                <div className={fromActive ? "selectus" : "danone"}>
                  <p
                    onClick={() => {
                      setFrom("MOW");
                      setFromActive(false);
                    }}
                  >
                    Москва
                  </p>
                  <p
                    onClick={() => {
                      setFrom("UFA");
                      setFromActive(false);
                    }}
                  >
                    Уфа
                  </p>
                  <p
                    onClick={() => {
                      setFrom("DXB");
                      setFromActive(false);
                    }}
                  >
                    Дубай
                  </p>
                  <p
                    onClick={() => {
                      setFrom("AER");
                      setFromActive(false);
                    }}
                  >
                    Сочи
                  </p>
                </div>
                {/* <datalist id="Cities1">
                <option value="Москва"></option>
                <option value="Уфа"></option>
                <option value="Самара"></option>
                <option value="Дубай"></option>
            </datalist>  */}
              </div>

              <div>
                <label>Куда летите?</label>
                <input
                  list="Cities"
                  id="myBrowser"
                  type="text"
                  onChange={(e) => setTo(e.target.value)}
                  placeholder="Куда"
                  value={to}
                  required
                  onClick={(e) => {setToActive(true); e.stopPropagation()}}
                />

                 <div className={toActive ? "selectus" : "danone"}>
                  <p
                    onClick={() => {
                      setTo("MOW");
                      setFromActive(false);
                    }}
                  >
                    Москва
                  </p>
                  <p
                    onClick={() => {
                      setTo("UFA");
                      setFromActive(false);
                    }}
                  >
                    Уфа
                  </p>
                  <p
                    onClick={() => {
                      setTo("DXB");
                      setFromActive(false);
                    }}
                  >
                    Дубай
                  </p>
                  <p
                    onClick={() => {
                      setTo("AER");
                      setFromActive(false);
                    }}
                  >
                    Сочи
                  </p>
                </div>
               
              </div>

              <div>
                <label>Дата вылета</label>
                <input
                  type="date"
                  onChange={(e) => setDateTo(e.target.value)}
                  placeholder="Туда"
                  required
                />
              </div>

              <div>
                <label>Дата прилёта</label>
                <input
                  type="date"
                  onChange={(e) => setDateFrom(e.target.value)}
                  placeholder="Обратно"
                />
              </div>

              <div className="counter">
                <p className="Pcount">Кол-во пассажиров</p>
                <div className="counterM">
                  <button onClick={minus}>-</button>
                  <p>{pass}</p>
                  <button onClick={plus}>+</button>
                </div>
              </div>
            </div>
            <div className="search-tik">
              <p>
                Продолжая, вы принимаете <u>Политику конфиденциальности</u>
                <br /> и <u>Использование сервисов Yana.Flights</u>
              </p>
              <button>Найти билеты</button>
            </div>
          </form>
        </div>
      </div>

      <Blocks setActive={setActive} isActive={isActive} />

      <animated.div style={spring}>
        <div className="tikets-list">
          {list.map((ticket, index) => (
            <TicketsList
              buyTicket={() => {
                setPrice(ticket.price);
                setDeparture(ticket.departure_at);
                setReturnAt(ticket.return_at);
                setDestination(ticket.destination);
                setOrigin(ticket.origin);
                setTicketModal(true);
                console.log(origin);
              }}
              ticket={ticket}
              price={ticket.price}
              departure_at={ticket.departure_at}
              return_at={ticket.return_at}
              destination={ticket.destination}
              origin={ticket.origin}
              key={index}
              setRegModal={setRegModal}
            />
          ))}
        </div>
      </animated.div>
    </div>
  );
};

export default MainPage;
