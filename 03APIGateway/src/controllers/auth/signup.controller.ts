import { authService } from '@gateway/services/api/auth.services';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class SignUpController {
  public async create(req: Request, res: Response): Promise<void> {
    console.log('signupcontroller Request Body: ', req.body);
    const response: AxiosResponse = await authService.signUp(req.body);
    req.session = { jwt: response.data.token };
    res.status(StatusCodes.CREATED).json({ message: response.data.message, user: response.data.user });
  }
}
