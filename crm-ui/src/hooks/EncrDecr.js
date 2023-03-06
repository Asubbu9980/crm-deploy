import Cryptr from 'cryptr';
const myCryptr = new Cryptr('!@#$%^&*(CRM)*&^%$#@!');

export const set = (value) => {
    return myCryptr.encrypt(value)
}

export const get = (value) => {
    return myCryptr.decrypt(value)
}
