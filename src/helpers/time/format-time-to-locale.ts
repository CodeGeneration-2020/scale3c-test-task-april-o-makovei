import { format, isValid } from "date-fns";

export const formatTimeToLocale = (time?: string) =>
  time && isValid(new Date(time))
    ? format(new Date(time), "dd.MM.yyyy HH:mm")
    : "";
