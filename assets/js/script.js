let savedText = [
    { "row": 1, "text": "", "saved": false },
    { "row": 2, "text": "", "saved": false },
    { "row": 3, "text": "", "saved": false },
    { "row": 4, "text": "", "saved": false },
    { "row": 5, "text": "", "saved": false },
    { "row": 6, "text": "", "saved": false },
    { "row": 7, "text": "", "saved": false },
    { "row": 8, "text": "", "saved": false },
    { "row": 9, "text": "", "saved": false },
];

function showCurrentDate() {
    let currentDate = moment().format("dddd, MMMM Do, YYYY");
    $("#currentDay").text(currentDate)
}

function showCurrentTime() {
    let currentTime = moment().format("h:mm A");
    $("#currentTime").text(currentTime)
}

function setBgColor() {
    let currentHour = moment().format("H");
    let currentHourNum = parseInt(currentHour)
    $(".time-block").addClass("past");
    $("#hourBlock" + currentHourNum).addClass("present");
    // if it's earlier than 8AM, give future class to every timeblock
    if (currentHourNum < 8) {
        for (let i = 0; i < 9; i++) {
            $("#hourBlock" + (i + 9)).addClass("future");
        }
        // if it's at least 8AM, add future class to every timeblock beyond the current time
    } else {
        for (let i = 0; i < 9; i++) {
            currentHourNum += 1;
            $("#hourBlock" + currentHourNum).addClass("future");
        }
    }
}


function setLocalStorage() {
    if (!localStorage.getItem("savedInfo")) return;
    let text = JSON.parse(localStorage.getItem("savedInfo"))
    savedText = text;
    generateSavedText();
}

function generateSavedText() {
    for (let i = 0; i < 9; i++) {
        if (!savedText[i].saved) {

        } else {
            let hourBlockText = i + 9;
            $("#hourBlock" + hourBlockText).text(savedText[i].text)
            if (savedText[i].saved === true) {
                let saveBtn = i + 9;
                $("#saveBtn" + saveBtn).text("Saved")
                $("#saveBtn" + saveBtn).addClass("saved")
                $("#saveBtn" + saveBtn).prev().prop("readonly", true)
                $("#saveBtn" + saveBtn).prev().prev().addClass("saved")
            }
        }
    }
}

$(".saveBtn").click(function () {

    // identifies which row's save button is clicked, identifies index in savedText array to change
    let index = $(this).parent().index();

    if (!$(this).hasClass("saved")) {

        // if save button is not set to save, set to save
        // save text entered and state of save button in local storage, add classes for styling and functionality
        savedText[index].text = ($(this).prev().val());
        savedText[index].saved = true;

        $(this).addClass("saved");
        $(this).prev().prev().addClass("saved");
        $(this).text("Saved");
        $(this).prev().prop("readonly", true)

        localStorage.setItem("savedInfo", JSON.stringify(savedText))

    } else {

        // if save button is set to save, set to unsaved
        // clear text entered and state of save button, save in local storage, add classes for styling and functionality
        savedText[index].text = "";
        savedText[index].saved = false;

        $(this).removeClass("saved");
        $(this).prev().prev().removeClass("saved");
        $(this).text("Click to save");
        $(this).prev().prop("readonly", false)

        localStorage.setItem("savedInfo", JSON.stringify(savedText))

    }
})

showCurrentDate();
showCurrentTime();
setBgColor();
setLocalStorage();