import React, {
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import supabase, { supabaseAdmin } from "./supabase";
import { AdminUserAttributes, User } from "@supabase/supabase-js";
import {
  AdminProps,
  AdminResponse,
  ISignInAuth,
  ISignUpAuth,
  UserListProps,
  UserListResponse,
} from "./api-types";
import { toast } from "react-toastify";

interface ContextProps {
  profile: User | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;

  signUp: ({ email, password }: ISignUpAuth) => Promise<void>;
  signIn: ({ email, password }: ISignInAuth) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;

  updateAdminUser: ({}: AdminProps) => AdminResponse;
  deleteAdminUser: ({}: { id: User["id"] }) => AdminResponse;
  createAdminUser: ({}: AdminUserAttributes) => AdminResponse;
  getAdminUserList: ({
    page,
    perPage,
  }: UserListProps) => Promise<UserListResponse>;
  retrieveUser: ({}: { id: User["id"] }) => Promise<User>;
}

interface AuthProviderProps {
  children: ReactNode;
}

// eslint-disable-next-line no-underscore-dangle
const _noop = async () => {
  throw new Error("Not loaded");
};

const Context = React.createContext<ContextProps>({
  isAuthenticated: false,
  profile: null,
  isAuthLoading: true,

  signUp: _noop,
  signIn: _noop,
  signOut: _noop,
  updateUser: _noop,

  createAdminUser: _noop,
  deleteAdminUser: _noop,
  getAdminUserList: _noop,
  updateAdminUser: _noop,
  retrieveUser: _noop,
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [profile, setProfile] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasInitialCheck, setInitialCheck] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Admin functionality

  const updateAdminUser = async ({ id: userId, ...userInfo }: AdminProps) => {
    const { data, error } = await supabaseAdmin.updateUserById(userId, {
      ...userInfo,
    });

    if (error) {
      toast.error(error.message);
      throw new Error(error.message);
    }

    return data;
  };

  const deleteAdminUser = async ({ id }: { id: User["id"] }) => {
    const { data, error } = await supabaseAdmin.deleteUser(id);
    if (error) {
      toast.error(error.message);
      throw new Error(error.message);
    }
    return data;
  };

  const createAdminUser = async ({
    email,
    user_metadata,
    password,
  }: AdminUserAttributes) => {
    const { data, error } = await supabaseAdmin.createUser({
      email,
      email_confirm: true,
      phone_confirm: true,
      password,
      user_metadata,
    });

    if (error) {
      toast.error(error.message);
      throw new Error(error.message);
    }

    return data;
  };

  const retrieveUser = async ({ id }: { id: User["id"] }) => {
    const { data, error } = await supabaseAdmin.getUserById(id);
    if (error) {
      toast.error(error.message);
      throw new Error(error.message);
    }
    return data.user;
  };

  const getAdminUserList = async ({
    page,
    perPage = 50,
  }: UserListProps): Promise<UserListResponse> => {
    const { data, error } = await supabaseAdmin.listUsers({
      page,
      perPage,
    });

    if (error) {
      toast.error(error.message);
      return { users: [], total: 0, aud: "", lastPage: 0, nextPage: 0 };
    }
    const { users, total, aud, lastPage, nextPage } = data;
    return {
      users,
      total,
      aud,
      lastPage,
      nextPage,
    };
  };

  // End of Admin functionllity

  const _getCurrentSession = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      setProfile(user);
      setIsAuthenticated(true);
    } else {
      setProfile(null);
      setIsAuthenticated(false);
    }
    setIsAuthLoading(false);
  };

  const signUp = async ({ email, password }: ISignUpAuth) => {
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          is_admin: false,
          name: "",
        },
      },
    });

    if (error) {
      toast.error(error.message);
    }
    if (!error && data) {
      toast.success(
        "User created successfully. Please check your email for the confirmation link."
      );
    }
    await _getCurrentSession();
  };
  const signIn = async ({ email, password }: ISignInAuth) => {
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      toast.error(error.message);
    }
    if (!error && data) {
      toast.success("User logged in successfully");
    }
    await _getCurrentSession();
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
    setIsAuthenticated(false);
  };

  const updateUser = async (data: Partial<User>) => {
    const { error } = await supabase.auth.updateUser(data);

    if (error) {
      toast.error(error.message);
      throw new Error(error.message);
    } else {
      toast.success("User updated successfully");
    }
    await _getCurrentSession();
  };

  const refreshSession = async () => {
    setInitialCheck(true);
    await _getCurrentSession();
  };

  useEffect(() => {
    refreshSession();
  }, []);

  useEffect(() => {
    if (!hasInitialCheck) return;
  }, [hasInitialCheck, profile]);

  const value = useMemo<ContextProps>(
    () => ({
      profile,
      isAuthenticated,
      isAuthLoading,

      signUp,
      signIn,
      signOut,
      updateUser,

      createAdminUser,
      deleteAdminUser,
      getAdminUserList,
      updateAdminUser,
      retrieveUser,
    }),
    [profile, isAuthenticated, hasInitialCheck, isAuthLoading]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

/**
 * Return full auth context
 */
const useAuth = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("useAuth() can only be used within AuthProvider");
  }

  return context;
};
export default useAuth;
