import React from 'react';
import Calendar from './Calendar';
import EventLightbox from './EventLightbox';

const CalendarView = function () {
  return (
    <div>
      <EventLightbox />
      <Calendar />
    </div>
  )
}

export default CalendarView;
