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
      <div></div>
      <div className={styles.btns}>
        <div className={styles.card} onClick={toSuperLoginPage} style={{backgroundColor: 'rgb(118 179 244)'}}>超级管理员登录</div>
        <div className={styles.card} onClick={toLoginPage} style={{backgroundColor: 'rgb(118 179 244)'}}>管理员登录</div>
      </div>
    </div>
  );
}
