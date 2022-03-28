import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Form, Input, Button, CascadePicker, Avatar, Dialog} from 'antd-mobile';
import {useHistory} from 'react-router-dom';
import styles from './login.module.scss';
import {setArea} from '../../actions/actions';
import {addHistory, logInApi} from '../../utils/request';

const options = [
    {
        label: '浙江',
        value: '浙江',
        children: [
            {
                label: '杭州',
                value: '杭州',
            },
            {
                label: '宁波',
                value: '宁波',
            },
        ],
    },
    {
        label: '江苏',
        value: '江苏',
        children: [
            {
                label: '南京',
                value: '南京',
            },
            {
                label: '苏州',
                value: '苏州',
            },
        ],
    },
];

export function LoginPage() {
    const [form] = Form.useForm();
    const history = useHistory();
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const onSubmit = async () => {
        const {name, password, area, address} = await form.validateFields();
        let result;
        try {
            result = await logInApi(name, password);
        } catch (e) {
            Dialog.alert({
                content: e.message
            });
            return;
        }

        const {data} = result;
        const {role, userid} = data;
        if (role === 1) {
            history.push(`/items?userName=${name}&uid=${userid}`);
        } else {
            dispatch(setArea(`${area}/${address}`));
            history.push(`/info?userName=${name}&uid=${userid}`);
        }
    };
    return (
        <div className={styles["login-page"]}>
            <div className={styles.header}>
                <Avatar src='' style={{ '--border-radius': '50%' }} />
                <div className={styles.text}>请登录</div>
            </div>
            <Form
                form={form}
                initialValues={{
                    name: '',
                    password: '',
                    area: '',
                    address: ''
                }}
                footer={
                    <Button block type='submit' color='primary' size='middle' onClick={onSubmit}>
                        管理员登录
                    </Button>
                }
            >
                <Form.Item name='name' label='账号' rules={[{ required: true }]}>
                    <Input placeholder='请输入账号' />
                </Form.Item>
                <Form.Item name='password' label='密码' rules={[{ required: true }]}>
                    <Input placeholder='请输入密码' type="password" />
                </Form.Item>
                <div onClick={() => setVisible(true)}>
                    <Form.Item name='area' label='区域范围' rules={[{ required: true }]}>
                        <Input placeholder='请选择区域范围' readOnly />
                    </Form.Item>
                </div>
                <Form.Item name='address' label='详细位置'>
                    <Input placeholder='xx巷xx号' />
                </Form.Item>
            </Form>
            <CascadePicker
                title=''
                options={options}
                visible={visible}
                onClose={() => setVisible(false)}
                onConfirm={(val) => {
                    form.setFieldsValue({area: val.join('/')});
                }}
            />
        </div>
    );
}
