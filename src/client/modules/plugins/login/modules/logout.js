/*global true*/
/*jslint white:true,browser:true */
define([
    
], function () {
    'use strict';
    function factory(config) {
        var runtime = config.runtime;
        function start(params) {
            runtime.service('session').logout()
                    .then(function () {
                        // w.setState('updated', new Date());
                    })
                    .catch(function (err) {
                        console.error('ERROR');
                        console.error(err);
                        alert('Error signing out (check console for details)');
                    });
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


