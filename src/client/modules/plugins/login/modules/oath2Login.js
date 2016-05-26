/*global true*/
/*jslint white:true,browser:true */
define([
    
], function () {
    'use strict';
    function factory(config) {
        var runtime = config.runtime;
        function start(params) {
             if (!runtime.service('session').isLoggedIn()) {
                    // capture the path
                    var url = window.location.href;
                    var checkAuth = '/oauth2/check_auth?redirect_url=' + encodeURIComponent(url);

                    // redirect to the checkauth
                    runtime.send('app', 'redirect', {
                        url: checkAuth
                    });
                    // window.location.href = checkAuth;
                    return true;
                } else {
                    runtime.send('app', 'navigate', {
                        path: 'dashboard'
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