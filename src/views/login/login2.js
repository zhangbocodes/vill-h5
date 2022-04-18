import {Form, Input, Button, Avatar, Dialog, NavBar} from 'antd-mobile';
import {useHistory} from 'react-router-dom';
import styles from './login.module.scss';
import {logInApi} from "../../utils/request";

const {alert} = Dialog;

export function LoginPage() {
  const [form] = Form.useForm();
  const history = useHistory();

  const onSubmit = async () => {
    const {name, password} = await form.validateFields();
    let result;
    try {
      result = await logInApi(name, password);
    } catch (e) {
      alert({ content: e.message });
      return;
    }

    const {data} = result;
    const {role, userid} = data;
    if (role === 1) {
      history.push(`/items?userName=${name}&uid=${userid}`);
    } else {
      alert({content: '您不是超级管理员'});
    }
  };
  return (
    <>
      <NavBar className={styles["page-nav"]} onBack={() => history.push(`/home`)} back="返回">
        超级管理员登录
      </NavBar>
      <div className={styles["login-page"]}>
        <div className={styles.header}>
          <Avatar src='' style={{ '--border-radius': '50%' }} />
          <div className={styles.text}>请登录</div>
        </div>
        <Form
          form={form}
          initialValues={{ name: '', password: '' }}
          footer={
            <Button block type='submit' color='primary' size='middle' onClick={onSubmit}>
              超级管理员登录
            </Button>
          }
        >
          <Form.Item name='name' label='账号' rules={[{ required: true }]}>
            <Input placeholder='请输入账号' />
          </Form.Item>
          <Form.Item name='password' label='密码' rules={[{ required: true }]}>
            <Input placeholder='请输入密码' type="password" />
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
