import {Input, Picker} from "antd-mobile";
import {useState} from "react";

const columns = [[
    { label: '第1次', value: 1 },
    { label: '第2次', value: 2 },
    { label: '第3次', value: 3 },
    { label: '第4次', value: 4 },
    { label: '第5次', value: 5 }
]];

export function Counter({value, onChange}) {
    const [countVisible, setCountVisible] = useState(false);

    return (
        <div onClick={() => setCountVisible(true)}>
            <Input placeholder='请选择检测次数' readOnly value={`第${value}次`}/>
            <Picker
                columns={columns}
                visible={countVisible}
                onClose={() => setCountVisible(false)}
                onConfirm={c => {
                    onChange(c[0]);
                }}
            />
        </div>
    );
}
