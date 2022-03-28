import superagent from 'superagent';
import {formatDate} from './index';

export const request = (url, postData, options = {}) => {
    const { timeout = null, accept = 'json', type = 'form', headers = {} } = options;
    const theRequest = superagent
        .post(url)
        .set(headers)
        .accept(accept)
        .type(type)
        .send(postData);
    if (timeout !== null) {
        theRequest.timeout(timeout);
    }
    return theRequest.then(response => {
        const {code, errorMsg} = response.body;
        if (code >= 0) {
            return response.body || {};
        }
        throw new Error(errorMsg);
    });
};

export async function shibie(image) {
    return await request(
        'http://81.70.239.81/api/shibie',
        {image}
    );
}

export async function getTelephoneApi(idcard) {
    return await request(
        'http://81.70.239.81/api/getiphone',
        {idcard}
    );
}

export async function addHistory(userid, area, data) {
    const {name, creditNumber, gender, age, birth, count, telephone} = data;
    return await request(
        'http://81.70.239.81/api/inserthistory',
        {
            name,
            sex: gender ? '女' : '男',
            age,
            birth: formatDate(birth),
            idcard: creditNumber,
            iphone: telephone,
            userid,
            area
        }
    );
}

export async function logInApi(userName, password) {
    return await request(
        'http://81.70.239.81/api/verify',
        {
            name: userName,
            password
        }
    );
}

export async function addUserApi({name, password, area}) {
    return await request(
        'http://81.70.239.81/api/insertuser',
        {
            name,
            password,
            area
        }
    );
}


export async function addAreaApi({area, level, level2Name, newArea}) {
    const params = {
        first: area,
        two: level === 2 ? newArea : level2Name,
        three: level === 3 ? newArea : ''
    };
    return await request(
        'http://81.70.239.81/api/insertcountry',
        params
    );
}
