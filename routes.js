const express = require('express');
const Docker = require('dockerode');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
const config = require('./config.js');

const docker = new Docker({ socketPath: '/var/run/docker.sock' });
const router = express.Router();

router.route('/run').post(async (req, res) => {
    try {
        let language = config.languages[req.body.language];
        if (typeof language === 'undefined') {
            res.status(400).send('Language not supported');
            return;
        }
        let randomName = Math.random().toString(36).substring(7);
        await fs.writeFileSync(`./temp/${randomName}`, req.body.code);
        const container = await docker.createContainer({ Image: language.docker, Cmd: ['./run.sh'], name: randomName });
        await exec(`docker cp ./temp/${randomName} ${container.id}:${language.file} && docker cp ./languages/${language.script} ${container.id}:run.sh`);
        container.start();
        const stream = await container.attach({ stream: true, stdout: true, stderr: true });
        res.status(200);
        res.setHeader('content-type', 'text/html');
        stream.on('data', (chunk) => { res.write(chunk.toString(), 'utf8') });
        stream.on('end', () => { res.end() });
        await sleep(5000);
        container = docker.getContainer(container.name);
        if (container.status == 'running') {
            await container.kill();
        }
        await container.remove();
        await fs.unlinkSync(`./temp/${randomName}`);
    } catch (err) {
        try{
            await container.remove();
        } catch (err) {

        }
        console.log(err);
    }
});

router.route('/languages').get((req, res) => {
    let l = [];
    for (const property in config.languages) {
        l.push(config.languages[property].name);
    }
    res.send(l);
});

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

module.exports = router;
