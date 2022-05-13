var config = {};

// Languages that the server should run.
// Name: The name of the language to be displaed to the user. This has no effect on the server.
// File: The filename that the user's content should be saved to. The script needs to run the file with this name.
// Script: The filename of the script that should be run. Place the script in the languages folder.
// Docker: The name of the docker image to be used. This will be installed when the server starts up.
config.languages = {
    'java': {
        'name': 'java',
        'file': 'Main.java',
        'script': 'java.sh',
        'docker': 'openjdk:11'
    },
    'python': {
        'name': 'python',
        'file': 'Main.py',
        'script': 'python.sh',
        'docker': 'python'
    },
    'c': {
        'name': 'c',
        'file': 'Main.c',
        'script': 'c.sh',
        'docker': 'gcc'
    }
}

// SSL certificate and key for the server.
config.ssl ={};

config.ssl.key = "/etc/letsencrypt/live/jslightham.com/privkey.pem";
config.ssl.cert = "/etc/letsencrypt/live/jslightham.com/cert.pem";
config.ssl.ca = "/etc/letsencrypt/live/jslightham.com/chain.pem";

module.exports = config;