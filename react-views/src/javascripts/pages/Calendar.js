import React from 'react';
import axios from 'axios';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';



import '../../css/calendar.css';


export default class CompanyCalendar extends React.Component {
    

    constructor(props){
        super(props);
        this.state = {
            weekendsVisible : true,
            calendarEvents : []
        }
    }

    componentDidMount(props) {
        let idCompany = this.props.location.state.CompanyId;
        const headers = {
            'Access-Control-Allow-Origin': '*'
        };

        axios({
            method: 'get',
            url: `http://localhost:5000/admin/calendarInfo?idCompany=${idCompany}`,
            headers: headers,
        })
            .then((response) => {
                let calendarEvents = response.data;
                this.setState({calendarEvents : calendarEvents});
            })
    }

    render() {
        return (
            <div className="calendar_holder">
                <div className="sidebar">

                </div>
                <div className="calendar">
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
                        initialView="dayGridMonth"
                        events={this.state.calendarEvents}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay'
                        }}
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        weekends={this.state.weekendsVisible}
                        eventContent={renderEventContent} // custom render function
                    />
                </div>

            </div>
        )
    }
}
function renderEventContent(eventInfo) {
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    )
}