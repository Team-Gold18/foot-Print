const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'doctorapp100@gmail.com',
      pass: 'doctor@100'
    }
  });

  exports.emailVerification = async function ( token, user) {
    transport
      .sendMail({
        from: "doctorapp100@gmail.com",
        to: user.email,
        subject: "Welcome to Doctor App! Confirm Your Email",
        html: `<h1><b>Hello ${user.first_name} !</b></h1>
  
                  <h4><i>You're on your way!</i></h4>
                  <h5>Let's confirm your email address</h5>
                  <p>By clicking on the following link, you are confirming your email address to verify your registration.</p>
                  <a href="${process.env.BASE_URL}/user/VerifyAccount?token=${token}"><b><i> Verify Account </i></b></a>`,
      })
      .then(() => {
        console.log("Email Sent to " + user.email + " for account verification");
      })
      .catch(() => {
        console.log(
          "Email Not Sent to " + user.email + " for account verification"
        );
      });
  };