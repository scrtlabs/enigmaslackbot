
'use strict';

var EnigmaBot = require('../lib/enigmabot');

var token = process.env.BOT_API_KEY;
var name = process.env.BOT_NAME;

var enigmabot = new EnigmaBot({
    token: token,
    name: name
});

enigmabot.run();