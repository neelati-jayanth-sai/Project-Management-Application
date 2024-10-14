// dateUtils.js


export function formatISODate(isoDateString) {
    // Convert the ISO string into a Date object
    const date = new Date(isoDateString);
  
    // Format the date and time
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true // Change to false for 24-hour format
    });
  }
  