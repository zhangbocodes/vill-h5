import queryString from 'query-string';
import { useEffect, useState } from "react";
import {Form, Input, Button, ImageUploader, Dialog, Toast, NavBar, CascadePicker} from 'antd-mobile';
import {useSelector} from 'react-redux';
import {Counter} from './Count';
import {Birth} from './Birth';
import {Gender} from './Gender';
// import IdCardCamera from './IdCardCamera';
import {IdCard} from './IdCard';
import styles from './info.module.scss';
import { shibie, addHistory, getTelephoneApi, getAllAreas } from "../../utils/request";
import {startCompress} from "../../utils/compressBase64";
import {getAge} from '../../utils';
import {useHistory} from "react-router-dom";

const {alert} = Dialog;

export function Info() {
    const [form] = Form.useForm();
    const {uid, userName} = queryString.parse(location.search);
    const {area: initialArea} = useSelector(state => state.area);
    const history = useHistory();
    const [isShibieLoading, setIsShibieLooading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        getAllAreas().then(({data}) => {
            const {cun_to_xiaoqu} = data;
            const options = Object.keys(cun_to_xiaoqu).map((area1) => {
                const item = {label: area1, value: area1};
                item.children = cun_to_xiaoqu[area1].map(area2 => ({label: area2, value: area2}));
                return item;
            });
            setOptions(options);
        });
  }, []);

    const onSubmit = async () => {
        const values = await form.validateFields();
        try {
            await addHistory(uid, values);
            Toast.show({icon: 'success', content: '录入成功',})
        } catch (e) {
            Dialog.alert({
                content: e.message
            });
            return;
        }
        form.resetFields();
    };

    const __formatUploadFile2base64AndCompress = async file => {
        setIsShibieLooading(true);
        const handleImgFileBase64 = file => {
            return new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = function () {
                    resolve(reader.result);
                };
            });
        };

        let result;
        try {
            let res = await handleImgFileBase64(file);
            if (file.size > 750 * 1334) {
                res = await startCompress(res);
            }
            result = await shibie(res);
        } catch (e) {
            setIsShibieLooading(false);
            alert({content: '自动识别失败'});
            return;
        }
        setIsShibieLooading(false);

        const {name, sex, idcard, birth: birth_} = result.data;
        const birth = birth_.substring(0, 4) + '-' + birth_.substring(4, 6) + '-' + birth_.substring(6, 8);
        form.setFieldsValue({
            name,
            creditNumber: idcard,
            gender: sex === '男' ? 0 : 1,
            birth: new Date(birth),
            age: getAge(birth)
        });
        getTelephoneApi(idcard).then(({data}) => {
            form.setFieldsValue({
                telephone: data
            });
        });

        return null;
    };

    return (
        <div className={styles["info-page"]}>
            <NavBar className={styles["page-nav"]} onBack={() => history.push(`/items_normal${location.search}`)} back="返回">
                管理员 - {userName}
            </NavBar>
            <div>
                <ImageUploader
                    className={styles["id-card-uploader"]}
                    value={[]}
                    maxCount={1}
                    capture="camera"
                    beforeUpload={__formatUploadFile2base64AndCompress}
                    preview={false}
                    showFailed={false}
                    children={
                        <Button block color='primary' size='large' loading={isShibieLoading} loadingText="识别中">
                            身份证拍照识别
                        </Button>
                    }
                />
                {/*<Mask visible={isShowCamera} onMaskClick={() => setIsShowCamera(false)} />*/}
                {/*{isShowCamera && <IdCardCamera form={form} setIsShowCamera={setIsShowCamera} />}*/}
            </div>
            <Form
                form={form}
                initialValues={{
                    name: '',
                    creditNumber: '',
                    gender: 0,
                    age: '',
                    birth: '',
                    count: 1,
                    telephone: '',
                    area: initialArea,
                    address: ''
                }}
                footer={
                    <div className={styles.footer}>
                        <Button type='submit' block color='success' size='large' onClick={onSubmit}>
                            确定
                        </Button>
                        <Button color='danger' block size='large' onClick={() => form.resetFields()}>
                            重置
                        </Button>
                    </div>
                }
            >
                <Form.Header>信息录入</Form.Header>
                <Form.Item name='name' label='姓名' rules={[{ required: true }]}>
                    <Input placeholder='请输入姓名' />
                </Form.Item>
                <Form.Item name='creditNumber' label='身份证号' rules={[{ required: true }]}>
                    <IdCard form={form} />
                </Form.Item>
                <Form.Item name='gender' label='性别'  rules={[{ required: true }]}>
                    <Gender />
                </Form.Item>
                <Form.Item name='age' label='年龄' rules={[{ required: true }]}>
                    <Input placeholder='请输入年龄' type="number" />
                </Form.Item>
                <Form.Item name='birth' label='出生日期' rules={[{ required: true }]}>
                    <Birth form={form} />
                </Form.Item>
                <div onClick={() => setVisible(true)}>
                    <Form.Item name='area' label='区域范围' rules={[{ required: true }]}>
                        <Input placeholder='请选择区域范围' readOnly />
                    </Form.Item>
                </div>
                <Form.Item name='address' label='详细位置'>
                    <Input placeholder='xx巷xx号/组号' />
                </Form.Item>
                <Form.Item name='count' label='检测次数' rules={[{ required: true }]}>
                    <Counter/>
                </Form.Item>
                <Form.Item name='telephone' label='手机号' rules={[{ required: true }]}>
                    <Input placeholder='请输入手机号' type="tel" />
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
