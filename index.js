const Docker = require('dockerode');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

var docker = new Docker({ socketPath: '/var/run/docker.sock' });

run();

async function run() {
    docker.createContainer({ Image: 'myimage1:1.0', name: 'test1' }, (err, container) => {
        if (err) {
            console.log(err);
        } else {
            exec(`docker cp ./temp/abc.java ${container.id}:Main.java && docker cp ./languages/scripts/java.sh ${container.id}:java.sh`).then((stdout, stderr) => {
                container.start((err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        container.attach({ stream: true, stdout: true, stderr: true }, function (err, stream) {
                            stream.pipe(process.stdout);
                            sleep(5000).then(() => {
                                container.kill((err, data) => {
                                    container.remove((err, data) => {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            console.log(data);
                                        }
                                    });
                                });
                            });
                        });
                    }
                });
            });
        }
    });
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}