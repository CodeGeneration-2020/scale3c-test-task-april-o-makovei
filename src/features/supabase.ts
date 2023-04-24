import {
  NEXT_PUBLIC_SUPABASE_ADMIN,
  NEXT_PUBLIC_SUPABASE_KEY,
  NEXT_PUBLIC_SUPABASE_URL,
} from "@/lib/constants";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_KEY
);

const supabaseServiceClient = createClient(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ADMIN, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

export const supabaseAdmin = supabaseServiceClient.auth.admin

export default supabase;
