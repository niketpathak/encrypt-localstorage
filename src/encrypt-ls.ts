/*
 * https://github.com/niketpathak/encrypt-localstorage
 * Copyright (c) 2021 Niket Pathak
 * MIT License
 */

import ls from 'localstorage-slim';
import AES from 'crypto-js/aes';
import tripleDES from 'crypto-js/tripledes';
import RC4 from 'crypto-js/rc4';
import rabbit from 'crypto-js/rabbit';
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

// Cipher to use
const cipher = tripleDES; // AES / tripleDES / RC4 / rabbit

const testArr = ['Apple', 13, true, null, false, 14.5, { ironman: 'Tony Stark' }];

ls.config.encrypter = (data, secret) => cipher.encrypt(JSON.stringify(data), secret as string).toString();
ls.config.decrypter = (data, secret) => {
  try {
    return JSON.parse(cipher.decrypt(data as string, secret as string).toString(encUTF8));
  } catch (e) {
    // incorrect secret, return the encrypted data instead / or null
    return data; // or return null;
  }
};

const screenshotable = () => {
  const data = {
    superman: 'Clark Kent',
    power: 100,
  };
  ls.set('data', data);
  console.log('%c******** Standard case (No TTL, no Encryption) ********', 'background: #000; color: #e5e829');
  console.log('ls.set("data", {superman: "Clark Kent", power: 100 });');
  console.log('ls.get("data");', ls.get('data'));

  console.log('\n%c******** TTL set to 5 secs ********', 'background: #000; color: #e5e829');
  console.log('ls.set("data", {superman: "Clark Kent", power: 100 }, { ttl: 5 });');
  console.log('ls.get("data");', ls.get('data'), '(Within 5 secs)');
  console.log('ls.get("data");', null, '(After 5 seconds)');

  console.log('\n%c******** Default encryption/obfuscation ********', 'background: #000; color: #e5e829');
  ls.set('data', data, { encrypt: true });
  console.log('ls.set("data", {superman: "Clark Kent", power: 100 }, { encrypt: true }); => ', ls.get('data'));
  console.log('ls.get("data", { decrypt: true });', ls.get('data', { decrypt: true }));

  console.log(
    '\n%c******** Default encryption/obfuscation, custom secret ********',
    'background: #000; color: #e5e829'
  );
  ls.set('data', data, { encrypt: true, secret: 89 });
  console.log(
    'ls.set("data", {superman: "Clark Kent", power: 100 }, { encrypt: true, secret: 89 }); => ',
    ls.get('data')
  );
  console.log('ls.get("data", { decrypt: true , secret: 89});', ls.get('data', { decrypt: true, secret: 89 }));

  console.log(
    '\n%c******** Encryption via CryptoJS (requires updating encrypter()/decrypter() as per docs) ********',
    'background: grey; color: orange'
  );

  console.log('\n%c******** Encryption algorithm - Rabbit ********', 'background: #000; color: #e5e829');
  ls.set('data', data, { encrypt: true, secret: 'passphrase' });
  console.log('ls.set("data", {superman: "Clark Kent", power: 100 }, { encrypt: true, secret: "passphrase" }); ');
  console.log('localStorage.getItem("data") => ', localStorage.getItem('data'));
  console.log(
    'ls.get("data", { decrypt: true , secret: "passphrase"});',
    ls.get('data', { decrypt: true, secret: 'passphrase' })
  );

  console.log('-------------------------------------------------------');
};

// screenshotable();

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
