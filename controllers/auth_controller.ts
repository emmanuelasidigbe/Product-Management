import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user";
import jwt from "jsonwebtoken";

export async function signin(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({email});
   

    if (!(user && bcrypt.compareSync(password, user.password))) {
       res.render("error", {
         errorMessage: "Incorrect password,Please try again",
       });
      return;
    }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET as string);

        // Set the token in a cookie
        res.cookie("jwt", token, {
          httpOnly: true, // Prevent client-side JS from accessing the token
          secure: process.env.NODE_ENV === "production", // Set secure flag in production

        });

     res.redirect("/user/dashboard");
    
  } catch (error) {
    console.error(error);
    res.render("error", {
      errorMessage: "Something went wrong, please try again.",
    });
  }
}

export async function signup(req: Request, res: Response) {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    //create new user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    if(!user){
      res.render("error", {
        errorMessage: "Something went wrong when creating the account, please try again.",
      });
      return
    }
    console.log(user)
    //redirect user
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.render("error", {
      errorMessage: "Something went wrong, please try again.",
    });
  }
}

export async function getSignIn(req: Request, res: Response) {
  res.render("index", { errorMessage: null });
}
export async function getSignUp(req: Request, res: Response) {
  res.render("signup", { errorMessage: null });
}