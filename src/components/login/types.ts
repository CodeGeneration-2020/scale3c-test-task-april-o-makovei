export interface ILoginForm {
  email: string;
  password: string;
}

export interface IRegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
}

export type ISignForm<T extends boolean> = T extends true
  ? ILoginForm
  : IRegisterForm;
