export interface Info {
  id: number;
  title: string;
  preview: string;
  full_text: string;
  start_date: string;
  commune: string;
  photo: string;
}

export interface InfoPaginated extends Info {
  hasMore: boolean | number;
  max_page: number;
}
