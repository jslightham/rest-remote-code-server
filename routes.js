const express = require('express');
const router = express.Router();

router.route('/run').post((req, res) => {
    try {
        const container = await docker.createContainer({ Image: 'myimage1:1.0', name: 'test1' });
        if (err) {
            console.log(err);
        }

        await exec(`docker cp ./temp/abc.java ${container.id}:Main.java && docker cp ./languages/scripts/java.sh ${container.id}:java.sh`);
        await container.start();
        const stream = await container.attach({ stream: true, stdout: true, stderr: true });
        stream.pipe(process.stdout);
        await sleep(5000);
        await container.kill();
        await container.remove();
    } catch (err) {
        console.log(err);
    }
});

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

module.exports = router;