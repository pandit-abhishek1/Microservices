import { Router } from "express";
import { SignUpController } from "@gateway/controllers/auth/signup.controller";
import { SignInController } from "@gateway/controllers/auth/signin.controller";
import { VerifyEmailController } from "@gateway/controllers/auth/verify-email.controller";
import { PasswordController } from "@gateway/controllers/auth/password.controller";
class AuthRoutes {
  private router: Router;
  private signUpController: SignUpController;
  private signInController: SignInController;
  private verifyEmailController: VerifyEmailController;
  private passwordController: PasswordController;
  constructor() {
    this.router = Router();
    this.signUpController = new SignUpController(); // ✅ Create instance
    this.signInController = new SignInController(); // ✅ Create instance
    this.verifyEmailController = new VerifyEmailController(); // ✅ Create instance
    this.passwordController = new PasswordController(); // ✅ Create instance
  }

  public routes(): Router {
    this.router.post( "/signup", this.signUpController.create.bind(this.signUpController));
     this.router.post( "/signin", this.signInController.create.bind(this.signInController));
     this.router.put( "/verify-email/:token", this.verifyEmailController.verify.bind(this.verifyEmailController));
     this.router.put( "/forget-password", this.passwordController.ForgetPassword.bind(this.passwordController));
     this.router.put( "/reset-password/:token", this.passwordController.ResetPassword.bind(this.passwordController));
     this.router.put( "/change-password", this.passwordController.ChangePassword.bind(this.passwordController));
    return this.router;
  }
}

export const authRoutes = new AuthRoutes();
