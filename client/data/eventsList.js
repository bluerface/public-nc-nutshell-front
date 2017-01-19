import moment from 'moment';

let eventsList = [
  {
    id: '123',
    title: 'Functional OCP',
    type: 'lecture',
    description: 'Cat ipsum dolor sit amet, pelt around the house and up and down stairs chasing phantoms. White cat sleeps on a black shirt destroy couch as revenge. Lick the plastic bag eat prawns daintily with a claw then lick paws clean wash down prawns with a lap of carnation milk then retire to the warmest spot on the couch to claw at the fabric before taking a catnap white cat sleeps on a black shirt, rub face on everything',
    startDate: moment("17-01-2017 08:00 ", "DD-MM-YYYY HH:mm").toDate(),
    endDate: moment("17-01-2017 09:00", "DD-MM-YYYY HH:mm").toDate()
  },
  {
    id: '234',
    title: 'Stacks and Queues',
    type: 'sprint',
    allDay: true,
    startDate: moment('16-01-2017 09:00', "DD-MM-YYYY HH:mm").toDate(),
    endDate: moment("17-01-2017 11:00", "DD-MM-YYYY HH:mm").toDate()
  }
];

export default eventsList;
