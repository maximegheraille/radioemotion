export interface emission {
  id: number;
  nom: string;
  start: string;
  end: string;
  animateur_nom: string;
  photo: string;
  livecam: 0 | 1;
  is_live: boolean;
}

export interface AllEmission {
  id: number;
  jour_id: number;
  jour: string;
  start_time: string;
  end_time: string;
  equipe_nom: string;
  emission_name: string;
  emission_description: string;
  photo: string;
}
