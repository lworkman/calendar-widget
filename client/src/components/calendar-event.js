/*

    Liam Workman
    calendar-event.js
    React.js component that displays the event information for an event. Changes it's display based on a number
    of things, including whether the event is currently focused or the event is multi-day.

*/

import React from "react";
import extraFunctions from "../extra-functions.js";

export default class CalendarEvent extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            'focused': false,
        }

        this.start = extraFunctions.turnTimeToDateString(this.props.info.start_time,props.info['sameDay']);
        this.end = extraFunctions.turnTimeToDateString(this.props.info.end_time,props.info['sameDay']);
    }

    // Sets the event to be focused so it shows more information

    expand(){
        this.setState({'focused': !this.state['focused']});
    }

    /* Renders the event, and includes some logic within to do different things:

        1. Renders the container, adding an optional class if the event has been deemed a 'bad event'. Also puts a
        click event on to make the card expand when it's clicked.
        2. The title of the event.
        3. An error that shows if the event is focused AND a bad event.
        4. The location to show when the event is expanded. The location is a link to google maps that opens in a new tab. (TODO: make open in app if mobile).
        5. Shows the time that the event runs for.
        
    */

    render(){

        return <div className={(!this.props.info['isGood'] ? 'bad-event ' : '' )+(!this.props.info['sameDay'] ? 'multi-day-event ' : '') + 'calendar-event'} onClick={this.expand.bind(this)}>
                    <h3 className='white-regular event-title'>{this.props.info.title}</h3>
                    {!this.props.info['isGood'] ? <i style={{'color': 'white', 'marginLeft':'10px'}} className="fa fa-exclamation-circle" aria-hidden="true"></i> : ''}
                    {this.state['focused'] && !this.props.info['isGood'] ? <h4 className='white-regular'>Start is before end. Human error?</h4> : ''}
                    <div className='event-link-container'>
                        {this.state['focused'] ? <a className='white-regular' href={'http://maps.google.com/?q=' + this.props.info.location} target='_blank'>{this.props.info.location}</a> : ''}
                        {this.state['focused'] ? <i style={{'color': 'white', 'marginLeft':'10px'}} className="fa fa-map-marker" aria-hidden="true"></i> : ''}
                        </div>
                    <p className='white-regular event-time'>{this.start} to {this.end}</p>
                </div>;

    }

}
