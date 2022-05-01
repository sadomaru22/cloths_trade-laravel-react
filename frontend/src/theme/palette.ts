import { PaletteOptions } from '@material-ui/core/styles/createPalette';

//関数内での記述ではない場合そのままでは補完機能が働かなくなるが、TypeScriptの型を指定することで問題なく動作する。
const palette: PaletteOptions = {
  primary: {
    light: '#e0fffa',
    main: '#40cbb5',
    contrastText: '#fff',
  },
  secondary: {
    main: '#ffa133',
    contrastText: '#fff',
  },
  // light, dark値の算出 0に近いほど main値に近付く (0-1)
  tonalOffset: 0.025,
};

export default palette;