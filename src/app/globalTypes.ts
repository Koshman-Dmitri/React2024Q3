export type SearchParams = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export interface Props {
  query: string;
  page: number;
  details?: string;
}
