var Docker = require('dockerode');

var docker = new Docker({socketPath: '/var/run/docker.sock'});

docker.createContainer({Image: 'myimage1:1.0', name: 'test1'}, (err, container) => {
    if (err) {
        console.log(err);
    } else {
        container.start((err, data) => {
        if (err) {
            console.log(err);
        } else {
            container.attach({stream: true, stdout: true, stderr: true}, function (err, stream) {
                stream.pipe(process.stdout);
              });
        }
        });
    }
})