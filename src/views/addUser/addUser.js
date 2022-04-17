import { useEffect, useState } from "react";
import {Form, Input, Button, CascadePicker, Toast, Dialog} from 'antd-mobile';
import {useHistory} from 'react-router-dom';
import styles from './addUser.module.scss';
import queryString from "query-string";
import { addUserApi, getViils } from "../../utils/request";

const checkPass = form => (rule, value) => {
    const pass2 = value;
    const pass1 = form.getFieldValue('password');
    if (pass2 === pass1) {
        return Promise.resolve()
    }
    return Promise.reject(new Error('两次密码不一致'))
};

export function AddUser() {
    const [form] = Form.useForm();
    const history = useHistory();
    const [visible, setVisible] = useState(false);
    const {uid} = queryString.parse(location.search);
    const [vills, setVills] = useState([]);

    useEffect(() => {
        getViils().then(({data}) => {
            const vills = data.map(v => ({value: v, label: v}));
            setVills(vills);
        });
    }, []);

    const onSubmit = async () => {
        const values = await form.validateFields();
        try {
            await addUserApi(values);
            Toast.show({
                icon: 'success',
                content: '添加成功',
            })
        } catch (e) {
            Dialog.alert({
                content: e.message
            });
            return;
        }
        history.push(`/items?uid=${uid}`);
    };
    return (
        <div>
            <Form
                form={form}
                initialValues={{
                    name: '',
                    password: '',
                    password2: '',
                    area: ''
                }}
                footer={
                    <div className={styles["add-user-btns"]}>
                        <Button block type='submit' color='primary' size='middle' onClick={onSubmit}>
                            保存
                        </Button>
                        <Button block color='danger' size='middle' onClick={() => history.goBack()}>
                            返回
                        </Button>
                    </div>
                }
            >
                <Form.Header>新增管理员</Form.Header>
                <Form.Item name='name' label='新增账号' rules={[{ required: true }]}>
                    <Input placeholder='请输入账号' />
                </Form.Item>
                <Form.Item name='password' label='新增密码' rules={[{ required: true }]}>
                    <Input placeholder='请输入密码' type="password" />
                </Form.Item>
                <Form.Item
                    name='password2'
                    label='再次确认密码'
                    rules={[{required: true}, {validator: checkPass(form)}]}
                    validateTrigger="onBlur"
                >
                    <Input placeholder='请再次输入密码' type="password" />
                </Form.Item>
                <div onClick={() => setVisible(true)}>
                    <Form.Item name='area' label='社区/村' rules={[{ required: true }]}>
                        <Input placeholder='请选择社区/村' readOnly />
                    </Form.Item>
                </div>
            </Form>
            <CascadePicker
                title='社区/村'
                options={vills}
                visible={visible}
                onClose={() => setVisible(false)}
                onConfirm={(val) => {
                    form.setFieldsValue({area: val.join('/')});
                }}
            />
        </div>
    );
}
