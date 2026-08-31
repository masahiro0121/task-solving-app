export type Issue = {
  id: number;
  summary: string;
  description: string;
  status: string;
};

export type User = {
  username: string;
  authority: string;
};

export type UserForm = {
  username: string;
  password?: string;
  authority: string;
};
