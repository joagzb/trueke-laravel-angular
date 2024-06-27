import {IOffer} from "./offer.js";
import {IPiece} from "./piece.js";
import {getUserResponse} from "./user.js";

export type IPost = {
  id: string;
  user: getUserResponse;
  pieces: Omit<IPiece, 'user'>[];
  offers: Omit<IOffer, 'post'>[];
  title: string;
  description: string;
  isActive?: boolean;
  created_at?: Date;
  updated_at?: Date;
};

export type NewPostRequest = Omit<IPost, 'id' | 'pieces' | 'user'|'offers' | 'created_at' | 'updated_at'> & {
  pieces: string[];
};

export type patchPostRequest = Partial<NewPostRequest>;
