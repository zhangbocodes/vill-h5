import {Input} from "antd-mobile";
import {checkCardID, getAnalysisIdCard} from '../../utils';
import {getTelephoneApi} from '../../utils/request';

export function IdCard({value, onChange, form}) {
    const onIdCardChange = (value) => {
        onChange(value);
        if (checkCardID(value)) {
            const {birth, gender, age} = getAnalysisIdCard(value);
            form.setFieldsValue({
                birth: new Date(birth),
                gender,
                age
            });
            getTelephoneApi(value).then(({data}) => {
                form.setFieldsValue({
                    telephone: data
                });
            })
        }
    };

    return (
        <Input placeholder='请输入身份证号' type="text" value={value} onChange={onIdCardChange}/>
    );
}
