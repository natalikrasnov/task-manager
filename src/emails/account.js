const cgMail = require('@sendgrid/mail')
const sendGridApiKey = process.env.SENDGRID_API_KEY

cgMail.setApiKey(sendGridApiKey)
cgMail.send({
    to: 'nata555560@gmail.com',
    from: 'nata555560@gmail.com',
    subject: 'this is my first email from service',
    text: 'i hope this is not a spam'
})

const sendWelcomeEmail = (email, name)=>{
    cgMail.send({
        to: email,
        from: 'nata555560@gmail.com',
        subject: 'Thanks for joining in!',
        text: 'Welcom to the app, ${name} . let me know how you get along with this app!!'
    })
}

const sendCancelationEmail = (email ,name)=> {
    cgMail.send({
        to:email,
        from: 'nata555560@gmail.com',
        subject: 'Sorry to see you you go!',
        text: 'Goodbye, ${name}. I hope to see you back sometime soon'
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}
