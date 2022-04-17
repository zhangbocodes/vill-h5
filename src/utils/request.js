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

export async function addHistory(userid, data) {
    const {name, creditNumber, gender, age, birth, count, telephone, area, address} = data;
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
            first: area.split('/')[0],
            times: count,
            two: address || area.split('/')[1]
        }
    );
}

export async function logInApi(userName, password, area) {
    return await request(
        'http://81.70.239.81/api/verify',
        {
            name: userName,
            password,
            first: area.split('/')[0]
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

export async function getUsers() {
  return await request(
    'http://81.70.239.81/api/getalluser',
    {}
  );
}

export async function getViils() {
  return await request(
    'http://81.70.239.81/api/getcun',
    {}
  );
}

export async function downloadApi({times, area}) {
  return await request(
    'http://81.70.239.81/api/download',
    {times, cun: area}
  );
}

export async function getAllAreas() {
  return await request(
    'http://81.70.239.81/api/getallcontent',
    {}
  );
}
