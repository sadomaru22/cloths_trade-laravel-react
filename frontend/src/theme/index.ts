import { createTheme } from '@material-ui/core/styles';

import palette from './palette';
import typography from './typography';
import overrides from './overrides';

//元からMUIに用意されている。別ファイルで設定を書くことで配色をページによってカスタマイズできる。
const theme = createTheme({
  palette,
  typography,
  overrides,
});

export default theme;