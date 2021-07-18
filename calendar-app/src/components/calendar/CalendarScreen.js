import React, { useEffect, useState } from 'react'
import{Calendar, momentLocalizer} from 'react-big-calendar';
import { Navbar } from '../ui/Navbar'
import {messages} from '../../helpers/calendar-messages-es';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { ui } from '../../actions/ui';
import { eventAddNew, eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import {DeleteEvent} from '../ui/DeleteEvent';


moment.locale('es');

const localizer = momentLocalizer(moment);

export const CalendarScreen=()=>{

    const dispatch=useDispatch();

        const {uid}=useSelector(state=>state.auth);

  

    const {activeEvent} = useSelector(state=>state.calendar);

    const {events}=useSelector(state=>state.calendar)

      useEffect(()=>{
        dispatch(eventStartLoading());
    },[dispatch]);

    const[lastView, setState]=useState(localStorage.getItem('lastView')|| 'moth');



    const onDoubleClick=(e)=>{
        dispatch(ui());
        console.log(e);
    }

    const onSelectEvent=(e)=>{
        dispatch(eventSetActive(e));   
    }

    const onViewChange=(e)=>{
        setState(e);
        localStorage.setItem('lastView',e);
    }

    const onSelectSlot=(e)=>{
        dispatch(eventClearActiveEvent());
    }

    const eventStyleGetter=(event, start, end, isSelected)=>{
        console.log(event);
        const style={
            backgroundColor: (uid === event.user._id) ? '#367CF7' : '#465660',
            borderRadius:'0px',
            opacity:0.8,
            display:'block',
            color:'white'
        }

        return{
            style
        }

    }

    return(
        <div className="calendar-screen">
            <Navbar/>

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onSelectSlot={onSelectSlot}
                selectable={true}
                onView={onViewChange}
                
                components={{event:CalendarEvent}}
            />
            {
                activeEvent? <DeleteEvent/> :<></>


            }
           

            <AddNewFab/>

            <CalendarModal/>

        </div>
    )
}