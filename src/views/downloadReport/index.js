import {useState, useEffect} from 'react';
import { useSelector } from "react-redux";
import {Form, Input, Button, CascadePicker, Card, Dialog, NavBar, Tag} from 'antd-mobile';
import {getViils, downloadApi} from '../../utils/request';
import { Counter } from "../info/Count";
import styles from "./download.module.scss";
import { useHistory } from "react-router-dom";

const {alert} = Dialog;

export function DownloadReport() {
  const [form] = Form.useForm();
  const history = useHistory();
  const initialTimes = useSelector(state => state.times);
  const [visible, setVisible] = useState(false);
  const [vills, setVills] = useState([]);
  const [checkResults, setCheckResults] = useState();
  const {area: _area, times: _times} = form.getFieldsValue();

  useEffect(() => {
    getViils().then(({data}) => {
      const vills = [{value: '全部', label: '全部'}].concat(data.map(v => ({value: v, label: v})));
      setVills(vills);
    });
  }, []);

  const onSubmit = submitType => async () => {
    const {area, times} = await form.validateFields();
    const ref = window.open("url","_blank");
    let result;
    try {
      result = await downloadApi({area, times});
    } catch (e) {
      alert({ content: e.message });
      return;
    }
    const {data} = result;
    const {should_count, not_hesuan_count, done_cun_count, not_area_count, area_count, fileurl} = data;
    setCheckResults({should_count, not_hesuan_count, done_cun_count, not_area_count, area_count});
    if (submitType === 'download') {
      ref.location = fileurl;
    }
  };
  return (
    <div className={styles['download-page']}>
      <NavBar className={styles["page-nav"]} onBack={() => history.push(`/items?${location.search}`)} back="返回">
          查看报告
      </NavBar>
      <Form
        form={form}
        initialValues={{
          area: '',
          times: initialTimes
        }}
        footer={
          <div className={styles.footer}>
            <Button block type='submit' color='primary' size='middle' onClick={onSubmit('query')}>
              查询报告
            </Button>
            <Button block type='submit' color='primary' size='middle' onClick={onSubmit('download')}>
              下载报告
            </Button>
          </div>
        }
      >
        <div onClick={() => setVisible(true)}>
          <Form.Item name='area' label='社区/村' rules={[{ required: true }]}>
            <Input placeholder='请选择社区/村' readOnly />
          </Form.Item>
        </div>
        <Form.Item name='times' label='检测轮次' rules={[{ required: true }]}>
          <Counter />
        </Form.Item>
      </Form>
      {checkResults && (
        <Card title={`${_area}第${_times}轮核酸检测结果`}>
          <p>应做核酸<Tag color='primary'>{checkResults.should_count}</Tag>人</p>
          <p>未做核酸<Tag color='danger'>{checkResults.not_hesuan_count}</Tag>人</p>
          <p>
            已做核酸<Tag color='success'>{checkResults.done_cun_count}</Tag>人，
            包含本社区<Tag color='success'>{checkResults.area_count}</Tag>人，
            非本社区<Tag color='warning'>{checkResults.not_area_count}</Tag>人
          </p>
        </Card>
      )}

      <CascadePicker
        title=''
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
