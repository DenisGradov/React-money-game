import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Menu/Home";
import Shop from "./components/Menu/Shop";
import MainLayoute from "./components/Menu/MainLayoute";
import { useEffect, useRef, useState } from "react";
import data from "./utils/data";
import Admin from "./components/Admin/Admin";
function App() {
  const [editSomething, setEditSomething] = useState({
    state: false,
    type: "lvl",
    other: 0,
    object: [],
  });
  const [oldEditSomething, setOldEditSomething] = useState(false);
  const [adminLogin, setAdminLogin] = useState(false);
  const [dataState, setDataState] = useState(false);

  const [balance, setBalance] = useState(70.0);
  const [item, setItem] = useState({ click: 1.0001, farmInSec: 0, lvl: 0 });
  const changeItem = (changedParam, valueParam) => {
    const newItem = { ...item };
    newItem[changedParam] = valueParam;
    setItem(newItem);
  };
  const intervalRef = useRef(null);
  const intervalRef2 = useRef(null);
  if (!dataState) {
    setDataState(data);
  }

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setBalance(parseFloat((balance + item.farmInSec).toFixed(5)));
    }, 1000);
    intervalRef2.current = setInterval(() => {
      let userInfo = dataState.lvls.find((user) => user.lvl == item.lvl);
      let nextUserInfo = dataState.lvls.find(
        (user) => user.lvl == item.lvl + 1
      );
      if (!!nextUserInfo && balance >= nextUserInfo.minBalance) {
        const newItem = { ...item };
        newItem.lvl = nextUserInfo.lvl;
        setItem(newItem);
      }
      let backUserInfo = dataState.lvls.find(
        (user) => user.lvl == item.lvl - 1
      );
      if (!!backUserInfo && balance < userInfo.minBalance) {
        const newItem = { ...item };
        newItem.lvl = backUserInfo.lvl;
        setItem(newItem);
      }
    }, 100);
    return () => {
      clearInterval(intervalRef.current);
      clearInterval(intervalRef2.current);
    };
  }, [item, balance, dataState]);
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainLayoute />}>
            <Route
              index
              element={
                <Home
                  balance={balance}
                  setBalance={setBalance}
                  item={item}
                  changeItem={changeItem}
                  dataState={dataState}
                  setDataState={setDataState}
                  adminLogin={adminLogin}
                  editSomething={editSomething}
                  setEditSomething={setEditSomething}
                  oldEditSomething={oldEditSomething}
                  setOldEditSomething={setOldEditSomething}
                />
              }
            ></Route>
            <Route
              path="/shop"
              element={
                <Shop
                  balance={balance}
                  setBalance={setBalance}
                  item={item}
                  changeItem={changeItem}
                  dataState={dataState}
                  setDataState={setDataState}
                  setItem={setItem}
                  adminLogin={adminLogin}
                  editSomething={editSomething}
                  setEditSomething={setEditSomething}
                  oldEditSomething={oldEditSomething}
                  setOldEditSomething={setOldEditSomething}
                />
              }
            ></Route>
            <Route
              path="/admin"
              element={
                <Admin
                  balance={balance}
                  setBalance={setBalance}
                  item={item}
                  changeItem={changeItem}
                  dataState={dataState}
                  setDataState={setDataState}
                  setItem={setItem}
                  adminLogin={adminLogin}
                  setAdminLogin={setAdminLogin}
                />
              }
            ></Route>
          </Route>
        </Routes>
      </div>
      ;
    </BrowserRouter>
  );
}

export default App;
