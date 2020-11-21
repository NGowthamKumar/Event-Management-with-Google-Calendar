import * as eventController from './events';
import router from '../../config/router';

router.post('/createEvent', eventController.createEvent);
router.put('/updateEvent', eventController.updateEvent);
router.get('/readEvent/:_id', eventController.readEvent);
router.get('/events', eventController.getEvents);
router.delete('/deleteEvent/:_id', eventController.deleteEvent);
router.get('/test', eventController.test);
router.all('/authSuccess', eventController.authSuccessGoogle);

module.exports = router;


