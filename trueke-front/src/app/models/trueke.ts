import {IOffer} from "./offer.js";
import {IPost} from "./post.js";

export type ITrueke = {
  id: string;
  user_id: number;
  offer: IOffer;
  post: IPost;
  status: string;
  expireDate: Date;
  isActive: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export type NewTruekeRequest = Pick<ITrueke, 'user_id' | 'status' | 'expireDate'> & {
  offer_id: string;
}

export type patchTruekeRequest = Omit<Partial<ITrueke>, 'id' | 'post' | 'offer' | 'created_at' | 'updated_at'> & {
  offer_id: string;
  user_id: string;
}
