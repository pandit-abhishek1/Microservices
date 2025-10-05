import { authService } from '@gateway/services/api/auth.services';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';

export class SignInController {
  public async create(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await authService.signIn(req.body);
    req.session = { jwt: response.data.token };
    res.status(response.status).json({ message: response.data.message, data: response.data });
  }
}
