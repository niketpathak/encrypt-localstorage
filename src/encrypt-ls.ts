/*
 * https://github.com/niketpathak/encrypt-localstorage
 * Copyright (c) 2021 Niket Pathak
 * MIT License
 */

import ls from 'localstorage-slim';
import AES from 'crypto-js/aes';
import encUTF8 from 'crypto-js/enc-utf8';

const testObj = {
  type: 'DC heroes',
  superman: {
    name: 'Clark kent',
    hero: true,
    strength: 100,
    weak: false,
    weird: null,
    abilities: ['heat vision', 'speed'],
  },
};

const testArr = ['Apple', 13, true, null, false, 14.5, { ironman: 'Tony Stark' }];

ls.config.encrypter = (data, secret) => AES.encrypt(JSON.stringify(data), secret as string).toString();
ls.config.decrypter = (data, secret) => {
  try {
    return JSON.parse(AES.decrypt(data as string, secret as string).toString(encUTF8));
  } catch (e) {
    // incorrect secret, return the encrypted data instead / or null
    return data; // or return null;
  }
};

ls.config.encrypt = true;
ls.config.secret = 'secret-string';

ls.set('number', 25865);
ls.set('text', 'hello world');
ls.set('test-object', testObj);
ls.set('test-object-unencrypted', testObj, { encrypt: false });
ls.set('test-object-ttl', testObj, { ttl: 10 });
ls.set('test-Array-ttl', testArr, { ttl: 10, secret: 'another-one' });

console.log('ls.get("number") :>> ', ls.get('number'));
console.log('ls.get("text") :>> ', ls.get('text'));
console.log('ls.get("test-object") :>> ', ls.get('test-object'));
console.log('ls.get("test-object-unencrypted") :>> ', ls.get('test-object-unencrypted'));
console.log(
  'ls.get("test-object-unencrypted get with encrypt flag") :>> ',
  ls.get('test-object-unencrypted', { encrypt: true })
);
console.log('ls.get("test-object-ttl") :>> ', ls.get('test-object-ttl'));
console.log('ls.get("test-Array-ttl" incorrect secret) :>> ', ls.get('test-Array-ttl'));
console.log('ls.get("test-Array-ttl") :>> ', ls.get('test-Array-ttl', { secret: 'another-one' }));

export const app = {};
