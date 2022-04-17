import {useState} from 'react';
import {Form, Input, Button, CascadePicker, Picker, Radio, Space, Toast, Dialog} from 'antd-mobile';
import {useHistory} from 'react-router-dom';
import {area1options} from '../../constants/constants';
import styles from './addArea.module.scss';
import {addAreaApi} from "../../utils/request";
import queryString from "query-string";

const options = [
    {
        value: 2,
        label: '小区名'
    }, {
        value: 3,
        label: '组名'
    }
];

const area2Options = [{
    value: '明珠馨园',
    label: '明珠馨园'
}, {
    value: '电影公司家属楼',
    label: '电影公司家属楼'
}];

export function AddArea() {
    const [form] = Form.useForm();
    const history = useHistory();
    const {uid} = queryString.parse(location.search);
    const [visible, setVisible] = useState(false);
    const [area2Visible, setArea2Visible] = useState(false);
    const onSubmit = async () => {
        const values = await form.validateFields();
        try {
            await addAreaApi(values);
            Toast.show({icon: 'success', content: '添加成功',})
        } catch (e) {
            Dialog.alert({content: e.message});
            return;
        }
        history.push(`/items?uid=${uid}`);
    };
    return (
        <div>
            <Form
                form={form}
                initialValues={{
                    area: '',
                    level: 2,
                    level2Name: '',
                    newArea: ''
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
                <Form.Header>新增管理区域</Form.Header>
                <div onClick={() => setVisible(true)}>
                    <Form.Item name='area' label='社区/村' rules={[{ required: true }]}>
                        <Input placeholder='请选择社区/村' readOnly />
                    </Form.Item>
                </div>
                <Form.Item name='level' label='新增小区/组' rules={[{ required: true }]}>
                    <Radio.Group>
                        <Space>
                            {options.map(({value, label}) => <Radio value={value}>{label}</Radio>)}
                        </Space>
                    </Radio.Group>
                </Form.Item>
                <Form.Subscribe to={['level']}>
                    {({level}) => {
                        const label = options.find(o => o.value === level)?.label;
                        return (
                            <>
                                {level === 3 && (
                                    <div onClick={() => setArea2Visible(true)}>
                                        <Form.Item name='level2Name' label='小区名' rules={[{required: true}]}>
                                            <Input placeholder='请选择小区名' readOnly />
                                        </Form.Item>
                                    </div>
                                )}
                                <Form.Item name='newArea' label={label} rules={[{ required: true }]}>
                                    <Input placeholder={`请输入${label}`} />
                                </Form.Item>
                            </>
                        )
                    }}
                </Form.Subscribe>
            </Form>
            <CascadePicker
                title='社区/村'
                options={area1options}
                visible={visible}
                onClose={() => setVisible(false)}
                onConfirm={(val) => {
                    form.setFieldsValue({area: val.join('/')});
                }}
            />
            <CascadePicker
                title='小区名'
                options={area2Options}
                visible={area2Visible}
                onClose={() => setArea2Visible(false)}
                onConfirm={(val) => {
                    form.setFieldsValue({level2Name: val.join('/')});
                }}
            />
        </div>
    );
}
