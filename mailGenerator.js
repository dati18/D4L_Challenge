//1.000.000 random email addresses to test

import stringify from 'csv-stringify';
import fs from 'fs';
import randomEmail from "random-email";

let data = [];
let columns = {
    name: 'Email'
};

let hrstart = process.hrtime();
for (let i = 0; i < 1000000; i++) {
    let fakeMail = randomEmail({domain: 'example.com'});
    data.push([fakeMail]);
}

stringify(data, { header: false, columns: columns }, (err, output) => {
    if (err) throw err;
    fs.writeFile('./mails.csv', output, (err) => {
        if (err) throw err;
        console.log('mails.csv saved.');
    });
});

let hrend = process.hrtime(hrstart);

console.log ("Execute time: "+ hrend[0], hrend[1]/1000000);