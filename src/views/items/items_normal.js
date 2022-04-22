import {AutoCenter} from 'antd-mobile';
import {useHistory} from 'react-router-dom';
import styles from './items.module.scss';

export function Items2() {
    const history = useHistory();
    const linkToReport = () => {
      history.push(`/downloadReport2${location.search}`);
    };
    const linkToInfo = () => {
      history.push(`/info${location.search}`);
    };
    const onLogout = () => {
        history.push(`/home`);
    };
    return (
        <AutoCenter className={styles["items-page"]}>
            <div className={styles.card} onClick={linkToReport} style={{backgroundColor: '#00b578'}}>查看报告</div>
            <div className={styles.card} onClick={linkToInfo} style={{backgroundColor: '#00b578'}}>信息录入</div>
            <div className={styles.card} style={{backgroundColor: '#999999'}}>敬请期待</div>
            <div className={styles.card} onClick={onLogout} style={{backgroundColor: '#ff3141'}}>退出登录</div>
        </AutoCenter>
    );
}
