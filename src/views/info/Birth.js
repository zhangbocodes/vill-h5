import {DatePicker, Input} from "antd-mobile";
import {useState} from "react";
import {getAge, formatDate} from '../../utils';

export function Birth({value, onChange, form}) {
    const [birthVisible, setBirthVisible] = useState(false);
    const onConfirmBirth = value => {
        onChange(value);
        form.setFieldsValue({
            age: getAge(formatDate(value))
        });
    };

    return (
        <div onClick={() => setBirthVisible(true)}>
            <Input placeholder='请选择出生日期' readOnly value={value && formatDate(value)}/>
            <DatePicker
                title='出生日期'
                visible={birthVisible}
                onClose={() => setBirthVisible(false)}
                max={new Date()}
                onConfirm={onConfirmBirth}
            />
        </div>
    );
}
