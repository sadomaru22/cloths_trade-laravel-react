import { DocumentBase } from "models";

export type TradePost = {
   user_id: number;
   title: string;
   date: Date;
   sankasya: number;  //default0
   maxCapa: number;
   place: string;
   description: string;
   photos: string;   //一旦追加、後で消すと思う 7/12
} & DocumentBase;    //idやcreateAtなどの共通項目はここにまとめてある