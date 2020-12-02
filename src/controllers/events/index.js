import * as eventController from './events';
import router from '../../config/router';
import {cache} from '../../middllewares/redisCache';

router.get('/authorization', eventController.authorization);
router.post('/createEvent', cache, eventController.createEvent);
router.put('/updateEvent', cache, eventController.updateEvent);
router.get('/readEvent/:_id', eventController.readEvent);
router.get('/events', eventController.getEvents);
router.delete('/deleteEvent/:_id', eventController.deleteEvent);
router.all('/authSuccess', eventController.authSuccessGoogle);

module.exports = router;


