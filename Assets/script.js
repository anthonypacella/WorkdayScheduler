let timeEl = $(".timeEl");
let textEl = $(".textEl");
let saveBtnEl = $(".saveBtn");

const hourNow = moment().hour();
const dayNow = moment().format('dddd') + ", " + moment().format('MMMM Do');

$('#currentDay').text(dayNow);

for (let i = 0; i < textEl.length; i++) {
    if (hourNow > 2){
        textEl.eq(i).addClass("past");
    }
    else if (hourNow < 4) {
        textEl.eq(i).addClass("future");
    }
    else {
        textEl.eq(i).addClass("present");
    }

}

//print saved tasked from Local Storage
let savedTasksList = JSON.parse(localStorage.getItem("savedTasksList"));
console.log(savedTasksList);

if (savedTasksList !== null) {
    for (let i = 0; i < savedTasksList.length; i++) {
        const timeVal = savedTasksList[i].time.slice(0,-5);
        textEl.eq(timeVal-9).text = savedTasksList[i].task;
        let taskTextArea = $(`#${timeVal}`);
        taskTextArea.val(savedTasksList[i].task);
    }
}



//event listener for saving task
saveBtnEl.on('click', saveFunction);

///function to save task to local storage and print
function saveFunction(event) {
    console.log("Hello");

    let savedTasksList = JSON.parse(localStorage.getItem("savedTasksList"));

    let target = $(event.target);

    let eventDescToSave = target.parent().siblings('.textEl').val();
    let eventTimeToSave = target.parent().siblings('.timeEl').text();

    if (savedTasksList === null) {

        console.log("Local storage empty");

        let newTaskObj = [{
            time: eventTimeToSave,
            task: eventDescToSave
        }];
        localStorage.setItem("savedTasksList", JSON.stringify(newTaskObj));
        console.log(newTaskObj);
    }

    else {

        let oldSavedTasksList = JSON.parse(localStorage.getItem("savedTasksList")) || [];
        let newTaskObj = {
            time: eventTimeToSave,
            task: eventDescToSave
        };

        console.log(oldSavedTasksList);

        oldSavedTasksList.push(newTaskObj);
        localStorage.setItem("savedTasksList", JSON.stringify(oldSavedTasksList));
    }
    
}