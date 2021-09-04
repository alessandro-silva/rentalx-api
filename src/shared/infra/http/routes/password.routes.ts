import { Router } from 'express';

import { ResetPasswordUserController } from '@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController';
import { SendForgotPasswordMailController } from '@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController';

const passwordRoutes = Router();

const sendForgotPasswordMail = new SendForgotPasswordMailController();
const resetPasswordUser = new ResetPasswordUserController();

passwordRoutes.post('/forgot', sendForgotPasswordMail.handle);
passwordRoutes.post('/reset', resetPasswordUser.handle);

export { passwordRoutes };
