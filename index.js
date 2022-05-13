const Docker = require('dockerode');
const config = require('./config');

const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const util = require('util');
const exec = util.promisify(require('child_process').exec);

// Load certs from the config file.
const privateKey = fs.readFileSync(config.ssl.key, 'utf8');
const certificate = fs.readFileSync(config.ssl.cert, 'utf8');
const ca = fs.readFileSync(config.ssl.ca, 'utf8');

const credentials = {
        key: privateKey,
        cert: certificate,
        ca: ca
};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const run = require('./routes.js');
app.use('/run', run);

var docker = new Docker({ socketPath: '/var/run/docker.sock' });

// Pull all images on startup & make sure all scripts are executable
for (const property in config.languages) {
    exec("chmod +x ./languages/" + config.languages[property].script);
    docker.pull(config.languages[property].docker, (err, stream) => {
        if (err) {
            console.log(err);
        }
        stream.pipe(process.stdout);
    });
}

// Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(4040, () => {
        console.log('HTTP Server running on port 8080');
});

httpsServer.listen(4000, () => {
        console.log('HTTPS Server running on port 8000');
});
