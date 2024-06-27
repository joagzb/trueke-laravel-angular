import {getUserResponse} from "./user.js";

export enum Room {
  LIVING_ROOM = 'living room',
  KITCHEN = 'kitchen',
  BEDROOM = 'bedroom',
  GARAGE = 'garage',
  CORRIDOR = 'corridor',
  COWORKING_SPACE = 'coworking space',
  BBQ = 'bbq',
  LAUNDRY = 'laundry',
  GARDEN = 'garden',
}

export type IPiece = {
  id: string;
  post_id?: number | null; //where is the piece being published
  user: getUserResponse;
  title: string;
  description: string;
  material?: string | null;
  brand?: string | null;
  price?: string | null;
  room?: string;
  imageURL: string;
  created_at: Date;
  updated_at?: Date | null;
};

export type NewPieceRequest = Omit<IPiece, 'id' | 'created_at' | 'updated_at' | 'post_id' | 'user'>;
export type patchPieceRequest = Omit<Partial<IPiece>, 'id' | 'user' | 'post_id' | 'created_at' | 'updated_at'>;
