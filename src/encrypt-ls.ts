/*
 * https://github.com/niketpathak/encrypt-localstorage
 * Copyright (c) 2021 Niket Pathak
 * MIT License
 */

import { isObject, NOOP } from './helpers';
import ls from 'localstorage-slim';
import sha256 from 'crypto-js/sha256';

export const app = {};
