/*

    Liam Workman
    calendar-widget.js
    A react.js component which acts as the container for the entire calendar widget. Retrieves the information from the API,
    and builds out the widget using it.

*/

import React from "react";
import CalendarCard from "../components/calendar-card.js";
import extraFunctions from "../extra-functions.js";

export default class CalendarWidget extends React.Component{

    constructor(){
        super();
        this.state = {
            'dataReceived': false,
            'data': [],
            'failed': false
        };
        this.sendGETRequest('./api');
    }

    // Sends a get request to the url

    sendGETRequest(url){
        let requestContainer = new XMLHttpRequest();
        requestContainer.open('GET',url,true);
        requestContainer.onreadystatechange = this.processGETRequest.bind(this,requestContainer);
        requestContainer.send();
    }

    /*  Processes the response and makes sure that it's the right schema. If it is, updates
        the state. Contains some basic error checking for:
        1. Response not being JSON
        2. Response not matching the expected schema
        3. Response failing
    */

    processGETRequest(response){
        if (response.readyState === 4 && response.status === 200){

            let data = '';
            let error = '';

            try {
                data = JSON.parse(response.responseText);
            } catch (e){
                this.setState({
                    'failed': true
                })
                error = 'Not JSON';
            }

            if (!data.hasOwnProperty('events')){
                this.setState({
                    'failed': true
                })

                error = 'No events property';
            }

            if (error !== ''){
                console.log(error);
                console.log(response);
            }

            this.setState({
                'dataReceived': true,
                'data': this.transformEvents(JSON.parse(response.responseText)['events'])
            });
        }
        else if (response.readyState === 4){

            console.log('Response status of '+response.status);
            console.log(response);

            this.setState({
                'failed': true
            })
        }
    }

    /*  Transforms the event array provided by changing some things, adding new properties, and sorting it. For each element in
        the array it:

        1. Adds a 'sameDay' property to communicate whether the event is on the same day as the previous event. Defaults to false
        2. Adds an 'isGood' property to communicate that something is wrong with the event. Defaults to true.
        3. Transforms the 'start_time' and 'end_time' values to Javascript date objects.
        4. Checks if the event is only on one day and updates 'sameDay' accordingly.
        5. Checks if the event's end is after its start, and updates 'isGood' accordingly.
        6. Pushes the changed event into a new array 'transformedEvents'.

        It then takes the new array and sorts it by the 'start_time' property to put the events in order,
        from earliest to latest.
    */

    transformEvents(eventArray){
        let transformedEvents = [];

        eventArray.forEach(function(element){
            element['sameDay'] = false;
            element['isGood'] = true;
            element['start_time'] = new Date(element['start_time']);
            element['end_time'] = new Date(element['end_time']);

            if (element['start_time'].getDay() === element['end_time'].getDay() && element['start_time'].getMonth() === element['end_time'].getMonth()){
                element['sameDay'] = true;
            }
            if (element['start_time'].getTime() > element['end_time'].getTime()){
                element['isGood'] = false;
            }

            transformedEvents.push(element);
        })

        function compare(a,b){
            if (a['start_time'].getTime() < b['start_time'].getTime()){
                return -1;
            }
            return 1;
        }

        transformedEvents.sort(compare);

        return transformedEvents;
    }

    /*  Renders out the events that have been transformed. If no data has been recieved yet, and no error was thrown, does not
        display anything. 
    
        1. For every event after the first, it checks if it's in a different month than the last. If it is, displays it. 
        2. Checks if the event is on a different day than the last event. If it is, set's the 'setDay' prop for the CalendarCard.

        If something has gone wrong, the component instead displays an error message.

    */

    render(){
        let elements = [];
        let setDay = false;
        if (this.state.dataReceived){
            let properData = this.state.data;

            for (let i = 0; i < properData.length; i++){
                if (i === 0 || properData[i-1]['start_time'].getMonth() !== properData[i]['start_time'].getMonth()){
                    elements.push(<h2 key={i + ' month'}>{extraFunctions.turnNumberToMonth(properData[i]['start_time'].getMonth())}</h2>)
                }
                if (i === 0 || properData[i-1]['start_time'].getDay() !== properData[i]['start_time'].getDay()){
                    setDay = true;
                }
                elements.push(<CalendarCard setDay={setDay} key={i} info={properData[i]} />);
                setDay = false;
            };
        }

        if (this.state['failed']) {
            elements = <h2>Data returned is wrong. Check console for more info.</h2>
        }
        
        return <div className='calendar-widget-container'>
                <h1 className='calendar-widget-title'>Upcoming Events</h1>
                <div className='calendar-widget'>{elements}</div>
                </div>
    }
}