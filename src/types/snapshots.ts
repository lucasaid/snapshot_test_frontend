export interface Snapshot {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  user_id: number;
  top_image: string;
  front_image: string;
  notes: string;
}
export interface CreateSnapshot {
  name?: string;
  user_id: number;
  top_image: string;
  front_image: string;
  notes: string;
}
export interface UpdateSnapshot {
  id: number;
  top_image: string;
  front_image: string;
  notes: string;
}
