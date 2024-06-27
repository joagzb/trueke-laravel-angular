export class PostRequestFilters {
  sortBy: string;
  region?: string;
  date?: Date;
  room?: string;

  constructor() {
    this.sortBy = 'date'; // Default sort by date
  }
}
