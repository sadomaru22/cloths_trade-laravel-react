import { DocumentBase } from 'models';

export type TradePost = {
  user_id: string;
  title: string;
  date: Date;
  sankasya: number; //default0
  maxCapa: number;
  place: string;
  description: string;
  thumbnail: string; //photosと共存しても大丈夫？  //createTradePostのRequestはPartialなのでとりあえず大丈夫。
  photos: File[]; //一旦追加、後で消すと思う 7/12
} & DocumentBase; //idやcreateAtなどの共通項目はここにまとめてある
