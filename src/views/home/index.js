import {useHistory} from 'react-router-dom';
import styles from './home.module.scss';

export function Home() {
  const history = useHistory();
  const toLoginPage = () => {
    history.push(`/login`);
  };
  const toSuperLoginPage = () => {
    history.push(`/superLogin`);
  };
  return (
    <div className={styles["home-page"]}>
      <div className={styles.title}>
        <div>彬州市城关街道</div>
        <div>全员核酸登记APP</div>
      </div>
      <div className={styles.btns}>
        <div className={styles.card} onClick={toSuperLoginPage} style={{backgroundColor: '#3998fc'}}>超级管理员登录</div>
        <div className={styles.card} onClick={toLoginPage} style={{backgroundColor: '#3998fc'}}>管理员登录</div>
      </div>
    </div>
  );
}
