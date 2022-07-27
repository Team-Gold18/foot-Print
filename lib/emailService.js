const nodemailer = require("nodemailer");

const sender_email = "lalalivecs@gmail.com";

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: sender_email,
    pass: "wtijnsbsiaazpblf",
  },
});

  exports.emailVerification = async function ( token, user) {
    transport
      .sendMail({
        from: "doctorapp100@gmail.com",
        to: user.email,
        subject: "Welcome to Foot Print! Confirm Your Email",
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

  exports.loginEmail   = async function (user) {
    transport
      .sendMail({
        from: "doctorapp100@gmail.com",
        to: user.email,
        subject: "Login to FootPrint system",
        html: `<h1><b>Hello ${user.first_name} !</b></h1>
  
                  <h4><i>You're on your way!</i></h4>
                  <h5>You are login to footPrint system at ${new Date()}</h5>`,
	 })
      .then(() => {
        console.log("Email Sent to " + user.email + " for login details");
      })
      .catch(() => {
        console.log(
          "Email Not Sent to " + user.email + " for login details" 
        );
      });
  };