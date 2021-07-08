/*
 * https://github.com/niketpathak/encrypt-localstorage
 * Copyright (c) 2021 Niket Pathak
 * MIT License
 */

import ls from 'localstorage-slim';
import AES from 'crypto-js/aes';
import encUTF8 from 'crypto-js/enc-utf8';

ls.config.encrypter = (data: unknown, secret: string) => AES.encrypt(JSON.stringify(data), secret).toString();
ls.config.decrypter = (data: unknown, secret: string) =>
  JSON.parse(AES.decrypt(data as string, secret).toString(encUTF8));

ls.config.encrypt = true;
ls.config.secret = 'secret-string';

ls.set('number', 25865);
ls.set('text', 'hello world');
ls.set('important-token', { ching: 'faa', rabbi: { rabbit: 'animal' } }, { ttl: 10 });

console.log('ls.get("number") :>> ', ls.get('number'));
console.log('ls.get("text") :>> ', ls.get('text'));
console.log('ls.get("important-token") :>> ', ls.get('important-token'));

export const app = {};
