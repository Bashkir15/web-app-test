const { appendFile } = require('fs');
const { resolve } = require('path');

function log(req, res, next) {
    // These were originally var statements but were never re-assigned
    // This was probably just an artifact from a tutorial but
    // as a general guideline there is no situation that I have encountered
    // or can think of where you should use var instead of let or const
    const now = new Date().toString();
    const message = `${now}: ${req.method} ${req.url}`;
    appendFile('../server.log', `${log}\n`, (err) => {
        if (err) {
            console.log(`Unable to append to server.log at ${now}`);
        }
    });

    // Do you know why next is called here?
    next();
}

module.exports = log;
