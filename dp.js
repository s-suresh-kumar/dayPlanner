/*---------- code starts HERE */

$(document).ready(function () {
  // test flag, make it true for deugging testing and look at console logs
  const test = false;

  let currentDate = moment().format("MMMM Do YYYY");
  let currentDay = moment().format("dddd"); // for showing day of week.
  //for test purposes
  //currentDay = "Sunday";
  let weekendDay = false;
  if (currentDay == "Saturday" || currentDay == "Sunday") weekendDay = true;

  //Function that displays current day and date
  function displayDate() {
    $("#currentDay").html(currentDay + ", " + currentDate);
  }
  // Display the current day and date at the top of the page.
  displayDate();

  // Get current time (now) from moment API
  const now = moment().format("MMMM Do YYYY");

  // commented out for test in non-standard hours
  let nowHour24 = moment().format("H");
  let nowHour12 = moment().format("h");

  // set times for tesitng after hours

  if (test) {
    nowHour24 = 13;
    nowHour12 = 1;
  }
  //Restore from localStorage the stored plans and day on reload
  let storedPlans = JSON.parse(localStorage.getItem("storedPlans"));
  let storedDay = JSON.parse(localStorage.getItem("currentDay"));

  //Just for testing, debugging purposes
  if (test) {
    console.log(storedPlans);
  }

  // If plans were retrieved from localStorage, update the plan array to it
  //At the beginning of a new day, we want empty planTextArr, so do not update plan
  //array when currentDay is different from storedDay. Basically we do not want to look at
  //any prior day's schedule as today's!!
  if (storedPlans !== null && storedDay === currentDay) {
    planTextArr = storedPlans;
    if (test) {
      console.log("STORED PLANS NOT EQUAL TO NULL");
    }
  } else {
    // this should only occur on first time the app is loaded in the browser or when
    // app is loaded first time for the day.
    //Also remind user that lunch is important
    console.log("STORED PLANS ==EQUAL== TO NULL");
    localStorage.clear();
    planTextArr = new Array(9);
    switch (currentDay) {
      case "Monday":
      case "Tuesday":
      case "Wednesday":
      case "Thursday":
      case "Friday":
        planTextArr[4] = "Lunch and Siesta";
        break;
      case "Saturday":
      case "Sudnday":
        for (let i = 0; i < planTextArr.length; i++)
          planTextArr[i] = "Weekend Day, Enjoy Time Off!";
        break;
    }
  }
  if (test) {
    console.log("full array of plned text", planTextArr);
  }

  // set variable referencing planner element
  let $plannerDiv = $("#plannerContainer");

  // clear existing elements
  $plannerDiv.empty();

  if (test) {
    console.log("current time", nowHour12);
  }

  // build calendar by row for fix set of hours
  for (let hour = 9; hour <= 17; hour++) {
    // index for array use offset from hour
    let index = hour - 9;

    // build row components
    let $rowDiv = $("<div>");
    $rowDiv.addClass("row");
    $rowDiv.addClass("plannerRow");
    $rowDiv.attr("hour-index", hour);

    // Start building Time box portion of row
    let $col2TimeDiv = $("<div>");
    $col2TimeDiv.addClass("col-md-2");

    // create timeBox element (contains time)
    const $timeBoxSpn = $("<span>");

    // can use this to get value
    $timeBoxSpn.attr("class", "timeBox");

    // format hours for display
    let displayHour = 0;
    let ampm = "";

    if (hour > 12) {
      displayHour = hour - 12;
      ampm = "pm";
    } else {
      displayHour = hour;
      ampm = "am";
    }

    // populate timeBox with time
    $timeBoxSpn.text(`${displayHour} ${ampm}`);

    // insert into col inset into timebox
    $rowDiv.append($col2TimeDiv);
    $col2TimeDiv.append($timeBoxSpn);
    // STOP building Time box portion of row

    // START building input portion of row
    // build row components
    let $dailyPlanSpn = $("<input>");
    $dailyPlanSpn.attr("id", `input-${index}`);
    $dailyPlanSpn.attr("hour-index", index);
    $dailyPlanSpn.attr("type", "text");
    $dailyPlanSpn.attr("class", "dailyPlan");

    // access index from data array for hour
    $dailyPlanSpn.val(planTextArr[index]);
    if (weekendDay || hour < nowHour24) {
      $dailyPlanSpn.attr("disabled", "true");
    }

    // create col to control width
    let $col9IptDiv = $("<div>");
    $col9IptDiv.addClass("col-md-9");

    // add col width and row component to row
    $rowDiv.append($col9IptDiv);
    $col9IptDiv.append($dailyPlanSpn);
    // STOP building Time box portion of row

    // START building save portion of row
    let $col1SaveDiv = $("<div>");
    $col1SaveDiv.addClass("col-md-1");
    let $saveBtn = $("<i>");
    $saveBtn.addClass("button");
    $saveBtn.attr("id", `saveid-${index}`);
    $saveBtn.attr("save-id", index);
    if (weekendDay || hour < nowHour24) {
      $saveBtn.attr("class", "far fa-save saveBtnNoCursor");
      $saveBtn.attr("disabled", "true");
    } else {
      $saveBtn.attr("class", "far fa-save saveBtn");
    }
    $rowDiv.append($col1SaveDiv);

    $col1SaveDiv.append($saveBtn);
    // STOP building save portion of row

    // set row color based on time
    updateRowColor($rowDiv, hour);

    // add row to planner container
    $plannerDiv.append($rowDiv);
  }

  // function to update row color
  function updateRowColor($hourRow, hour) {
    if (test) {
      console.log("rowColor ", nowHour24, hour);
    }

    if (hour < nowHour24) {
      // $hourRow.css('')

      if (test) {
        console.log("lessThan");
      }
      $hourRow.css("background-color", "lightgrey");
    } else if (hour > nowHour24) {
      if (test) {
        console.log("greaterthan");
      }
      $hourRow.css("background-color", "lightgreen");
    } else {
      if (test) {
        console.log("eqaul");
      }

      $hourRow.css("background-color", "tomato");
    }
  }

  // Disable input and save during week end
  if (currentDay == "Saturday" || currentDay == "Sunday") {
    $(".dailyPlan").disabled = true;
    $(".saveBtn").disabled = true;
  }
  $;
  $(document).on("click", "i", function (event) {
    event.preventDefault();
    if (test) {
      console.log("click pta before " + planTextArr);
    }

    let $index = $(this).attr("save-id");
    let inputId = "#input-" + $index;
    let $value = $(inputId).val();
    planTextArr[$index] = $value;

    if (test) {
      console.log("value ", $value);
      console.log("index ", $index);
      console.log("click pta after " + planTextArr);
    }

    // remove shawdow pulse class
    $(`#saveid-${$index}`).removeClass("shadowPulse");

    // saves to local storage
    localStorage.setItem("storedPlans", JSON.stringify(planTextArr));
    localStorage.setItem("currentDay", JSON.stringify(currentDay));
  });

  // function to color save button on change of input

  $(document).on("change", "input", function (event) {
    event.preventDefault();

    if (test) {
      console.log("onChange");
      console.log("id", $(this).attr("hour-index"));
    }

    // neeed to check for save button
    let i = $(this).attr("hour-index");

    // add shawdow pulse class
    $(`#saveid-${i}`).addClass("shadowPulse");
  });
});
