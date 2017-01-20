import React from 'react';
import Calendar from './Calendar';
import EventLightbox from './EventLightbox';
import NewEvent from './NewEvent';

const CalendarView = function () {
  return (
    <div>
      <EventLightbox />
      <Calendar />
      <NewEvent />
    </div>
  )
}

export default CalendarView;
