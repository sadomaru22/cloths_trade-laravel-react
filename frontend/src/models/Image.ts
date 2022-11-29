import { DocumentBase } from 'models';

export type Image = {
  trade_post_id: string;
  file_name: string;
} & DocumentBase;
