/*
Name: Ethan Kittell
Email: Ethan_Kittell@student.uml.edu

My javascript to get the values from the form display
appropriate error messages and to make a multiplication table.

Used the Jquery validation and UI library documentation given in the HW4 pdf

for some code I referenced examples in these library docs

New code includes form validation form form that doesnt generate a new
table if input is invalid, sliders, and tab functionality that saves
tables when the user chooses to save a table
*/
//runs the check function when the document is loaded/ready
$(document).ready(function() {
//imediately creates a tabbed UI interface
$( "#tabs" ).tabs();
//calls the slider function that creates the
//two way binding sliders for each input
sliderFunc();
//validates the form when the document is loaded
check();
//gets the values to create a table and validates the form
//whenever input is changed for the min collumn input
$("#minCol").on("input", function() {
    myGetValues();
    check();
});
//gets the values to create a table and validates the form
//whenever input is changed for the max collumn input
$("#maxCol").on("input", function() {
    myGetValues();
    check();
});
//gets the values to create a table and validates the form
//whenever input is changed for the min row input
$("#minRow").on("input", function() {
    myGetValues();
    check();
});
//gets the values to create a table and validates the form
//whenever input is changed for the max row input
$("#maxRow").on("input", function() {
    myGetValues();
    check();
});
});
//function "check" that validates the form and all of its input values
function check() {
$("#tableFormForm").validate({    
        //rules for validating all inputs
        rules: {
            //minCol validation requirements
            minCol: {
                required: true,
                number: true,
                //sets the min and max to the stated limits -50 to 50
                min: -50,
                max: 50,
                //Less than method to make sure that the min Col value
                //is always LESS than the max Col value
                lessThan: "#maxCol"
            },
            //maxCol validation requirements same as minCol
            maxCol: {
                required: true,
                number: true,
                min: -50,
                max: 50,
                //Greater than method to make sure that the max Col value
                //is always Greater than the min Col value
                greaterThan: "#minCol"
                
            },
            minRow: {
                required: true,
                number: true,
                min: -50,
                max: 50,
                //less than validator method but works for min row and maxrow
                lessThan: "#maxRow"
            },

            maxRow: {
                required: true,
                number: true,
                min: -50,
                max: 50,
                greaterThan: "#minRow"
            },
        },
        //All my messages for all my validation methods
        messages: {
            //All error messages for my validation methods for minCol
            //that are precise and relevant and helpful to the user
            minCol: {
                min: "The Min Column number is too low. Please enter a number between -50 and 50.",
                max: "The Min Column number is too high. Please enter a number between -50 and 50.",
                number: "Min Column's value is not a number between -50 and 50. Please correct it.",
                required: "You have not entered a value in the Min Column input field. Please input a number bewteen -50 and 50.",
                lessThan: "Min Column's value should be less than or equal to the Max Column's value. Please correct it."
            },
            //All error messages for my validation methods for maxCol
            //that are precise and relevant and helpful to the user
            maxCol: {
                min: "The Max Column number is too low. Please enter a number between -50 and 50.",
                max: "The Max Column number is too high. Please enter a number between -50 and 50.",
                number: "Max Column's Value is not a number between -50 and 50. Please correct it.",
                required: "You have not entered a value in the Max Column input field. Please input a number bewteen -50 and 50.",
                greaterThan: "Max Column's value should be greater than or equal to the Min Column's value. Please correct it."
            },
            //All error messages for my validation methods for minRow
            //that are precise and relevant and helpful to the user
            minRow: {
                min: "The Min Row number is too low. Please enter a number between -50 and 50.",
                max: "The Min Row number is too high. Please enter a number between -50 and 50.",
                number: "Min Row's value is not a number between -50 and 50. Please correct it.",
                required: "You have not entered a value in the Min Row input field. Please input a number bewteen -50 and 50.",
                lessThan: "Min Row's value should be less than or equal to the Max Row's value. Please correct it."
            },
            //All error messages for my validation methods for maxRow
            //that are precise and relevant and helpful to the user
            maxRow: {
                min: "The Max Row number is too low. Please enter a number between -50 and 50.",
                max: "The Max Row number is too high. Please enter a number between -50 and 50.",
                number: "Max Row's value is not a number between -50 and 50. Please correct it.",
                required: "You have not entered a value in the Max Row input field. Please input a number bewteen -50 and 50.",
                greaterThan: "Max Row's value should be greater than or equal to the Min Row's value. Please correct it."
            },
        }    
      });
      //Less than validator method used to compare min and max inputs above
      //used this website as inspiration with creating these methods:
      //https://stackoverflow.com/questions/29451507/how-to-use-jquery-validator-to-determine-value-of-one-field-is-greater-than-anot 
      $.validator.addMethod("lessThan",
        function (value, element, param) {
            var $otherElement = $(param);
            //returns based on the value of each input
            return parseInt(value, 10) <= parseInt($otherElement.val(), 10);
      });
      //greater than validator method used to compare min and max inputs above
      $.validator.addMethod("greaterThan",
        function (value, element, param) {
            var $otherElement = $(param);
            //returns based on the value of each input
            return parseInt(value, 10) >= parseInt($otherElement.val(), 10);
      });
    
}
      //slider code for the check function
function sliderFunc() {
    //creates a slider for the minCol input and creates a two way binding
    //for the slider and the text input
      $('#slider').slider({
        min:-50,
        max:50,
        step: 1,
        value: 0,
        slide: function(event, ui){
            //for the slider value it two way binds to the text input
            $("#minCol").val(ui.value);
            //gets the values from the input just incase a table is able to be created
            myGetValues();
            //validates the form just in case an error has occurred
            check();
        }
    });
    //creates a slider for the maxCol input and creates a two way binding
    //for the slider and the text input
    $('#slider2').slider({
        min:-50,
        max:50,
        step: 1,
        value: 0,
        slide: function(event, ui){
            $("#maxCol").val(ui.value);
            myGetValues();
            check();
        }
    });
    //creates a slider for the minRow input and creates a two way binding
    //for the slider and the text input
    $('#slider3').slider({
        min:-50,
        max:50,
        step: 1,
        value: 0,
        slide: function(event, ui){
            $("#minRow").val(ui.value);
            myGetValues();
            check();
        }
    });
    //creates a slider for the maxRow input and creates a two way binding
    //for the slider and the text input
    $('#slider4').slider({
        min:-50,
        max:50,
        step: 1,
        value: 0,
        slide: function(event, ui){
            $("#maxRow").val(ui.value);
            myGetValues();
            check();
        }
    });
    //used this website as inspiration for these slider changing
    //functions for the two way binding: https://infoheap.com/jquery-ui-slider-and-input-text-box-two-way-binding/
    //updates the slider whenever a value in minCol is changed
    //further supports two-way binding between each slider and its corresponding
    //text field
    $("#minCol").change(function (){
        $("#slider").slider("value",$("#minCol").val());
    })
    //updates the slider whenever a value in maxCol is changed
    //further supports two-way binding between each slider and its corresponding
    //text field
    $("#maxCol").change(function (){
        $("#slider2").slider("value",$("#maxCol").val());
    })
    //updates the slider whenever a value in minRow is changed
    //further supports two-way binding between each slider and its corresponding
    //text field
    $("#minRow").change(function (){
        $("#slider3").slider("value",$("#minRow").val());
    })
    //updates the slider whenever a value in maxRow is changed
    //further supports two-way binding between each slider and its corresponding
    //text field
    $("#maxRow").change(function (){
        $("#slider4").slider("value",$("#maxRow").val());
    })
}


//My function from HW3
function myGetValues() {
    //sets up table values
    var minCol = parseInt(document.getElementById("minCol").value);
    var maxCol = parseInt(document.getElementById("maxCol").value);
    var minRow = parseInt(document.getElementById("minRow").value);
    var maxRow = parseInt(document.getElementById("maxRow").value);

    //calls the function to validate the form
    check();
    //remove old table function call from HW3 for overwriting the current table
    removeOldTable();
    //Calls the create table function just in case a table is able to be made
    createTable(minCol, maxCol, minRow, maxRow);

}
//remove old table function from HW3
function removeOldTable() {

    //gets rid of table place holder to place a new table
    var oldTable = document.getElementById("placeHolder");
    var newPlaceHolder = document.createElement('div');
    newPlaceHolder.setAttribute("id","placeHolder");
    oldTable.replaceWith(newPlaceHolder);

}
//create table function modified from HW3
function createTable(minCol, maxCol, minRow, maxRow) 
{
    check();
    //check errors and validates the form
    

    //IF form was successfully validated it creates a new table dynamically
    if ( $("#tableFormForm").valid() ) {
    
    //Get the first element in the Body
    var body = document.getElementById("placeHolder");

    //Here we are making the table
    var table = document.createElement('TABLE');

    //Create a TABLE-BODY
    var tblB = document.createElement('TBODY');

    //Append the tablebody to the table
    table.appendChild(tblB);



    //Simple loop to create the cells and rows
    for (var i = minRow; i <= maxRow + 1; i++)
    {
        //Create the rows
        var tr = document.createElement('TR');
        //Append the rows to the body
        tblB.appendChild(tr);
        
        
        //Create the cells
        for (var j = minCol; j <= maxCol + 1; j++)
        {
            var td = document.createElement('TD');
            
            //code to determine contents of table
            
            if (i == minRow && j == minCol)
            {
                td.innerHTML = "";
                td.style.visibility = 'hidden';
            }
            else if (j == minCol)
            {
                td.innerHTML = i-1;
            }
            else if(i == minRow)
            {
                td.innerHTML = j-1;
            }
            else
            {
                td.innerHTML =  (i-1) * (j-1);
            }

            
            //Append them to the rows
            tr.appendChild(td);
        }

    }
    //Append the table to the body
    body.appendChild(table);
    
    }
}

//this ensures that some tables dont get put into the same numbers
// so two 0-0-0-0 tables dont go on the same tab making a new tab
//is ALWAYS unique
var tabNumber = 0;

//create tab function
function createTabs() {
    //gets values from form just like the myGetValues function
    var minCol = parseInt(document.getElementById("minCol").value);
    var maxCol = parseInt(document.getElementById("maxCol").value);
    var minRow = parseInt(document.getElementById("minRow").value);
    var maxRow = parseInt(document.getElementById("maxRow").value);

    //validates the form
    check();
      
    //if the form is successfully validated it creates the new tab
    if ( $("#tableFormForm").valid() ) {
    //creates elements within the html to represent the tabs for new saved
    //tables
    $("ul").append("<li class=\"temp\"><a href=\"" + '#' + minCol + '-' + maxCol + '-' + minRow + '-' + maxRow + '-' + tabNumber + "\">" + '(' + minCol + ')' + '-' + '(' + maxCol + ')' + '-' + '(' + minRow + ')' + '-' + '(' + maxRow + ')' + "</a><span class=\"ui-icon ui-icon-close\" role=\"presentation\">Remove Tab</span></li>");
    $("div#tabs").append("<div class=\"temp\" id=\"" + minCol + '-' + maxCol + '-' + minRow + '-' + maxRow + '-' + tabNumber + "\"></div>");

    
    //Get the first element in the Body
    var intab = document.getElementById(minCol + '-' + maxCol + '-' + minRow + '-' + maxRow + '-' + tabNumber);

    //Here we are making the table
    var table = document.createElement('TABLE');

    //Create a TABLE-BODY
    var tblB = document.createElement('TBODY');

    //Append the tablebody to the table
    table.appendChild(tblB);



    //Simple loop to create the cells and rows
    for (var i = minRow; i <= maxRow + 1; i++)
    {
        //Create the rows
        var tr = document.createElement('TR');
        //Append the rows to the body
        tblB.appendChild(tr);
        
        
        //Create the cells
        for (var j = minCol; j <= maxCol + 1; j++)
        {
            var td = document.createElement('TD');
            
            //code to determine contents of table
            
            if (i == minRow && j == minCol)
            {
                td.innerHTML = "";
                td.style.visibility = 'hidden';
            }
            else if (j == minCol)
            {
                td.innerHTML = i-1;
            }
            else if(i == minRow)
            {
                td.innerHTML = j-1;
            }
            else
            {
                td.innerHTML =  (i-1) * (j-1);
            }

            
            //Append them to the rows
            tr.appendChild(td);
        }

    }
    //Append the table to the inside of the tab div
    //which serves as the stored table
    intab.appendChild(table);
    //increases the tab number to insure a unique tab is made
    tabNumber = tabNumber + 1;
    }
    //refreshes the tab interface after the tab is deleted
    $("#tabs").tabs("destroy");
    $( "#tabs" ).tabs();
    $( "#tabs" ).tabs( "refresh" );

}
//used tab deletion pages for inspiration: https://stackoverflow.com/questions/1581751/removing-dynamic-jquery-ui-tabs
//refreshes the tab interface after the tab is deleted
function deleteTabs(){
    $(".temp").remove();
    $("#tabs").tabs("destroy");
    $( "#tabs" ).tabs();
    $( "#tabs" ).tabs( "refresh" );
    tabNumber = 0;
}


$( function() {
// Close icon: removing the tab on click
//used website on tab deletion buttons for inspiration:
//https://stackoverflow.com/questions/14357614/add-close-button-to-jquery-ui-tabs
var tabs = $( "#tabs" ).tabs();
tabs.on( "click", "span.ui-icon-close", function() {
    //uses the span inserted into the tab LI to act as a X button to delete
    //an indiviual tab
    var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
    $( "#" + panelId ).remove();
    //refreshes the tabs when deleted
    tabs.tabs( "refresh" );
  });


} );

