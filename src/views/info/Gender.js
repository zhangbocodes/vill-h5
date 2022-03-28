import {Input, Picker} from "antd-mobile";
import {useState} from "react";

export function Gender({value, onChange}) {
    const [genderVisible, setGenderVisible] = useState(false);

    return (
        <div onClick={() => setGenderVisible(true)}>
            <Input placeholder='请选择性别' readOnly value={value ? '女' : '男'}/>
            <Picker
                columns={[[
                    { label: '男', value: 0 },
                    { label: '女', value: 1 },
                ]]}
                visible={genderVisible}
                onClose={() => setGenderVisible(false)}
                onConfirm={g => {
                    onChange(g[0]);
                }}
            />
        </div>
    );
}
