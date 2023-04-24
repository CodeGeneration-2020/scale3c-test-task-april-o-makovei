import { User } from "@supabase/supabase-js";
import { isValid } from "date-fns";

export const sorterForArray = <T extends Record<string, any>>(
  data: T[],
  order: string
): T[] => {
  const [orderKey, orderDirection] = order.split(".");

  if (!orderDirection) return data;
  // Helper function to compare strings alphabetically
  const compareStrings = (a: string, b: string) => {
    const comparison = a.localeCompare(b);
    return orderDirection === "asc" ? comparison : -comparison;
  };

  const compareBoolean = (a: boolean, b: boolean) => {
    const comparison = a === b ? 0 : a ? 1 : -1;
    return orderDirection === "asc" ? comparison : -comparison;
  };

  // Helper function to compare dates
  const compareDates = (a: string, b: string) => {
    if (!isValid(new Date(a) || !isValid(new Date(b)))) return -0;

    const dateA = new Date(a);
    const dateB = new Date(b);
    if (orderDirection && orderDirection === "asc") {
      return dateA.getTime() - dateB.getTime();
    }
    if (orderDirection && orderDirection === "desc") {
      return dateB.getTime() - dateA.getTime();
    }
    return 0;
  };

  return data.sort((a, b) => {
    switch (orderKey) {
      case "email":
        return compareStrings(a.email, b.email);
      case "role":
        return compareBoolean(
          a.user_metadata.is_admin,
          b.user_metadata.is_admin
        );
      case "updated_at":
        return compareDates(a.updated_at, b.updated_at);
      case "name":
        return compareDates(a.user_metadata.name, b.user_metadata.name);
      case "email_confirmed_at":
        return compareDates(a.email_confirmed_at, b.email_confirmed_at);
      default:
        return 0;
    }
  });
};

export const filterArrayByString = (array: User[], filter: string) => {
  if (!filter) {
    return array;
  }
  return array.filter((item) => {
    const { email, user_metadata } = item;
    const { name, is_admin } = user_metadata;
    return email?.toLowerCase().includes(filter.toLowerCase()) ||
      name.toLowerCase().includes(filter.toLowerCase()) ||
      is_admin
      ? "Admin"
      : "User".toLowerCase().includes(filter.toLowerCase());
  });
};
