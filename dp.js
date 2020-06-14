$(document).ready(function() {
    let currentDate = moment().format('MMMM Do YYYY');

    let currentDay = moment().format('dddd'); // for showing day of week.

    // function displayTime() {
    //     document.getElementById("currentDay").innerHTML = currentTime
    // }
    // setInterval(displayTime, 1000)
    // displayTime()

    function displayDate() {
        //   document.getElementById("currentDay").innerHTML = currentDate;
        $('#currentDay').html(currentDay + ', ' + currentDate);
    };
    let m1;

    function getTimeInHours() {
        m1 = moment();
        console.log('MOMENT1', m1.fromNow());

        console.log('MOMENT2', m1.hour());

    }
    const timeSlots = [{ slot: '08', activity: 'hour 08 activity' },
        { slot: '09', activity: 'hour 09 activity' },
        { slot: '10', activity: 'hour 10 activity' },
        { slot: '11', activity: 'hour 11 activity' },
        { slot: '12 ', activity: 'Lunch And Siesta' },
        { slot: '13', activity: 'hour 13 activity' },
        { slot: '14', activity: 'hour 14 activity' },
        { slot: '15', activity: 'hour 15 activity' },
        { slot: '16', activity: 'hour 16 activity' },
        { slot: '17', activity: 'hour 17 activity' },
    ];

    function createATimeBlock(timeSlot, activity) {
        var newDiv = $("<div>");
        newDiv.attr("class", "row time-block");
        //newDiv.text("Trial And Error");

        var timeSlotCol = $("<div>");
        timeSlotCol.attr("class", "col-md-2 hour");
        timeSlotCol.text(timeSlot)
        newDiv.append(timeSlotCol);
        var activityCol = $("<div>");
        //activityCol.attr("class", "col-md-8");
        activityCol.text(activity);
        console.log('HOUR', m1.hour());
        if (m1.hour() < parseInt(timeSlot)) {
            activityCol.attr("class", "col-md-8 future");
        } else if (m1.hour() >= (parseInt(timeSlot) + 1)) {

            activityCol.attr("class", "col-md-8 past");
        } else if (m1.hour() == (parseInt(timeSlot))) {
            console.log('PRESENT1:', m1.hour(), timeSlot, (parseInt(timeSlot) + 1));
            activityCol.attr("class", "col-md-8 present");
        }
        var saveCol = $("<div>");
        saveCol.attr("class", "col-md-2");
        saveCol.text("save");
        newDiv.append(timeSlotCol);
        newDiv.append(activityCol);
        newDiv.append(saveCol);
        $("#container").append(newDiv);
        console.log(newDiv);
        $(".container").append(newDiv);
    }
    // setInterval(displayTime, 1000);
    // displayTime();

    displayDate();
    getTimeInHours();

    for (let i = 0; i < timeSlots.length; i++) {
        createATimeBlock(timeSlots[i].slot, timeSlots[i].activity);
    }
});