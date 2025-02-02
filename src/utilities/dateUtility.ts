import { format, isDate, parseISO } from "date-fns";

function getDate(dateString: string) {
  return parseISO(dateString);
}

function getDateAddDays(date: Date, days: number): Date {
  const newDate = new Date(date.getTime());
  newDate.setDate(date.getDate() + days);
  return newDate;
}

function getDateString(date: Date | undefined): string {
  if (!date) {
    return "";
  }
  if (!isDate(date)) {
    return "";
  }
  return format(date, "yyyy/MM/dd");
}

function getDateTimeString(date: Date | undefined): string {
  if (!date) {
    return "";
  }
  if (!isDate(date)) {
    return "";
  }
  return format(date, "yyyy/MM/dd HH:mm");
}

function getFileDateString(date: Date | undefined): string {
  if (!date) {
    return "";
  }
  if (!isDate(date)) {
    return "";
  }
  return format(date, "yyyy-MM-dd");
}

function getYearMonthString(date: Date | undefined): string {
  if (!date) {
    return "";
  }
  if (!isDate(date)) {
    return "";
  }
  return format(date, "yyyy/MM");
}

function getDateNow(): Date {
  return new Date(format(new Date(), "yyyy/MM/dd HH:mm"));
}

function getDateNowYearMonthDay(): Date {
  return new Date(format(new Date(), "yyyy/MM/dd"));
}

function dropSeconds(date: Date): Date {
  return new Date(format(date, "yyyy/MM/dd HH:mm"));
}

function dropMinutes(date: Date): Date {
  return new Date(format(date, "yyyy/MM/dd HH:00"));
}

function dropHours(date: Date): Date {
  return new Date(format(date, "yyyy/MM/dd"));
}

const dateUtility = {
  getDate,
  getDateAddDays,
  getDateString,
  getDateTimeString,
  getFileDateString,
  getYearMonthString,
  getDateNow,
  getDateNowYearMonthDay,
  dropSeconds,
  dropMinutes,
  dropHours,
};

export default dateUtility;
