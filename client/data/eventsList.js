import moment from 'moment';

let eventsList = [
  {
    id: 123,
    title: 'Functional OCP',
    startDate: moment("17-01-2017 08:00 ", "DD-MM-YYYY HH:mm").toDate(),
    endDate: moment("17-01-2017 09:01", "DD-MM-YYYY HH:mm").toDate()
  },
  {
    id: 234,
    title: 'Stacks and Queues',
    allDay: true,
    startDate: moment('16-01-2017 09:00', "DD-MM-YYYY HH:mm").toDate(),
    endDate: moment("17-01-2017 11:01", "DD-MM-YYYY HH:mm").toDate()
  }
];

export default eventsList;
