import { PostgrestResponse } from "@supabase/supabase-js";
import { ITables } from "./api-types";
import supabase from "./supabase";
import {
  PostgrestFilterBuilder,
  PostgrestQueryBuilder,
} from "@supabase/postgrest-js";

export interface ISupabaseFetcher {
  from: keyof ITables;
  select?: [string];
  filter?: Record<string, any>;
}

const SupabaseFetcher = async <T = any>({
  from,
  select = ["*"],
  filter,
}: ISupabaseFetcher): Promise<T> => {
  if (!from) {
    throw new Error("From is not provided");
  }

  const formatedSelect = select.join(",");
  let query = supabase.from(from).select(formatedSelect);

  if (filter) {
    Object.keys(filter).forEach((key) => {
      query = query.eq(key, filter[key]);
    });
  }

  const res = await query;

  return res.data as T;
};

export default SupabaseFetcher;

export interface ISupabaseMutator {
  from: string;
  select?: string[];
  method: "select" | "insert" | "update" | "delete";
  filter?: (query: any) => any;
  values?: any;
}

export const SupabaseMutator = async <T = any>({
  from,
  select = ["*"],
  method,
  filter,
  values,
}: ISupabaseMutator): Promise<PostgrestResponse<T>> => {
  if (!from) {
    throw new Error("From is not provided");
  }

  const formattedSelect = select.join(",");
  let query: any = supabase.from(from);

  switch (method) {
    case "select":
      query = query.select(formattedSelect);
      if (filter) {
        query = filter(query);
      }
      break;
    case "insert":
      if (!values) {
        throw new Error("Values are not provided for insert operation");
      }
      query = query.insert(values).select(formattedSelect);
      break;
    case "update":
      if (!values) {
        throw new Error("Values are not provided for update operation");
      }
      query = query.update(values).select(formattedSelect);
      if (filter) {
        query = filter(query);
      }
      break;
    case "delete":
      query = query.delete().select(formattedSelect);
      if (filter) {
        query = filter(query);
      }
      break;
    default:
      throw new Error("Invalid method");
  }

  const res: PostgrestResponse<T> = await query;

  if (res.error) {
    throw new Error(res.error.message);
  }

  return res;
};
