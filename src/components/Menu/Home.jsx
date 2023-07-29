import styles from "./home.module.css";
function Home({
  balance,
  setBalance,
  item,
  changeItem,
  dataState,
  editSomething,
  setEditSomething,
  oldEditSomething,
  setOldEditSomething,
  adminLogin,
  setDataState,
}) {
  function update(e) {
    const newE = { ...editSomething };
    newE.object[e.target.name] = e.target.value;
    setEditSomething(newE);
  }
  function save(e) {
    const item = dataState["lvls"].some(
      (i) => parseFloat(i.lvl) == parseFloat(editSomething.object.lvl)
    );
    if (!isNaN(editSomething.object.minBalance)) {
      const newE = [];
      console.log(oldEditSomething.object.lvl);
      Object.values({ ...dataState["lvls"] }).forEach((i, index) => {
        if (i.lvl == oldEditSomething.object.lvl) {
          console.log(editSomething.object);
          newE.push(editSomething.object);
        } else {
          newE.push(i);
        }
      });
      const newEdit = { ...editSomething };
      newEdit.type = "lvls";
      const newData = { ...dataState };
      newData["lvls"] = newE;
      setDataState(newData);
      setEditSomething(newEdit);
      setOldEditSomething(false);
    }
  }
  function returnValue(e) {
    const newE = { ...editSomething };
    newE.object.avatar = oldEditSomething.object.avatar;
    newE.object.title = oldEditSomething.object.title;
    newE.object.lvl = oldEditSomething.object.lvl;
    newE.object.minBalance = oldEditSomething.object.minBalance;
    setEditSomething(newE);
  }
  function deleatValue(e) {
    const item = Object.values(dataState["lvls"]).find(
      (i) => i.lvl == editSomething.object.lvl
    );
    console.log(item);
    const newE = [];
    Object.values({ ...dataState["lvls"] }).forEach((i, index) => {
      if (i.lvl !== item.lvl) {
        newE.push(i);
      }
    });
    console.log(newE);
    const newData = { ...dataState };
    newData["lvls"] = newE;
    setDataState(newData);
    const newEdit = { ...editSomething };
    newEdit.type = "lvls";
    setEditSomething(newEdit);
    setOldEditSomething(false);
  }
  function saveAsNew(e) {
    const itemState = Object.values(dataState["lvls"]).some(
      (i) => i.lvl === editSomething.object.lvl
    );
    console.log(dataState["lvls"]);
    console.log(oldEditSomething.object.lvl);
    if (!itemState) {
      const newData = { ...dataState };
      const newItem = {
        title: editSomething.object.title,
        lvl: editSomething.object.lvl,
        minBalance: editSomething.object.minBalance,
        avatar: editSomething.object.avatar,
      };
      newData["lvls"].push(newItem);
      setDataState({ ...newData });
      const newE = { ...editSomething };
      newE.object.avatar = oldEditSomething.object.avatar;
      newE.object.title = oldEditSomething.object.title;
      newE.object.lvl = oldEditSomething.object.lvl;
      newE.object.minBalance = oldEditSomething.object.minBalance;
      newE.type = "lvls";
      setEditSomething(newE);
      setOldEditSomething(false);
    }
  }
  function imgClick(e) {
    if (adminLogin) {
      setEditSomething({
        state: true,
        type: "lvls",
        other: item.lvl,
        object: { ...dataState.lvls.find((i) => i.lvl == item.lvl) },
      });
    }
  }
  function imgClickLvl(e) {
    if (adminLogin) {
      setEditSomething({
        state: true,
        type: "lvl",
        other: e,
        object: { ...dataState.lvls.find((i) => i.lvl == e) },
      });
      if (!oldEditSomething) {
        setOldEditSomething({
          state: true,
          type: "lvl",
          other: e,
          object: { ...dataState.lvls.find((i) => i.lvl == e) },
        });
      }
    }
  }
  function moneyApp() {
    setBalance(parseFloat((balance + item.click).toFixed(5)));
  }
  let userInfo = dataState.lvls.find((user) => user.lvl == item.lvl);
  let nextUserInfo = dataState.lvls.find((user) => user.lvl == item.lvl + 1);
  return (
    <div className={styles.main}>
      {!editSomething.state && (
        <div className={styles.infoBordPer}>
          <div className={styles.infoBord}>
            <img
              onClick={() => imgClick()}
              className={styles.img}
              alt={userInfo.avatar}
              src={userInfo.avatar}
            />
            {!!nextUserInfo && (
              <div className={styles.lvlBar}>
                <div
                  className={styles.fill}
                  style={{
                    width: `${
                      !!nextUserInfo &&
                      (balance * 100) / nextUserInfo.minBalance
                    }%`,
                  }}
                ></div>
                <h2 className={styles.percent}>{`${parseFloat(
                  (
                    !!nextUserInfo && (balance * 100) / nextUserInfo.minBalance
                  ).toFixed(3)
                )}%`}</h2>
              </div>
            )}
            {!!nextUserInfo == false && (
              <div className={styles.lvlBar}>
                <div
                  className={styles.fill}
                  style={{
                    width: "100%",
                  }}
                ></div>
                <h2 className={styles.percent}>max</h2>
              </div>
            )}
            <h1 className={styles.text}>
              Звание: {userInfo.title} <span>({userInfo.lvl})</span>
            </h1>
          </div>
          <div className={styles.farmBox}>
            <h2 className={styles.balance}>
              Ваш баланс: <span>{balance} BTC</span>
            </h2>
            <button onClick={moneyApp} className={styles.button}>
              Click
            </button>
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
      {editSomething.state && editSomething.type == "lvls" && (
        <button
          onClick={() => {
            const newE = { ...editSomething };
            newE.state = false;
            setEditSomething(newE);
            setOldEditSomething(false);
          }}
          className={styles.button}
        >
          Назад
        </button>
      )}
      {editSomething.state && editSomething.type == "lvls" && (
        <div className={styles.avatars}>
          {dataState.lvls.map((i, index) => {
            return (
              <div className={styles.infoBord}>
                <img
                  onClick={() => imgClickLvl(i.lvl)}
                  className={styles.img}
                  alt={i.avatar}
                  src={i.avatar}
                />

                <h1 className={styles.text}>
                  Звание: {i.title} <span>({i.lvl})</span>
                </h1>
              </div>
            );
          })}
        </div>
      )}
      {editSomething.state && editSomething.type == "lvl" && (
        <div className={styles.editSomething}>
          <h1>Изменение элемента</h1>

          <div className={styles.mouseBox}>
            <h2 className={styles.title}>
              Ссылка
              <input
                type="text"
                name="avatar"
                value={editSomething.object.avatar}
                defaultValue={editSomething.object.avatar}
                placeholder={oldEditSomething.object.avatar}
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
              Уровень
              <input
                type="text"
                name="lvl"
                value={editSomething.object.lvl}
                defaultValue={editSomething.object.lvl}
                placeholder={oldEditSomething.object.lvl}
                onChange={(e) => update(e)}
              />
            </h2>
            <h2 className={styles.title}>
              Мин.баланс
              <input
                type="text"
                name="minBalance"
                value={editSomething.object.minBalance}
                defaultValue={editSomething.object.minBalance}
                placeholder={editSomething.object.minBalance}
                onChange={(e) => update(e)}
              />
            </h2>
            <button
              onClick={() => {
                const newEdit = { ...editSomething };
                newEdit.type = "lvls";
                newEdit.object.avatar = oldEditSomething.object.avatar;
                newEdit.object.title = oldEditSomething.object.title;
                newEdit.object.lvl = oldEditSomething.object.lvl;
                newEdit.object.minBalance = oldEditSomething.object.minBalance;
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
        </div>
      )}
    </div>
  );
}

export default Home;
