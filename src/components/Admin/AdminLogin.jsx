import styles from "./adminLogin.module.css";
function AdminLogin({ AdminLogin, dataState, setAdminLogin }) {
  function login(e) {
    e.preventDefault();
    if (
      e.target.login.value == dataState.admin.login &&
      e.target.password.value == dataState.admin.password
    ) {
      setAdminLogin(true);
    } else {
      console.log(false);
    }
  }
  return (
    <div className={styles.box}>
      <form className={styles.form} onSubmit={(e) => login(e)}>
        <h2 className={styles.text}>Логин:</h2>
        <input className={styles.input} type="text" name="login"></input>
        <h2 className={styles.text}>Пароль:</h2>
        <input className={styles.input} type="password" name="password"></input>
        <button
          className={styles.button}
          onSubmit={(e) => {
            login(e);
          }}
        >
          Авторизация
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
