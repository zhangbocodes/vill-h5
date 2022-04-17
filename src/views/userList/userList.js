import {useState, useEffect} from 'react';
import { Card, List, NavBar } from "antd-mobile";
import {parse} from "query-string";
import {getUsers} from '../../utils/request';
import styles from "../info/info.module.scss";
import { useHistory } from "react-router-dom";

export function UserList() {
  const {uid} = parse(location.search);
  const [users, setUsers] = useState([]);
  const history = useHistory();
  useEffect(() => {
    getUsers(uid).then(({data: users}) => {
      setUsers(users);
    });
  }, []);

  return (
    <div>
      <NavBar className={styles["page-nav"]} onBack={() => history.push(`/items?${location.search}`)} back="返回">
        管理员列表
      </NavBar>
      <List>
        {users.map(([name, password, area]) => (
          <List.Item key={name}>
            <Card title={<div>管理员：{name}</div>}>
              <div>密码：{password}</div>
              <div>社区/村：{area}</div>
            </Card>
          </List.Item>
        ))}
      </List>
    </div>
  );
}
