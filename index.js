const Docker = require('dockerode');
const config = require('./config');

const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const util = require('util');
const exec = util.promisify(require('child_process').exec);

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

app.listen(8000, () => {
    console.log("Express listening on port 8000");
})