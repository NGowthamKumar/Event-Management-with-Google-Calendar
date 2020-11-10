import * as userController from './users';
import router from '../../config/router';


router.post('/user', userController.createUser);


module.exports = router;
