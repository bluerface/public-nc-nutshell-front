import authActions from './auth.actions.js';
import calendarActions from './calendar.actions.js';
import eventsActions from './events.actions.js';
import resourceViewActions from './resourceView.actions.js';
import resourcesActions from './resources.actions.js';

export default Object.assign(
  {},
  authActions,
  calendarActions,
  eventsActions,
  resourceViewActions,
  resourcesActions
)
