import { Router } from "express";
import { SignUpController } from "@gateway/controllers/auth/signup.controller";

class AuthRoutes {
  private router: Router;
  private signUpController: SignUpController;

  constructor() {
    this.router = Router();
    this.signUpController = new SignUpController(); // ✅ Create instance
  }

  public routes(): Router {
    this.router.post( "/signup", this.signUpController.create.bind(this.signUpController) // ✅ Bind instance
    );
     this.router.post( "/signup2", SignUpController.prototype.create);
    return this.router;
  }
}

export const authRoutes = new AuthRoutes();
