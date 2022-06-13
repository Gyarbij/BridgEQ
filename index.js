/**
 * v1
 *
 * @url https://github.com/Gyarbij/BridgEQ
 * @author Gyarbij <Gyarbij@pm.me>
 *
 **/

 'use strict';

 module.exports = function (homebridge) {
   let MercedesPlatform = require('./src/platform.js')(homebridge);
   homebridge.registerPlatform('homebridge-mercedesme', 'MercedesPlatform', MercedesPlatform, true);
 };
 