import nodemailer from "nodemailer";
// import UserModel from "../models/User/user.model.js";
import UserModel from "../models/commonModels/authUser.model.js";

function generateOTP() {
  // Generate a random number between 100000 and 999999
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString(); // Convert the number to a string
}

// formate date
const formatDate = (d) => {
  const date = new Date(d);
  let dd = date.getDate();
  let mm = date.getMonth() + 1;
  let yy = date.getFullYear();
  let tt = date.toLocaleTimeString();
  dd = dd < 10 ? "0" + dd : dd;
  mm = mm < 10 ? "0" + mm : mm;
  return `${dd}-${mm}-${yy} ${tt}`;
}

// send email on OTP for registration
export const sendOTPOnEmail = async (req, res, schema) => {
  const { email } = req.body;

  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service
    auth: {
      user: process.env.ADMIN_EMAIL, // Your email address
      pass: process.env.ADMIN_EMAIL_PASSWORD // Your email password or app-specific password
    }
  });

  // random otp
  let otp = generateOTP();

  // html template
  let html = `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Yadgar Fashions OTP</title>
</head>
<body style="margin:0; padding:0; background-color:#f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f5f5f5; padding: 32px 0;">
    <tr>
      <td align="center">
        <table width="100%" max-width="600" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff; padding:24px; border-collapse:collapse; width:100%; max-width:600px;">
          <tr>
            <td align="center">
              <img src="https://yadgarfashions.s3.us-east-2.amazonaws.com/profile/logo.png" width="120" style="display:block; max-width:100%; height:auto;" alt="Yadgar Fashions" />
            </td>
          </tr>
          <tr>
            <td style="padding:24px 0;">
              <h1 style="margin:0; font-family:Poppins, sans-serif; font-weight:400; font-size:24px;">Hi</h1>
              <p style="margin:12px 0 0 0; font-family:sans-serif; font-size:16px; line-height:28px; text-align:left;">
                Welcome to <strong>Yadgar Fashions</strong> – Your Destination for Authentic Afghan Clothing.<br/>
                Discover and customize your perfect traditional outfit with us!
              </p>
            </td>
          </tr>
          <tr>
            <td style="border:1px solid #eee; padding:24px;">
              <h2 style="font-family:Poppins, sans-serif; margin:0 0 12px 0; font-size:20px;">OTP Verification Code</h2>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="background-color:#910a52; padding:12px 0; border-radius:4px;">
                    <span style="color:#ffffff; font-family:sans-serif; font-size:28px; font-weight:600; letter-spacing:2px;">
                      ${otp}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-top:24px;">
              <a href="https://www.yadgarfashions.com" style="text-decoration:none; color:#333333; font-family:sans-serif; font-size:14px;">
                www.yadgarfashions.com
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>

    `

  // Setup email data
  let mailOptions = {
    from: process.env.ADMIN_EMAIL, // Sender address
    to: email, // List of receivers
    subject: "Yadgar Fashions OTP", // Subject line
    html // Plain text body
  };

  const findEmail = await UserModel.findOne({ email });
  if (!findEmail) {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error)
        return res.status(500).json({
          message: "Sending failed",
          isSent: false,
        });
      return res.status(200).send({
        message: "Email sent",
        isSent: true,
        otp
      });
    });
  } else {
    return res.status(422).json({
      message: "Email Already exits !",
      isSent: false,
    });
  }
}
// send email on OTP for Password Change
export const sendOTPOnEmailChange = async (req, res, schema) => {
  const { email } = req.body;

  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service
    auth: {
      user: process.env.ADMIN_EMAIL, // Your email address
      pass: process.env.ADMIN_EMAIL_PASSWORD // Your email password or app-specific password
    }
  });

  // random otp
  let otp = generateOTP();

  // html template
  let html = `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Yadgar Fashions OTP</title>
</head>
<body style="margin:0; padding:0; background-color:#f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f5f5f5; padding: 32px 0;">
    <tr>
      <td align="center">
        <table width="100%" max-width="600" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff; padding:24px; border-collapse:collapse; width:100%; max-width:600px;">
          <tr>
            <td align="center">
              <img src="https://yadgarfashions.s3.us-east-2.amazonaws.com/profile/logo.png" width="120" style="display:block; max-width:100%; height:auto;" alt="Yadgar Fashions" />
            </td>
          </tr>
          <tr>
            <td style="padding:24px 0;">
              <h1 style="margin:0; font-family:Poppins, sans-serif; font-weight:400; font-size:24px;">Hi</h1>
              <p style="margin:12px 0 0 0; font-family:sans-serif; font-size:16px; line-height:28px; text-align:left;">
                Welcome to <strong>Yadgar Fashions</strong> – Your Destination for Authentic Afghan Clothing.<br/>
                Discover and customize your perfect traditional outfit with us!
              </p>
            </td>
          </tr>
          <tr>
            <td style="border:1px solid #eee; padding:24px;">
              <h2 style="font-family:Poppins, sans-serif; margin:0 0 12px 0; font-size:20px;">OTP Verification Code</h2>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="background-color:#910a52; padding:12px 0; border-radius:4px;">
                    <span style="color:#ffffff; font-family:sans-serif; font-size:28px; font-weight:600; letter-spacing:2px;">
                      ${otp}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-top:24px;">
              <a href="https://www.yadgarfashions.com" style="text-decoration:none; color:#333333; font-family:sans-serif; font-size:14px;">
                www.yadgarfashions.com
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>

    `

  // Setup email data
  let mailOptions = {
    from: process.env.ADMIN_EMAIL, // Sender address
    to: email, // List of receivers
    subject: "Yadgar Fashions OTP", // Subject line
    html // Plain text body
  };

  const findEmail = await UserModel.findOne({ email });
  if (findEmail) {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error)
        return res.status(500).json({
          message: "Sending failed",
          isSent: false,
        });
      return res.status(200).send({
        message: "Email sent",
        isSent: true,
        otp
      });
    });
  } else {
    return res.status(422).json({
      message: "Email Already exits !",
      isSent: false,
    });
  }
}

// send email on OTP
export const sendEmailForRating = async (req, res, schema) => {
  const { email } = req.body;
  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service
    auth: {
      user: process.env.ADMIN_EMAIL, // Your email address
      pass: process.env.ADMIN_EMAIL_PASSWORD // Your email password or app-specific password
    }
  });

  // html template
  let html = `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Thank You for Your Purchase!</title>
</head>
<body style="margin:0; padding:0; background-color:#f9fafb; font-family: Arial, sans-serif;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#f9fafb; padding:30px 0;">
    <tr>
      <td align="center">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color:#ffffff; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.1); padding:30px; text-align:center;">
          <tr>
            <td style="padding-bottom:20px;">
              <h1 style="color:#910a52; margin:0; font-size:28px; font-weight:bold;">Thank You for Your Purchase!</h1>
            </td>
          </tr>
          <tr>
            <td style="color:#333333; font-size:16px; line-height:1.5; padding-bottom:15px;">
              Dear Customer,<br />
              We hope you are happy with your order. Your feedback is very important to us to help improve our service.
            </td>
          </tr>
          <tr>
            <td style="color:#333333; font-size:16px; line-height:1.5; padding-bottom:30px;">
              Please take a moment to rate your experience by clicking the button below.
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-bottom:30px;">
              <a href="${process.env.FRONTEND_URL}/profile/delivered" target="_blank" rel="noopener noreferrer" style="background-color:#910a52; color:#ffffff; text-decoration:none; padding:15px 30px; font-size:18px; font-weight:bold; border-radius:6px; display:inline-block;">
                Rate Your Order
              </a>
            </td>
          </tr>
          <tr>
            <td style="color:#999999; font-size:12px; line-height:1.4;">
              If you did not place this order or have any questions, please contact our support team.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `

  // Setup email data
  let mailOptions = {
    from: process.env.ADMIN_EMAIL, // Sender address
    to: email, // List of receivers
    subject: "Yadgar Fashions Rating", // Subject line
    html // Plain text body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error)
      return res.status(500).json({
        message: "Sending failed",
        isSent: false,
      });
    return res.status(200).send({
      message: "Email sent",
    });
  });

}


// send email on order
export const sendOrderEmail = async (orders) => {
  const email = orders[0]?.email || process.env.ADMIN_RECEIVE_EMAIL;
  const totalPrice = orders[0]?.totalPrice || 0;
  const orderDate = new Date().toLocaleDateString();

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_EMAIL_PASSWORD,
    },
  });

  // html template
  let html = `
    <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Order Received - Yadgar Fashions</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 6px; padding: 30px;">

            <!-- Logo and Company Name -->
            <tr>
              <td align="center" style="padding-bottom: 20px;">
                <img src="https://yadgarfashions.s3.us-east-2.amazonaws.com/profile/logo.png" alt="Yadgar Fashions Logo" style="max-width: 120px; height: auto; display: block; margin-bottom: 10px;" />
                <h1 style="margin: 0; font-size: 20px; color: #333333;">Yadgar Fashions LLC</h1>
              </td>
            </tr>

            <!-- Order Received Message -->
            <tr>
              <td style="text-align: center;">
                <h2 style="color: #333333;">Order Received (Pending Confirmation)</h2>
                <p style="color: #666666; font-size: 16px; text-align: left;">
                  Hello ${email},
                </p>
                <p style="color: #666666; font-size: 16px;text-align: justify;">
                  We've received your custom clothing order placed on <strong>${orderDate}</strong>. Please review the details below carefully.
                </p>
                <p style="color: #cc0000; font-size: 16px; font-weight: bold;text-align: justify">
                  You have 24 hours from now to cancel or modify your order.
                </p>
                <p style="color: #666666; font-size: 16px; text-align: justify">
                  To request changes or cancellation, please contact us within 24 hours via:
                </p>
                <p style="color: #333333; font-size: 15px; font-weight: bold;text-align: justify">
                  </i> Email: <a href="mailto:yadgar.fashions@gmail.com" style="color: #0d6efd;">yadgar.fashions@gmail.com</a><br />
                  WhatsApp: Available on <a href="https://www.yadgarfashions.com" style="color: #0d6efd;text-align: justify">www.yadgarfashions.com</a>
                </p>
                <p style="color: #666666; font-size: 16px;text-align: justify">
                  After 24 hours, the order will be confirmed and no longer cancellable.
                </p>
              </td>
            </tr>

            <!-- Order Details -->
            <tr>
              <td style="padding: 20px 0;">
                <div style="width:100%; margin-bottom: 10px; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between;align-items: center;">
                  <h3 style="color: #333333;">Order Details</h3>
                  <h3 style="color: #333333;">Total Amount In US Dollars :  $ ${totalPrice}</h3>
                </div>
                ${orders.map((item, index) => (
    `
                <h3 style="color: #333333; padding-bottom: 10px; border-bottom: 1px solid #ddd">
                Product : ${index + 1}
                </h3>
                <table width="100%" cellpadding="5" cellspacing="0" style="padding-bottom: 10px; border-bottom: 1px solid #ddd; font-size: 15px; color: #555;">
                  <tr>
                    <td width="30%" style="font-weight: bold;">Order Date:</td>
                    <td>${orderDate}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold;">Product Name:</td>
                    <td>${item.productName}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold;">Quantity:</td>
                    <td>${item.productQty}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold;">Color:</td>
                    <td>
                    <div style="border-radius:50%; width: 20px; height: 20px; background-color: ${item.productColor};"></div>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold;">Size:</td>
                    <td>${item.productSize}</td>
                  </tr>
                </table>
                        `
  ))
    }
                <!-- Custom Size Section -->
                <div style="margin-top: 20px;">
                  <h5>Note : </h5>
                  <p style="text-align: justify;color: red;">
                    If your order is a custom order, please 
                    kindly review and verify your measurements 
                    within 24 hours before the order is confirmed. 
                    Once confirmed, changes or modifications to the 
                    custom size will not be possible
                  </p>
                </div>
                <!-- Highlights Section -->
                <div style="margin-top: 20px;">
                  <h4 style="color: #333333; padding-top: 15px; border-top: 1px solid #eee;">Additional Highlights</h4>
                  <p style="font-size: 15px; color: #555;">
                    
                  </p>
                </div>
              </td>
            </tr>

            <!-- Contact & Footer -->
            <tr>
              <td style="text-align: center; padding: 20px;">
                <p style="color: #777; font-size: 14px;">
                  Need help? Email us at
                  <a href="mailto:yadgar.fashions@gmail.com" style="color: #0d6efd;">yadgar.fashions@gmail.com</a> or visit
                  <a href="https://www.yadgarfashions.com" style="color: #0d6efd;">www.yadgarfashions.com</a>
                </p>
              </td>
            </tr>

            <tr>
              <td style="text-align: center; font-size: 12px; color: #aaa; padding-top: 10px;">
                © 2025 Yadgar Fashions LLC. All rights reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
    `;

  let mailOptions = {
    from: process.env.ADMIN_EMAIL,
    to: [email, process.env.ADMIN_RECEIVE_EMAIL],
    subject: "Yadgar Fashions - Order Confirmation",
    html: html,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("❌ Email send failed:", error);
        reject(error);
      } else {
        console.log("✅ Email sent:", info.messageId);
        resolve(info);
      }
    });
  });
};

// send email on cancel
export const sendEmailOnCancel = async (req, res) => {
  const data = req.body;
  const { email } = data;
  const toDay = new Date();
  const cancelDate = formatDate(toDay);
  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service
    auth: {
      user: process.env.ADMIN_EMAIL, // Your email address
      pass: process.env.ADMIN_EMAIL_PASSWORD // Your email password or app-specific password
    }
  });

  // html template
  let html = `
    <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Order Cancellation - Yadgar Fashions</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 6px; padding: 30px;">
            <!-- Logo and Brand Name -->
            <tr>
              <td align="center" style="padding-bottom: 20px;">
                <img src="https://yadgarfashions.s3.us-east-2.amazonaws.com/profile/logo.png" alt="Yadgar Fashions Logo" style="max-width: 120px; height: auto; display: block; margin-bottom: 10px;" />
                <h1 style="margin: 0; font-size: 20px; color: #333333;">Yadgar Fashions </h1>
              </td>
            </tr>

            <!-- Email Content -->
            <tr>
              <td style="text-align: center;">
                <h2 style="color: #910a52;">Order Cancellation Confirmed</h2>
                <p style="color: #666666; font-size: 16px; text-align: left;">
                  Hello ${email},
                </p>
                <p style="color: #666666; font-size: 16px; text-align: justify;">
                  Your request to cancel your order has been successfully processed. A refund of <strong>$ ${data?.refundAmount}</strong> will be issued to your original payment method within <strong>48 office hours</strong>.
                </p>
                <p style="color: #666666; font-size: 16px; text-align: justify;">
                  Thank you for shopping with <strong>Yadgar Fashions</strong>. We appreciate your interest in our traditional clothing and hope to serve you again in the future.
                </p>
              </td>
            </tr>

            <!-- Order Details -->
              <tr>
              <td style="padding: 20px 0;">
                <h3 style="color: #333333; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Order Details</h3>
                <table width="100%" cellpadding="5" cellspacing="0" style="font-size: 15px; color: #555;">
                  <tr>
                    <td width="30%" style="font-weight: bold;">Product Name:</td>
                    <td>${data?.productName}</td>
                  </tr>
                  <tr>
                    <td width="30%" style="font-weight: bold;">Order No:</td>
                    <td>${data.orderId}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold;">Quantity:</td>
                    <td>${data?.quantity}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold;">Refund Amount:</td>
                    <td>$ ${data?.refundAmount}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold;">Cancellation Date</td>
                    <td>${cancelDate}</td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="text-align: center; padding: 20px;">
                <p style="color: #777; font-size: 14px;">
                  If you have any questions or need further assistance, please contact us at
                  <a href="mailto:yadgar.fashions@gmail.com" style="color: #0d6efd;">yadgar.fashions@gmail.com</a>
                  or visit our website:
                  <a href="https://www.yadgarfashions.com" style="color: #0d6efd;">www.yadgarfashions.com</a>
                </p>
              </td>
            </tr>

            <tr>
              <td style="text-align: center; font-size: 12px; color: #aaa; padding-top: 10px;">
                © 2025 Yadgar Fashions LLC. All rights reserved.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
    `;

  // Setup email data
  let mailOptions = {
    from: process.env.ADMIN_EMAIL, // Sender address
    to: [email, process.env.ADMIN_RECEIVE_EMAIL], // List of receivers
    subject: "Yadgar Fashions", // Subject line
    html // Plain text body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({
        message: "Sending failed",
        isSent: false,
      });
    }
    return res.status(200).send({
      message: "Email sent",
      isSent: true,
    });
  });

}

// send email on register
export const sendEmailOnRegister = async (req, res) => {
  const data = req.body;
  const { email } = data;
  const { fullname } = data;
  const { password } = data;
  const toDay = new Date();
  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service
    auth: {
      user: process.env.ADMIN_EMAIL, // Your email address
      pass: process.env.ADMIN_EMAIL_PASSWORD // Your email password or app-specific password
    }
  });

  // html template
  let html = `
    <!DOCTYPE html>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Account Created</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f6f9;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    h2 {
      color: #333333;
    }
    p {
      font-size: 15px;
      color: #555555;
    }
    .info-box {
      background-color: #f1f1f1;
      border-left: 5px solid #4CAF50;
      padding: 15px;
      margin: 20px 0;
      border-radius: 5px;
    }
    .label {
      font-weight: bold;
      color: #333;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #999999;
      margin-top: 30px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Account Successfully Created 🎉</h2>
    <p>Hello dear ${fullname} ,</p>
    <p>Your account has been successfully created. Below are your login details:</p>

    <div class="info-box">
      <p><span class="label">Username:</span> <span>${email}</span></p>
      <p><span class="label">Password:</span> <span>${password}</span></p>
    </div>

    <p>We recommend logging in and changing your password as soon as possible for security reasons.</p>
    <p>If you have any questions or need support, feel free to contact us at <a href="mailto:yadgar.fashions@gmail.com">yadgar.fashions@gmail.com</a>.</p>

    <p>Best regards,<br/>The Yadgar Fashions Team</p>

    <div class="footer">
      &copy; 2025 Yadgar Fashions]. All rights reserved.
    </div>
  </div>
</body>
</html>
    `;

  // Setup email data
  let mailOptions = {
    from: process.env.ADMIN_EMAIL,
    to: [email],
    subject: "Yadgar Fashions", // Subject line
    html // Plain text body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Sending failed",
        isSent: false,
      });
    }
    return res.status(200).send({
      message: "Email sent",
      isSent: true,
    });
  });

}
