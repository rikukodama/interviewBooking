export function convertTo24Hour(timeString: string): string {
  if (!timeString) {
    return "";
  }

  let hours = Number(timeString.split(":")[0]);
  const minutes = Number(timeString.split(":")[1]);

  if (timeString.toLowerCase().indexOf("pm") >= 0 && hours < 12) {
    hours += 12;
  }
  if (timeString.toLowerCase().indexOf("am") >= 0 && hours === 12) {
    hours -= 12;
  }

  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  return `${formattedHours}:${formattedMinutes}`;
}


export const convertDateFormat = (dateString: any)=> {
  // Create a new date object from the input string
  const date = new Date(dateString);

  // Extract year, month, and day from the date object
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  // Return the formatted date string in "yyyy-mm-dd" format
  return `${year}-${month}-${day}`;
};


export const getCurrentTime = (): string => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const compareTimes = (time1: string, time2: string,duration:any) => {
  const [hours1, minutes1] = time1.split(':').map(Number);
  const [hours2, minutes2] = time2.split(':').map(Number);

  if (hours1 === hours2) {
    // If the hours are the same, compare the minutes
    if (minutes1 - minutes2 >= duration) {
      return -1; // time1 is earlier
    } else if (minutes2 - minutes1 <= 10 ) {
      return 1; // time1 is later
    } else if(minutes2 - minutes1 > 10){
      return 0; // times are equal
    }
  } else {
    // If the hours are different, compare the hours
    if (hours1 < hours2) {
      return 0; // time1 is earlier
    } else {
      return -1; // time1 is later
    }
  }
};


export const getTimeDifference = (time1: string, time2: string): number => {
  const [hours1, minutes1] = time1.split(':').map(Number);
  const [hours2, minutes2] = time2.split(':').map(Number);

  // Convert both times to minutes
  const totalMinutes1 = hours1 * 60 + minutes1;
  const totalMinutes2 = hours2 * 60 + minutes2;

  // Calculate the time difference in minutes
  const differenceInMinutes = totalMinutes2 - totalMinutes1;

  return differenceInMinutes;
};


export const compareDates = (date1: string, date2: string): number => {
  // Convert the input dates into JavaScript Date objects
  const jsDate1 = new Date(date1);
  const jsDate2 = new Date(date2);

  // Compare the two Date objects
  if (jsDate1 < jsDate2) {
    return 1; // date1 is earlier than date2
  } else if (jsDate1 > jsDate2) {
    return -1; // date1 is later than date2
  } else {
    return 0; // date1 is equal to date2
  }
};