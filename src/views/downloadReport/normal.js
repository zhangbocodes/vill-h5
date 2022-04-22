import {useState, useRef} from 'react';
import { useSelector } from "react-redux";
import {Form, Button, Card, Dialog, NavBar, Tag} from 'antd-mobile';
import {downloadApi} from '../../utils/request';
import { Counter } from "../info/Count";
import styles from "./download.module.scss";
import { useHistory } from "react-router-dom";

const {alert} = Dialog;

export function DownloadReport2() {
  const [form] = Form.useForm();
  const history = useHistory();
  const ref = useRef();
  const {area} = useSelector(state => state.area);
  const initialTimes = useSelector(state => state.times);
  const [checkResults, setCheckResults] = useState();
  const {times: _times} = form.getFieldsValue();

  const onSubmit = submitType => async () => {
    const {times} = await form.validateFields();
    let result;
    try {
      result = await downloadApi({area: area.split('/')[0], times});
    } catch (e) {
      alert({ content: e.message });
      return;
    }
    const {data} = result;
    const {should_count, not_hesuan_count, done_cun_count, not_area_count, area_count, fileurl} = data;
    setCheckResults({should_count, not_hesuan_count, done_cun_count, not_area_count, area_count});
    if (submitType === 'download') {
      ref.current.href = fileurl;
      ref.current.click();
    }
  };
  return (
    <div className={styles['download-page']}>
      <NavBar className={styles["page-nav"]} onBack={() => history.push(`/items_normal${location.search}`)} back="返回">
        查看报告
      </NavBar>
      <Form
        form={form}
        initialValues={{
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
        <Form.Item name='times' label='检测轮次' rules={[{ required: true }]}>
          <Counter />
        </Form.Item>
      </Form>
      {checkResults && (
        <Card title={`第${_times}轮核酸检测结果`}>
          <p>应做核酸<Tag color='primary'>{checkResults.should_count}</Tag>人</p>
          <p>未做核酸<Tag color='danger'>{checkResults.not_hesuan_count}</Tag>人</p>
          <p>
            已做核酸<Tag color='success'>{checkResults.done_cun_count}</Tag>人，
            包含本社区<Tag color='success'>{checkResults.area_count}</Tag>人，
            非本社区<Tag color='warning'>{checkResults.not_area_count}</Tag>人
          </p>
        </Card>
      )}
      <a href="" ref={ref} style={{visibility: 'hidden'}}>点击下载</a>
    </div>
  );
}
