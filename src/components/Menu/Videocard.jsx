import data from "../../utils/data";
import styles from "./videocard.module.css";
function Videocard({
  videocard,
  balance,
  setBalance,
  item,
  changeItem,
  dataState,
  setDataState,
  setItem,
  adminLogin,
  editSomething,
  setEditSomething,
  oldEditSomething,
  setOldEditSomething,
}) {
  function imgClick(e) {
    if (adminLogin) {
      setEditSomething({
        state: true,
        type: "videocards",
        other: videocard.title,
        object: videocard,
      });
      if (!oldEditSomething) {
        setOldEditSomething({
          state: true,
          type: "videocards",
          other: videocard.title,
          object: { ...videocard },
        });
      }
    }
  }
  function buttonClick(e) {
    if (balance >= videocard.price) {
      data.videocards.find((item) => item.title == videocard.title).count += 1;
      setBalance(
        parseFloat(
          (
            balance -
            data.videocards.find((item) => item.title == videocard.title).price
          ).toFixed(5)
        )
      );
      let newItem = { ...item };
      newItem.farmInSec = parseFloat(
        (item.farmInSec + videocard.profit).toFixed(7)
      );

      setItem(newItem);
      setDataState({ ...data });
    } else {
      alert("На вашем балансе недостаточно BTC!");
    }
  }
  return (
    <div className={styles.mouseBox}>
      <img
        onClick={(e) => imgClick(e)}
        className={styles.img}
        alt={videocard.title}
        src={videocard.img}
      />
      <h1 className={styles.title}>{videocard.title}</h1>
      <h2 className={styles.text}>
        Цена: <span>{videocard.price}</span>
      </h2>
      <h2 className={styles.text}>
        Прибыль: <span>{videocard.profit}</span>
      </h2>
      <h2 className={styles.text}>
        У вас: <span>{videocard.count}</span> штук
      </h2>
      <button
        id={videocard.title}
        onClick={(e) => buttonClick(e)}
        className={styles.button}
      >
        Купить
      </button>
    </div>
  );
}

export default Videocard;
