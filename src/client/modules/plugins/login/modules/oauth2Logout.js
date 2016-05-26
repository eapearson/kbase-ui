/*global true*/
/*jslint white:true,browser:true */
define([
    
], function () {
    'use strict';
    function factory(config) {
        var runtime = config.runtime;
        
        function makePathUrl(path) {
            var loc = window.location;
            
            return loc.protocol + '//' + loc.host + loc.pathname + '#' + path;
        }
        
        function start(params) {
             if (runtime.service('session').isLoggedIn()) {
                    // redirect to the checkauth
                    runtime.send('app', 'redirect', {
                        url: '/oauth2/logout',
                        params: {
                            redirect_url: makePathUrl('goodbye')
                        }
                    });
                    // window.location.href = checkAuth;
                    return true;
                } else {
                    runtime.send('app', 'navigate', {
                        path: 'welcome'
                    });
                }
        }
        return {
            start: start
        };
    }

    return {
        make: function (config) {
            return factory(config);
        }
    };
});