import { useEffect, useState } from "react";
import {useDispatch} from 'react-redux';
import {Form, Input, Button, CascadePicker, Avatar, Dialog} from 'antd-mobile';
import {useHistory} from 'react-router-dom';
import styles from './login.module.scss';
import {setArea, setTimes} from '../../actions/actions';
import { getAllAreas, logInApi } from "../../utils/request";
import { Counter } from "../info/Count";

export function LoginPage() {
    const [form] = Form.useForm();
    const history = useHistory();
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const [options, setOptions] = useState([]);
    const _area = (form.getFieldValue('area') || '').split('/');

    useEffect(() => {
        getAllAreas().then(({data}) => {
            const {cun_to_xiaoqu} = data;
            const options = Object.keys(cun_to_xiaoqu).map((area1) => {
                const item = {label: area1, value: area1};
                item.children = cun_to_xiaoqu[area1][0]
                    ? cun_to_xiaoqu[area1].map(area2 => ({label: area2, value: area2}))
                    : [{label: '居民', value: '居民'}, {label: '组号', value: '组号'}];
                return item;
            });
            setOptions(options);
        });
    }, []);

    const onSubmit = async () => {
        const {name, password, area, address, times} = await form.validateFields();
        let result;
        try {
            result = await logInApi(name, password, area);
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
            dispatch(setArea({area, address}));
            dispatch(setTimes(times));
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
                    address: '',
                    times: 1
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
                {
                    (_area[1] === '居民' || _area[1] === '组号') && (
                      <Form.Item name='address' label='详细位置' rules={[{ required: true }]}>
                        <Input placeholder='xx巷xx号/组号' />
                      </Form.Item>
                    )
                }
                <Form.Item name='times' label='检测轮次' rules={[{ required: true }]}>
                    <Counter />
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
