import { InvalidRequest } from '.';  //型

/*
エラーメッセージを状況に応じて可変で作成
*/

export const makeErrorMessageFrom = (error: InvalidRequest) => {
  const concatenateErrorsWithLineBreaks = (message: string, errors: string[]) =>
    message + errors.join('\n') + '\n';

  return Object.values(error.response.data.errors).reduce(
    concatenateErrorsWithLineBreaks,
    ''
  );
};