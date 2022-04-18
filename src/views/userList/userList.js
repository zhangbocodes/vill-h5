import {useState, useEffect} from 'react';
import { Card, List, NavBar, SwipeAction, Toast } from "antd-mobile";
import {parse} from "query-string";
import {getUsers, delUser} from '../../utils/request';
import styles from "../info/info.module.scss";
import { useHistory } from "react-router-dom";

export function UserList() {
  const {uid} = parse(location.search);
  const [users, setUsers] = useState([]);
  const history = useHistory();
  const [flag, refresh] = useState(0);
  useEffect(() => {
    getUsers(uid).then(({data: users}) => {
      setUsers(users);
    });
  }, [flag]);

  return (
    <div>
      <NavBar className={styles["page-nav"]} onBack={() => history.push(`/items?${location.search}`)} back="返回">
        管理员列表
      </NavBar>
      <List>
        {users.map(([name, password, area]) => (
          <SwipeAction
            key={name}
            rightActions={[{
              key: 'delete',
              text: '删除',
              color: 'danger',
              onClick: async () => {
                await delUser(name);
                Toast.show({
                  icon: 'success',
                  content: '删除成功',
                  maskClickable: false,
                });
                refresh(i => i + 1);
              }
            }]}
          >
            <List.Item key={name}>
              <Card title={<div>管理员：{name}</div>}>
                <div>密码：{password}</div>
                <div>社区/村：{area}</div>
              </Card>
            </List.Item>
          </SwipeAction>
        ))}
      </List>
    </div>
  );
}
