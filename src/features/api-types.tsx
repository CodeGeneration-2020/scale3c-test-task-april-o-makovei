import {
  AdminUserAttributes,
  AuthError,
  Pagination,
  User,
  UserResponse,
} from "@supabase/supabase-js";

export interface ITables {
  users: "users";
  account: "account";
}

export type AdminResponse = Promise<UserResponse["data"]>;
export type AdminProps = AdminUserAttributes & { id: User["id"] };
export type UserListResponse =
  | {
      users: User[];
      aud: string;
    } & Pagination;

export type UserListProps = {
  page?: number;
  perPage?: number;
};
// auth.tsx

export interface IProfile {
  session: {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    user: {
      id: string;
      aud: string;
      role: string;
      email: string;
      email_confirmed_at: string;
      phone: string;
      confirmation_sent_at: string;
      confirmed_at: string;
      last_sign_in_at: string;
      app_metadata: {
        provider: string;
        providers: string[];
      };
      user_metadata: Record<string, unknown>;
      identities: {
        id: string;
        user_id: string;
        identity_data: {
          email: string;
          sub: string;
        };
        provider: string;
        last_sign_in_at: string;
        created_at: string;
        updated_at: string;
      }[];
      created_at: string;
      updated_at: string;
    };
    expires_at: number;
  };
  user: {
    id: string;
    aud: string;
    role: string;
    email: string;
    email_confirmed_at: string;
    phone: string;
    confirmation_sent_at: string;
    confirmed_at: string;
    last_sign_in_at: string;
    app_metadata: {
      provider: string;
      providers: string[];
    };
    user_metadata: Record<string, unknown>;
    identities: {
      id: string;
      user_id: string;
      identity_data: {
        email: string;
        sub: string;
      };
      provider: string;
      last_sign_in_at: string;
      created_at: string;
      updated_at: string;
    }[];
    created_at: string;
    updated_at: string;
  };
}

export interface ISignUpAuth {
  email: string;
  password: string;
}

export interface ISignInAuth {
  email: string;
  password: string;
}

// Modal types

export interface EditUserModalState {
  email: IProfile["user"]["email"];
  id: IProfile["user"]["id"];
  is_admin: IProfile["user"]["user_metadata"]["is_admin"];
  name: IProfile["user"]["user_metadata"]["name"];
}
