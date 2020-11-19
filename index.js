const fs = require('fs');
const readline = require('readline');

const mailer = require('@sendgrid/mail');

mailer.setApiKey(process.env.SENDGRID_API_KEY); //Sendgrid API key

let mailArr = [];

// const msg = {
//     to: mailArr,
//     from: 'dattiennguyen1804@gmail.com',
//     subject: '🍩 Donuts, at the big donut 🍩',
//     text: 'Fresh donuts are out of the oven. Get them while they’re hot!',
//     html: '<p>Fresh donuts are out of the oven. Get them while they’re <em>hot!</em></p>',
// };

async function sendMail(email){
    return new Promise((resolve, _reject) => {
        setTimeout(() => resolve(`done send mail ${email}`), 500);
        // mailer.send(msg).then(() => {
        //     console.log('emails sent successfully!');
        // }).catch(error => {
        //     console.log(error);
        // });
    })
}

let readCSVAndSendMail = async () => {
    let readStream = fs.createReadStream('mails.csv', {highWaterMark: 24});
    const rl = readline.createInterface({
        input: readStream,
        crlfDelay: Infinity
    })

    for await (const line of rl) {
        if (mailArr.length >= 1000) {
            rl.pause();
            let emailsPromise = mailArr.map(email => sendMail(email));
            console.log({ emailsPromise })
            const res = Promise.all(emailsPromise);
            console.log({ res })
            mailArr = [];
            rl.resume()
        } else {
            mailArr.push(line);
            console.log(`email address: ${line}`);
        }
    }
    console.timeEnd('run')
}

console.time('run');

readCSVAndSendMail().then(r => console.log('done'));