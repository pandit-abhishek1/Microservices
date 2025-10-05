import { authService } from '@gateway/services/api/auth.services';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';

export class PasswordController {
  public async ForgetPassword(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await authService.forgotPassword(req.body);
    res.status(response.status).json({ message: response.data.message, data: response.data });
  }
  public async ResetPassword(req: Request, res: Response): Promise<void> {
    const { token } = req.params;
    const response: AxiosResponse = await authService.resetPassword(token, req.body);
    res.status(response.status).json({ message: response.data.message, data: response.data });
  }
  public async ChangePassword(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await authService.changePassword(req.body);
    res.status(response.status).json({ message: response.data.message, data: response.data });
  }
}
