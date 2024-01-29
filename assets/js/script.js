dayjs.extend(window.dayjs_plugin_advancedFormat);

let currentHour = dayjs().hour();
let today = dayjs().format('dddd,  MMMM Do');
$("#currentDay").text(today);

let $mainContainer = $('#mainContainer');
let minHour = 9;
let maxHour = 17;

// This for loop dynamically generates the timeblocks based on the minimum and maximum hour set above
// It does this by looping through that number range and creating the ID and class for each timeblock
// Using ? for IF and : for ELSE; 
    // currentHour == i ? 'present' means IF current hour is the same as i, assign the class present
    // ELSE : currentHour < i ? 'future' IF the current hour is less than i, assign the class future
    // ELSE assign the class past
// The hour is text injected by the following code (i > 12 ? (i - 12) : i) + (i < 12 ? 'AM' : 'PM')
    // IF i is greater than 12, then subtract 12. This solves the issue where it was showing 1pm as 13pm
    // ELSE then just use i
    // IF i is less than 12 use AM, ELSE use PM
for(var i = minHour; i <= maxHour; i++) {
    let $timeBlock = $('<div id="' + i + '" class="row time-block ' + (currentHour == i ? 'present' : currentHour < i ? 'future' : 'past') + '">\
        <div class="col-1 hour pt-4">' + (i > 12 ? (i - 12) : i) + (i < 12 ? 'AM' : 'PM') + '</div>\
        <textarea class="col-10 description"></textarea>\
        <button class="col-1 btn saveBtn"><i class="fas fa-save"></i></button>\
    </div>');

    let $textArea = $timeBlock.find('textarea'); // This creates a variable targeting the text area
    $textArea.val(localStorage.getItem(i)); // On refresh, this gets the value from local storage and assigns to the text area

        $timeBlock.find('.saveBtn').on("click", function(){
        localStorage.setItem($(this).parent().attr('id'), $textArea.val()); // Clicking on the save button sets the key as the number i and the value as the contents of the text area

        $('#saveTip').show().delay(2000).queue(function() { // If the save button is clicked this shows the tip for 2 seconds, then hides it
            $(this).hide()
        });

        $('#saveTip').show().hide(queue)
    });

    $mainContainer.append($timeBlock); // This appends the above generated time block to the main container and the loop repeats until maximum hour has been appended
}

$('#saveTip').hide(); // This ensures the save tooltip is hidden by default

