//import { generateRandomString } from '.';

import { generateRandomString } from "./generateRandomString";

/*
作成された文字列をもとにドメインと組み合わせてメール作成
*/

export const makeEmail = () => {
  const username = generateRandomString() + generateRandomString();
  const domain = 'example.com';
  const email = username + '@' + domain;
  return email;
};