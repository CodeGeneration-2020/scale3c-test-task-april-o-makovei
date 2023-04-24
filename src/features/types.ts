export interface ISupabaseReturnHook<T = string> {
  isLoading: boolean;
  error: any;
  data: T | [] | undefined;
}
