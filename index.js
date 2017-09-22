    var fs = require('fs'),
        request = require('request'),
        linkscrape = require('linkscrape'),
        minimatch = require('minimatch'),
        url = 'https://download.openvz.org/kernel/branches/rhel6-2.6.32/stable/';

    module.exports = function(_fv) {
        request.get(url, function(err, response) {
            if (err) return _cb(err, null);
            linkscrape(url, response.body, function(links, $) {
                var hrefs = links.map(function(l) {
                    return l.href;
                }).filter(function(l) {
                    return minimatch(l, 'vzkernel-2.6.32-*.x86_64.rpm');
                });
                if (hrefs.length != 1) {
                    var latest = null;
                    err = 'Unable to parse file links';

                } else
                    var latest = hrefs[0].split('vzkernel-2.6.32-')[1].split('.x86_64.rpm')[0];
                _fv(err, latest);
            });
        });
    };