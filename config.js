var config = {};

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

module.exports = config;