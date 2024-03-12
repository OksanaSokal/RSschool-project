export interface ElementParam {
  tag: string;
  className: string[];
  text?: string;
  callback?: () => void | null;
}
