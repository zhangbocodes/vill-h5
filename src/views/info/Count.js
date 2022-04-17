import {Input, Picker} from "antd-mobile";
import {useState} from "react";

const columns = [
  Array.from(new Array(50), (_, i) => ({label: `第${i + 1}次`, value: i + 1}))
];

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
