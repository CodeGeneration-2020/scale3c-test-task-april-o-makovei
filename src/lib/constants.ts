export const REDIRECT_QUERY = "redirectUrl";

const requireEnv = (name: string, value?: string, def?: string) => {
  if (!value && !def) {
    throw new Error(
      `${name} is required in environment variables, but was not provided`
    );
  }

  return (value || def) as string;
};

export const NEXT_PUBLIC_SUPABASE_URL = requireEnv(
  "NEXT_PUBLIC_SUPABASE_URL",
  process.env.NEXT_PUBLIC_SUPABASE_URL
);

export const NEXT_PUBLIC_SUPABASE_KEY = requireEnv(
  "NEXT_PUBLIC_SUPABASE_KEY",
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);

export const NEXT_PUBLIC_SUPABASE_ADMIN = requireEnv(
  "NEXT_PUBLIC_SUPABASE_ADMIN",
  process.env.NEXT_PUBLIC_SUPABASE_ADMIN
);

export const MONTH_MAP = {
  "0": "January",
  "1": "February",
  "2": "March",
  "3": "April",
  "4": "May",
  "5": "June",
  "6": "July",
  "7": "August",
  "8": "September",
  "9": "October",
  "10": "November",
  "11": "December",
} as const;
