
const date = new Date().toUTCString();
const dateArray = date.split(',');
  
const doIt = (date, dateArray) => dateArray[0];
  
doIt(date, dateArray);
