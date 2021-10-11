export interface IAuth {
  status: string;
  token: string | null;
  errorMessage: string;
  username: string | null;
  name: string | null;
}
