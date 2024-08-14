const nodemailer = require('nodemailer');

function sendEmailEventNotification(event) {
  const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "cs222calendar@gmail.com",
        pass: "pfdg dzbc wxac tjzb",
      },
    });

    const mailOptions = {
    from: 'cs222calendar@gmail.com',
    to: event.admin_email_address.concat(", ", attendees_emails),
    subject: event.event_name.concat(" is happening on ", event.event_date, " at ", event.event_time, "!"),
    text: event.event_name.concat(" is happening on ", event.event_date, " at ", event.event_time, "!\nDescription: ", event.event_description,
                      "\nMeeting URL: ", event.meeting_url, "\nDocument URL: ", event.notes_doc_url, "\nAttendees: ", events.attendees_emails),
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
};

function sendEmailReminderNotification(reminder) {
  const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "cs222calendar@gmail.com",
        pass: "pfdg dzbc wxac tjzb",
      },
    });

    const mailOptions = {
    from: 'cs222calendar@gmail.com',
    to: reminder.email_address,
    subject: reminder.reminder_name.concat(" is happening on ", reminder.reminder_date, " at ", reminder.reminder_time, "!"),
    text: reminder.reminder_name.concat(" is happening on ", reminder.reminder_date, " at ", reminder.reminder_time, "!\nDescription: ", reminder.reminder_description),
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
};

const nodemailer = require('nodemailer');

function httpGetAsync(url, callback) {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
      callback(xmlHttp.responseText);
  }
  xmlHttp.open("GET", url, true); // true for asynchronous
  xmlHttp.send(null);
}


function httpGetAsync(url, callback) {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
      callback(xmlHttp.responseText);
  }
  xmlHttp.open("GET", url, true); // true for asynchronous
  xmlHttp.send(null);
}

function getPhoneCarrier(phone_number) {
  const url = "https://phonevalidation.abstractapi.com/v1/?api_key=9f04942ae9ab433bad10f74e0bb57552&phone=".concat(phone_number);
  carrier1 = httpGetAsync(url).carrier;
  phone_email = phone_number;
  switch(carrier1) {
    case "T-Mobile USA, Inc.":
      phone_email = phone_email.concat("@tmomail.net");
      break;
    case "AT&T":
      phone_email = phone_email.concat("@txt.att.net");
      break;
    case "Verizon":
      phone_email = phone_email.concat("@vtext.com");
      break;
    default:
      phone_email = null;
      break;
  }
}

function sendTextEventNotification(event, user) {
  const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "cs222calendar@gmail.com",
        pass: "pfdg dzbc wxac tjzb",
      },
    });
    phone_email = getPhoneCarrier(user.phone_number);
    if (phone_email == null) {
      console.error("Invalid phone number.");
    }
    const mailOptions = {
    from: 'cs222calendar@gmail.com',
    to: phone_email,
    subject: event.event_name.concat(" is happening on ", event.event_date, " at ", event.event_time, "!"),
    text: event.event_name.concat(" is happening on ", event.event_date, " at ", event.event_time, "!\nDescription: ", event.event_description,
                      "\nMeeting URL: ", event.meeting_url, "\nDocument URL: ", event.notes_doc_url, "\nAttendees: ", events.attendees_emails),
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending text: ", error);
    } else {
      console.log("Text sent: ", info.response);
    }
  });
};

function sendTextReminderNotification(reminder, user) {
  const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "cs222calendar@gmail.com",
        pass: "pfdg dzbc wxac tjzb",
      },
    });
    phone_email = getPhoneCarrier(user.phone_number);
    if (phone_email == null) {
      console.error("Invalid phone number.");
    }
    const mailOptions = {
    from: 'cs222calendar@gmail.com',
    to: phone_email,
    subject: reminder.reminder_name.concat(" is happening on ", reminder.reminder_date, " at ", reminder.reminder_time, "!"),
    text: reminder.reminder_name.concat(" is happening on ", reminder.reminder_date, " at ", reminder.reminder_time, "!\nDescription: ", reminder.reminder_description),
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
};