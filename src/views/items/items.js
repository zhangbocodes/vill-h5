import {AutoCenter} from 'antd-mobile';
import {useHistory} from 'react-router-dom';
import styles from './items.module.scss';
import queryString from "query-string";

export function Items() {
    const history = useHistory();
    const {uid} = queryString.parse(location.search);
    const linkToAddUser = () => {
        history.push(`/addUser?uid=${uid}`);
    };
    const linkToAddArea = () => {
        history.push(`/addArea?uid=${uid}`);
    };
    const linkToManagerList = () => {
      history.push(`/userList?uid=${uid}`);
    };
    const linkToReport = () => {
      history.push(`/downloadReport?uid=${uid}`);
    };
    const onLogout = () => {
        history.push(`/login`);
    };
    return (
        <AutoCenter className={styles["items-page"]}>
            <div className={styles.card} onClick={linkToAddArea} style={{backgroundColor: '#00b578'}}>新增区域</div>
            <div className={styles.card} onClick={linkToAddUser} style={{backgroundColor: '#00b578'}}>新增管理员</div>
            <div className={styles.card} onClick={linkToManagerList} style={{backgroundColor: '#00b578'}}>管理员列表</div>
            <div className={styles.card} onClick={linkToReport} style={{backgroundColor: '#00b578'}}>查看报告</div>
            <div className={styles.card} style={{backgroundColor: '#999999'}}>敬请期待</div>
            <div className={styles.card} onClick={onLogout} style={{backgroundColor: '#ff3141'}}>退出登录</div>
        </AutoCenter>
    );
}
