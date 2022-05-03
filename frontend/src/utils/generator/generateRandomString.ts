/*
char(結合された文字列)からランダムに12文字の文字列を作成するメソッド。
*/


export const generateRandomString = (length?: number) => {
   const alphabet = {
     uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
     lowercase: 'abcdefghijklmnopqrstuvwxyz',
   };
   const decimal = '0123456789';
   const chars = alphabet.uppercase + alphabet.lowercase + decimal;
 
   const num = length || 12;
   let result = '';
   for (let i = 0; i < num; i++) {
     result += chars.charAt(Math.floor(Math.random() * chars.length));
   }
   return result;
 };