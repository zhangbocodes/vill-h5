const formatNumber = n => {
    n = n.toString();
    return n[1] ? n : `0${n}`;
};

export const formatDate = date => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${[year, month, day].map(formatNumber).join('-')}`
};

export function checkCardID(code) {
    code = code.toUpperCase();

    // 前2位城市码
    let city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
    // 加权因子
    let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    // 校验位
    let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
    // 身份证简单正则
    let Reg = /^\d{6}(18|19|20)?\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    // 身份证号码数组
    let arr_code = code.split('');

    // 校验编码为空，简单正则，城市编码
    if (!code || !Reg.test(code) || !city[code.substr(0, 2)] || code.length !== 18) { return false; }

    // 校验18位身份证需要验证最后一位校验位
    //∑(ai×Wi)(mod 11)
    let sum = 0;
    for (let i = 0; i < 17; i++) { sum += arr_code[i] * factor[i]; }
    if (parity[sum % 11] != arr_code[17]) {
        return false;
    }
    return true;
}

export function getAnalysisIdCard(card) {
    //获取出生日期
    const birth = card.substring(6, 10) + '-' + card.substring(10, 12) + '-' + card.substring(12, 14);
    const gender = parseInt(card.substr(16, 1)) % 2 === 1 ? 0 : 1;
    //获取年龄
    let myDate = new Date();
    let month = myDate.getMonth() + 1;
    let day = myDate.getDate();
    let age = myDate.getFullYear() - card.substring(6, 10) - 1;
    if (card.substring(10, 12) < month || card.substring(10, 12) === month && card.substring(12, 14) <= day) {
        age++;
    }
    return {birth, gender, age};
}

export function getAge(birthday) {
    return new Date(new Date().getTime() - new Date(birthday).getTime()).getFullYear() - 1970;
}
