export interface Song {
  id: number;
  titre: string;
  artiste: string;
  photo: string | number;
  youtube?: string;
  apple_music?: string;
  voted?: boolean;
  votes?: number;
  heure?: number | string;
  min?: string;
  position?: number;
  best_position?: string;
  evolution_position?: number;
  weeks?: string;
  annee?: string;
}

export interface Song_playlist extends Song {
  min?: string;
  position?: number;
}
