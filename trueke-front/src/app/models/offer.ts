import {IPiece} from "./piece.js";
import {IPost} from "./post.js";
import {getUserResponse} from "./user.js";

export type IOffer = {
  id: string;
  user: getUserResponse;
  post: IPost;
  pieces: Omit<IPiece, 'user'>[];
  message: string;
  isSelected?: boolean;
  isLiked?: boolean;
  created_at?: Date;
  updated_at?: Date;
};

export type newOfferRequest = Omit<IOffer, 'created_at' | 'updated_at' | 'pieces' | 'user' | 'post' | 'id'> & {
  pieces: string[];
  post_id: string;
};

export type patchOfferRequest = Partial<newOfferRequest>;
