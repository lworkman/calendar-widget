/*

    Liam Workman
    extra-functions.js
    Contains helper functions outside the scope of components or containers.

*/

let extraFunctions = {

    // Takes a javascript date object and returns the current time formatted in a string. Can optionally return 12 hour time format as well.

    turnTimeToString : function(time,twelveHour = false){

        let output = '';

        if (time.getHours() > 12 && twelveHour){
            output = (time.getHours() - 12).toString() + ':' + (time.getMinutes() === 0 ? '00' : time.getMinutes()) + ' PM';
        }
        else {
            output = time.getHours() + ':' + (time.getMinutes() === 0 ? '00' : time.getMinutes()) + (twelveHour ? ' AM' : '');
        }

        return output;
    },

    // Takes a javascript date object and returns the current date and time formatted as a string. Optional parameter returns the time without the current date.

    turnTimeToDateString : function(time,noDate = false){
        let output = '';

        if (noDate){
            output = this.turnTimeToString(time,true);
        }
        else {
            output = this.turnNumberToMonth(time.getMonth()) + " " + time.getDate().toString() + ", " + time.getFullYear() + " - " + this.turnTimeToString(time,true);
        }

        return output;
    },

    // Takes an integer and returns a string of the month associated with it.

    turnNumberToMonth : function(number){
        let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

        return months[number];
    },

    // Takes an integer and returns a string of the day's short-form associated with it, starting with Sunday.

    turnNumberToDay : function(number){
        let days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

        return days[number].toUpperCase();
    }
}

export default extraFunctions;