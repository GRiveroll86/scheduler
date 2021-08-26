let currentTime = moment();
console.log('currentTime', currentTime);
$("#currentDay").text(currentTime.format("dddd, MMMM Do, YYYY"))
