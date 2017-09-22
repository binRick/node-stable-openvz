#!/usr/bin/env node

var openvzLatest = require('./');

openvzLatest(function(err, latest) {
    if (err) throw err;
    console.log(latest);
});