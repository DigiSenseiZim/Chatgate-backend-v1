const { v4: uuidv4 } = require('uuid');

function getFormattedTimestamp() {
    const date = new Date();

    // Extract date components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');

    // Extract time components
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

    // Format timezone offset
    const timezoneOffset = -date.getTimezoneOffset();
    const sign = timezoneOffset >= 0 ? "+" : "-";
    const offsetHours = String(Math.floor(Math.abs(timezoneOffset) / 60)).padStart(2, '0');
    const offsetMinutes = String(Math.abs(timezoneOffset) % 60).padStart(2, '0');

    // Combine all parts into the desired format
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}${sign}${offsetHours}:${offsetMinutes}`;
}

function getUuid(){
    return uuidv4();
}

module.exports = { getFormattedTimestamp, getUuid };


