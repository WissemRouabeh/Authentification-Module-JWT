import { Request, Response } from "express";
import userModel from "../models/user";
import { IUser } from "../types/user";

type Result = {
  result: boolean;
  message: string;
};
async function existInCluster(user: IUser): Promise<Result> {
  let returnedObject: Result = {
    result: false, //true if user exist false if not
    message: "Ok",
  };

  await userModel
    .findOne({ $or: [{ username: user.username }, { email: user.email }] })
    .then((data: any) => {
      const searchedUser: IUser = data;
      if (searchedUser?.username == user.username) {
        returnedObject = {
          message: "Username already exist",
          result: true,
        };
      }
      if (searchedUser?.email == user?.email) {
        returnedObject = {
          message: "Email already exist",
          result: true,
        };
      }
    });

  return returnedObject;
}
function isEmail(email: string): boolean {
  const pattern =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const regex: RegExp = new RegExp(pattern);
  return regex.test(email.toLowerCase());
}
function isUsername(username: string): boolean {
  const pattern = /^[^\W_]{3,}$/;
  const regex: RegExp = new RegExp(pattern);

  return regex.test(username.toLowerCase());
}
//middleware function bellow
function validateUser(req: Request, res: Response, next: any): void {
  const user: IUser = req.body;
  //user exist or not
  existInCluster(user).then((userExist) => {
    if (!userExist.result) {
      //user inputs are valid or not
      if (!isEmail(user.email)) res.send("Email is not valid");
      else if (!isUsername(user.username))
        res.send("Username must be more than 3 caracters with no symbols");
      else if (user.password.length < 6)
        res.send("Password must be more than 6 caracters");
      else next();
    } else {
      res.send(userExist.message);
    }
  });
}
export { validateUser };
