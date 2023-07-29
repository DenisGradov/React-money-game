import data from "../../utils/data";
import Mouse from "./Mouse";
import Videocard from "./Videocard";
import styles from "./shop.module.css";
function Shop({
  balance,
  setBalance,
  item,
  changeItem,
  dataState,
  setDataState,
  setItem,
  editSomething,
  setEditSomething,
  adminLogin,
  oldEditSomething,
  setOldEditSomething,
}) {
  function update(e) {
    const newE = { ...editSomething };
    newE.object[e.target.name] = e.target.value;
    setEditSomething(newE);
  }
  function save(e) {
    const item = dataState[editSomething.type].find(
      (i) => i.title == editSomething.object.title
    );
    item.price = parseFloat(item.price);
    item.profit = parseFloat(item.profit);
    if (!isNaN(item.price) && !isNaN(item.profit)) {
      const newE = [];
      Object.values({ ...dataState[editSomething.type] }).forEach(
        (i, index) => {
          if (i.title == item.title) {
            newE.push(editSomething.object);
          } else {
            newE.push(i);
          }
        }
      );
      const newEdit = { ...editSomething };
      newEdit.state = false;
      const newData = { ...dataState };
      newData[editSomething.type] = newE;
      setDataState(newData);
      setEditSomething(newEdit);
      setOldEditSomething(false);
    }
  }
  function returnValue(e) {
    const newE = { ...editSomething };
    newE.object.img = oldEditSomething.object.img;
    newE.object.title = oldEditSomething.object.title;
    newE.object.price = oldEditSomething.object.price;
    newE.object.profit = oldEditSomething.object.profit;
    setEditSomething(newE);
  }
  function deleatValue(e) {
    const item = dataState[editSomething.type].find(
      (i) => i.title == editSomething.object.title
    );
    const newE = [];
    Object.values({ ...dataState[editSomething.type] }).forEach((i, index) => {
      if (i.title !== item.title) {
        newE.push(i);
      }
    });
    const newData = { ...dataState };
    newData[editSomething.type] = newE;
    setDataState(newData);
    const newEdit = { ...editSomething };
    newEdit.state = false;
    setEditSomething(newEdit);
    setOldEditSomething(false);
  }
  function saveAsNew(e) {
    const itemState = Object.values(dataState[editSomething.type]).some(
      (i) => i.title === oldEditSomething.object.title
    );
    if (!itemState) {
      const newData = { ...dataState };
      const newItem = {
        title: editSomething.object.title,
        price: editSomething.object.price,
        profit: editSomething.object.profit,
        count: 0,
        img: editSomething.object.img,
      };
      newData[editSomething.type].push(newItem);
      setDataState({ ...newData });
      const newE = { ...editSomething };
      newE.object.img = oldEditSomething.object.img;
      newE.object.title = oldEditSomething.object.title;
      newE.object.price = oldEditSomething.object.price;
      newE.object.profit = oldEditSomething.object.profit;
      newE.state = false;
      setEditSomething(newE);
      setOldEditSomething(false);
    }
  }
  return (
    <div>
      {!editSomething.state && (
        <div className={styles.shopBox}>
          <h1 className={styles.title}>
            Баланс: <span>{balance}</span>
          </h1>
          <div className={styles.tovarZone}>
            <div className={styles.mouses}>
              {Object.values(dataState.mouses).map((i, index) => {
                return (
                  <Mouse
                    key={`mouse: ${index}`}
                    mouse={i}
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
                );
              })}
            </div>
            <div className={styles.mouses}>
              {Object.values(dataState.videocards).map((i, index) => {
                return (
                  <Videocard
                    key={`mouse: ${index}`}
                    videocard={i}
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
                );
              })}
            </div>
          </div>
          <div className={styles.statisticBox}>
            <h2 className={styles.statistic}>
              BTC за 1 клик: <span>{item.click}</span>
            </h2>
            <h2 className={styles.statistic}>
              BTC в секунду: <span>{item.farmInSec}</span>
            </h2>
          </div>
        </div>
      )}
      {editSomething.state && (
        <div className={styles.editSomething}>
          <h1>Изменение элемента</h1>
          {editSomething.type !== "lvl" && (
            <div className={styles.mouseBox}>
              <h2 className={styles.title}>
                Ссылка
                <input
                  type="text"
                  name="img"
                  value={editSomething.object.img}
                  defaultValue={editSomething.object.img}
                  placeholder={oldEditSomething.object.img}
                  onChange={(e) => update(e)}
                />
              </h2>
              <h2 className={styles.title}>
                Название
                <input
                  type="text"
                  name="title"
                  value={editSomething.object.title}
                  defaultValue={editSomething.object.title}
                  placeholder={oldEditSomething.object.title}
                  onChange={(e) => update(e)}
                />
              </h2>
              <h2 className={styles.title}>
                Цена
                <input
                  type="text"
                  name="price"
                  value={editSomething.object.price}
                  defaultValue={editSomething.object.price}
                  placeholder={oldEditSomething.object.price}
                  onChange={(e) => update(e)}
                />
              </h2>
              <h2 className={styles.title}>
                Прибыль
                <input
                  type="text"
                  name="profit"
                  value={editSomething.object.profit}
                  defaultValue={editSomething.object.profit}
                  placeholder={editSomething.object.profit}
                  onChange={(e) => update(e)}
                />
              </h2>
              <button
                onClick={() => {
                  const newEdit = { ...editSomething };
                  newEdit.state = false;
                  newEdit.object.img = oldEditSomething.object.img;
                  newEdit.object.title = oldEditSomething.object.title;
                  newEdit.object.price = oldEditSomething.object.price;
                  newEdit.object.profit = oldEditSomething.object.profit;
                  setEditSomething(newEdit);
                  setOldEditSomething(false);
                }}
                className={styles.button}
              >
                Назад
              </button>
              <button onClick={(e) => returnValue(e)} className={styles.button}>
                Стереть
              </button>
              <button onClick={(e) => deleatValue(e)} className={styles.button}>
                Удалить
              </button>
              <button onClick={(e) => save(e)} className={styles.button}>
                Сохранить
              </button>
              <button onClick={(e) => saveAsNew(e)} className={styles.button}>
                Сохранить как новый
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Shop;
