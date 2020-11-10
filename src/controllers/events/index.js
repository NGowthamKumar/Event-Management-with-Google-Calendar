import * as eventController from './events';
import router from '../../config/router';

router.post('/event', eventController.createEvent);

module.exports = router;


