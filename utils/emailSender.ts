import { Request, Response } from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();

export default function (req: Request, res: Response, next: any) {
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    secure: true,
  });
  const mailData = {
    from: "portfoliowissem@gmail.com",
    to: "wissemrouabeh@gmail.com",
    subject: `Hire mail from ${req.body.name}`,
    text: req.body.message + " \n Sent from: " + req.body.email,
    html: `<div>${req.body.body}</div><p>Sent from:
      ${req.body.email}</p>`,
  };
  transporter.sendMail(mailData, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
  res.status(200);
}
