import data from "../../utils/data";
import styles from "./mouse.module.css";
function Mouse({
  mouse,
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
        type: "mouses",
        other: mouse.title,
        object: mouse,
      });
      if (!oldEditSomething) {
        setOldEditSomething({
          state: true,
          type: "mouses",
          other: mouse.title,
          object: { ...mouse },
        });
      }
    }
  }
  function buttonClick(e) {
    if (balance >= mouse.price) {
      data.mouses.find((item) => item.title == mouse.title).count += 1;
      setBalance(
        parseFloat(
          (
            balance -
            data.mouses.find((item) => item.title == mouse.title).price
          ).toFixed(5)
        )
      );
      let newItem = { ...item };
      newItem.click = parseFloat((item.click + mouse.profit).toFixed(7));

      setItem(newItem);
    } else {
      alert("На вашем балансе недостаточно BTC!");
    }
  }
  return (
    <div className={styles.mouseBox}>
      <img
        onClick={(e) => imgClick(e)}
        className={styles.img}
        alt={mouse.title}
        src={mouse.img}
      />
      <h1 className={styles.title}>{mouse.title}</h1>
      <h2 className={styles.text}>
        Цена: <span>{mouse.price}</span>
      </h2>
      <h2 className={styles.text}>
        Прибыль: <span>{mouse.profit}</span>
      </h2>
      <h2 className={styles.text}>
        У вас: <span>{mouse.count}</span> штук
      </h2>
      <button
        id={mouse.title}
        onClick={(e) => buttonClick(e)}
        className={styles.button}
      >
        Купить
      </button>
    </div>
  );
}

export default Mouse;
