/**
 * Interface for Report
 */
export interface Report {
  name: string;
  data: Data[];
  _total: number;
}

/**
 * Interface for Data
 */
export interface Data {
  label: string;
  value: number;
}
