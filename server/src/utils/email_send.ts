import nodemailer from 'nodemailer';
import {env} from '../config/development_config';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: env.email.email,
      pass: env.email.password
    },
    tls: {
      rejectUnauthorized: false
    }
});

export const email_send = async(email:string, code:number) =>{
    const mailOptions = {
        from: env.email.email,
        to: email,
        subject: 'Authentication code of Nodejs',
        text: 'the authentication code is ' + code
    };

    transporter.sendMail(mailOptions, function(err) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Email sent successfully");
        }
    });
};