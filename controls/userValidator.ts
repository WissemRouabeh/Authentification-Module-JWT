import { Request, Response } from "express";
import userModel from "../models/user";

interface IUser {
  _id?: any;
  username: string;
  password: string;
  joinDate?: any; //date
}
type Result = {
  result: boolean;
  message: string;
};
async function existInCluster(user: IUser): Promise<Result> {
  let returnedObject: Result = {
    result: false, //true if user exist false if not
    message: "Ok",
  };

  await userModel.findOne({ username: user.username }).then((data: any) => {
    const searchedUser: IUser = data;
    if (searchedUser?.username == user.username) {
      returnedObject = {
        message: "Username already exist",
        result: true,
      };
    }
    //we can add email also
  });

  return returnedObject;
}
//middleware function bellow
function validateUser(req: Request, res: Response, next: any): void {
  const user: IUser = req.body;
  //user exist or not
  existInCluster(user).then((userExist) => {
    if (!userExist.result) {
      //user inputs are valid or not
      if (user.username.length < 8)
        res.send("Username length must be more than 8 caracters");
      else if (user.password.length < 8)
        res.send("Password should be more than 8 caracters");
      else next();
    } else {
      res.send(userExist.message);
    }
  });
}
export { validateUser };
