import {useState} from 'react';
import {Input, Picker, Space} from 'antd-mobile';
import { DownOutline } from 'antd-mobile-icons';

const options = [
    {
        value: 2,
        label: '小区名'
    }, {
        value: 3,
        label: '组名'
    }
];

export function AreaField({value, onChange}) {
    const [visible, setVisible] = useState(false);
    const {level, value: inputValue} = value;
    const label = options.find(v => v === level)[0].label;

    const onInputChange = (value) => {
        onChange({level, value});
    };

    const onLevelChange = (value) => {
        const level = value[0];
        onChange({level, value: ''});
    };
    return (
        <>
            <Space align='center'>
                <Space align='center' onClick={() => setVisible(true)}>
                    <div>{label}</div>
                    <DownOutline />
                </Space>
                <Input
                    placeholder={`请输入${label}`}
                    value={inputValue}
                    onChange={onInputChange}
                />
            </Space>
            <Picker
                columns={options}
                visible={visible}
                onClose={() => setVisible(false)}
                onConfirm={onLevelChange}
            />
        </>
    );
}
