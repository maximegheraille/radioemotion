export interface Song {
  id: number;
  titre: string;
  artiste: string;
  photo: string;
  youtube?: string;
  apple_music?: string;
  voted?: boolean;
  votes?: number;
  heure?: number | string;
  min?: string;
}
