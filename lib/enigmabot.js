
'use strict';

var util = require('util');
var path = require('path');
var fs = require('fs');
var Bot = require('slackbots');

var RESPONSES = {
    'enigma':       'Enigma is building a decentralized, open, secure data marketplace that will change how data is shared, ' +
                    'aggregated and monetized to maximize collaboration. Catalyst is our first product and the first application ' + 
                    'running on our Enigma protocol. Powered by our financial data marketplace, Catalyst empowers users to share ' +
                    'and curate data and build profitable, data-driven investment strategies.\n\n' +
                    'We further explain the relationship between Enigma (the company and data marketplace) and ' +
                    'Catalyst (our product) in our recent blog post series (https://blog.enigma.co/beyond-catalyst-enigmas-vision-for-the-future-of-data-22fbb5845556)',
    'tokensale':    'The Enigma token crowdsale begins on August 21, 2017 and runs through August 31, 2017. ' +
                    'The hard cap is $30M. 50M ENG tokens are being sold at a price of $0.60. There are 100M ' + 
                    'total ENG tokens.\n\n' +
                    'The minimum investment for the crowdsale is $60USD, or 100 ENG. There will be no ' +
                    'discount or bonus offered during the crowdsale.\n\n' +
                    'The token crowdsale is open to US investors.',
    'presale':      'The presale is ongoing. Minimum buy-in is USD100K or equivalent in ETH. If you are a US ' +
                    'citizen, you have to be an accredited investor otherwise you are fine if you can meet the ' +
                    'minimum amount. We are giving 20% discount if you are willing to lock 50% of your tokens for ' +
                    '1 year or 10% discount if you want to get the tokens right away. The discount structure will ' +
                    'change in time. We can take fiat or ETH. Please email can@enigma.co for more presale ' +
                    'details and to participate.',
    'exchanges':    "We are already in conversation with some highly respected exchanges. We can’t disclose any " +
                    "details at this time, but rest assured we are doing everything in our power to get listed. It's in " +
                    "our best interest as well as the community's.",
    'team':         "Enigma is run by a group of MIT graduates and MIT Media Lab researchers. We have backing " +
                    "from major VCs including Floodgate, Flybridge, Digital Currency Group, and others. We have " +
                    "5 full time employees. Our full team and investors can be found on our homepage: https://www.enigma.co",
    'bounty':       "We have a social bounty program (https://bitcointalk.org/index.php?topic=2057194) and a content creation bounty program active. If you’re " +
                    "interested in joining our social bounty and receiving ENG, please read the instructions in the " +
                    "social bounty program thread (linked above). If you’re interested in creating blog or video " +
                    "content for Enigma in exchange for ENG, please contact tor@enigma.co with a description of " +
                    "the content you intend to create and details about your platforms and audience.\n\n" +
                    "The Enigmarines are an elite group of social promoters that earn additional ENG for " +
                    "spreading the word about our project and token sale. If you’re interested in joining, please " +
                    "message @tor.",
    'sec':          "According to the legal advice from our excellent lawyers, ENG is a utility token and it does not " +
                    "constitute a security. We have complied and intend to comply with all guidance from " +
                    "regulatory bodies.",
    'whitelist':    "The whitelist is only open for members of the Enigma community - those of you who " +
                    "participate in our Slack or Telegram (https://t.me/enigmacatalyst) groups. The whitelist guarantees access for the first hour " +
                    "of our crowdsale. The application can be found here: https://goo.gl/forms/Xgx4sz3emvaGewkr1\n\n" +
                    "You are only guaranteed ENG within the range you selected for the whitelist. If you need to " +
                    "change this range, please resubmit the whitelist form.",
    'help':         "Enigma Bot at your service. The following are valid commands: " +
                    "!enigma, !tokensale, !presale, !exchanges, !team, !bounty, !sec, !whitelist"
}

var EnigmaBot = function Constructor(settings) {
    this.settings = settings;
    this.settings.name = this.settings.name || 'enigmacatalystbot';
    this.user = null;
};

EnigmaBot.prototype.run = function () {
    EnigmaBot.super_.call(this, this.settings);

    this.on('start', this._onStart);
    this.on('message', this._onMessage);
};

EnigmaBot.prototype._onStart = function () {
	this._loadBotUser();
};

EnigmaBot.prototype._loadBotUser = function () {
    var self = this;
    this.user = this.users.filter(function (user) {
        return user.name === self.name;
    })[0];
};

EnigmaBot.prototype._onMessage = function (message) {
    if (this._isChatMessage(message) &&
        this._isChannelConversation(message) &&
        !this._isFromEnigmaBot(message)
    ) {
        this._handleMessage(message);
    }
};

EnigmaBot.prototype._isChatMessage = function (message) {
    return message.type === 'message' && Boolean(message.text);
};

EnigmaBot.prototype._isChannelConversation = function (message) {
    return typeof message.channel === 'string' &&
        message.channel[0] === 'C';
};

EnigmaBot.prototype._isFromEnigmaBot = function (message) {
    return message.user === this.user.id;
};

EnigmaBot.prototype._getChannelById = function (channelId) {
    return this.channels.filter(function (item) {
        return item.id === channelId;
    })[0];
};

EnigmaBot.prototype._handleMessage = function (message) {
    if (message.text.startsWith('!')) {
        var cmd = message.text.toLowerCase().substring(1);
        if (RESPONSES[cmd]) {
            var channel = this._getChannelById(message.channel);
            this.postMessageToChannel(channel.name, RESPONSES[cmd], {as_user: true});
        }
    }
};

// inherits methods and properties from the Bot constructor
util.inherits(EnigmaBot, Bot);

module.exports = EnigmaBot;