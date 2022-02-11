const fs = require('fs');
const {Transform} = require('stream');
const ACCESS_LOG = './access.log';
const IP_ADDRESSES = [
    '34.48.240.111',
    '89.123.1.41',
]
const writeStreams = {};

IP_ADDRESSES.forEach((ip) => {
    writeStreams[`${ip}`] = fs.createWriteStream(`${ip}_requests.log`, 'utf-8');
});

const readStream = fs.createReadStream(ACCESS_LOG);
const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        chunk
            .toString()
            .split(/\n/)
            .forEach((str) => {
                for (let ip of IP_ADDRESSES) {
                    if (str.includes(ip)) {
                        writeStreams[ip].write(`${str}\n`);
                    }
                }
            });
        callback();
    }
})

readStream.pipe(transformStream);