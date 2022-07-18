const pathNames = ['users', 'trade_posts'] as const;

/* `pathName`と`id`(省略可,オプショナル)との組み合わせ */
type PathSet = [pathName: typeof pathNames[number], id?: string];

/** `PathSet`の配列(可変長)を連結してパスを作成 */
export const makePath = (...props: PathSet[]) => {
  const reducer = (acc: string, current: typeof props[0]) => {  
    const pathName = current[0];
    const id = current[1];
    return acc + `/${pathName}` + (id ? `/${id}` : '');
  };
  const path = props.reduce(reducer, '');  //←初期値は空
  return path;
};