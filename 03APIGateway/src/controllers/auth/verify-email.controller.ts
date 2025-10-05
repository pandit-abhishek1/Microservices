import { authService } from '@gateway/services/api/auth.services';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';

export class VerifyEmailController {
  public async verify(req: Request, res: Response): Promise<void> {
    const { token } = req.params;
    const response: AxiosResponse = await authService.verifyEmail(token);
    res.status(response.status).json({ message: response.data.message, data: response.data });
  }
}
