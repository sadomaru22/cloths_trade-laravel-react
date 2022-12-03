import { DocumentBase } from 'models';

export type SankaFlags = {
  user_id: string;
  trade_post_id: string;
  pending_flag: number;
  confirmed_flag: number;
} & DocumentBase;
