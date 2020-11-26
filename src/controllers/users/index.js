import * as userController from './users';
import router from '../../config/router';


router.post('/login', userController.userLogin);
router.post('/register', userController.userRegister);


module.exports = router;
