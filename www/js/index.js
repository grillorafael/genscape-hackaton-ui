/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {

    // represents the device capability of launching ARchitect Worlds with specific features
    isDeviceSupported: false,

    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    onDeviceReady: function() {
        app.wikitudePlugin = cordova.require("com.wikitude.phonegap.WikitudePlugin.WikitudePlugin");
        app.wikitudePlugin._sdkKey = 'hlt/VBWCHDb4FmxPFFh5qjErDHr0Ao8WZB0dGCCa6xIn3tWmFA36+HNPQn3FDaeWPqCQqdynFHWqIBx/ex2M4V6RtHuLaWlokr5Uny3sCSVMUFcuFlhGPuc1xDx2hkJ8o4aQPFOTgP/wKLCfAn/5KcYplQqwr9OJbxSKcf0MUfpTYWx0ZWRfXzdm9NPM2ORjRWwKbqZnFGKihM4zkQS7GCCDeglNT9PhCLUqN3ywEc/DHK4ckU+dn1kqNAt+WRKxJUv89xaGWwYLU+LDseeWSEnJOZPGniDylP0wWZbbh+iHRV3H6oCVxeJLlUdXOcDRtRtugzalxfuWu4W4qfQS5bpMuJ0/1CqdtjXERO1RRMb8W+QPnZUyt2VZw/9LWNnf2dyspoLZ9B86jyAAm91B5A1xepyF6h39RHRMc5FiYwrrrmcxRMHtoArHYUiWenm5C6k73g+hKq0SwlcwpksphJihDcqxA8n5HGFVW2R21HYI+BUk47PpJ6a8OTM2e6lkWSJmDFc+i/vATVaMyEBv869UEiw71saUPcaUvsaDwdcnav9M6wWok8h3+b7meA1UJ+PcUhU7bE/KVFIOUEiqF7xYEi9GBzJC3zunKnOAkiHQhuKWE71YtZN67OrDea6NYFYVqONurqFGiiA4XGdPLkbdhRen+f6eEt11MZQp7ik=';

        // app.loadARchitectWorld({
        // 		"path": "www/world/1_ClientRecognition_1_ImageOnTarget/index.html",
        // 		"requiredFeatures": [
        // 				"2d_tracking"
        // 		],
        // 		"startupConfiguration": {
        // 				"camera_position": "back"
        // 		}
        // });

        app.loadARchitectWorld({
            "path": "www/world/4_PointOfInterest_1_PoiAtLocation/index.html",
            "requiredFeatures": [
                "geo"
            ],
            "startupConfiguration": {
                "camera_position": "back"
            }
        });
    },
    // --- Wikitude Plugin ---
    // Use this method to load a specific ARchitect World from either the local file system or a remote server
    loadARchitectWorld: function(example) {
        // check if the current device is able to launch ARchitect Worlds
        app.wikitudePlugin.isDeviceSupported(function() {
                app.wikitudePlugin.setOnUrlInvokeCallback(app.onUrlInvoke);
                // inject poi data using phonegap's GeoLocation API and inject data using World.loadPoisFromJsonData
                if (example.requiredExtension === "ObtainPoiDataFromApplicationModel") {
                    navigator.geolocation.getCurrentPosition(onLocationUpdated, onLocationError);
                }

                app.wikitudePlugin.loadARchitectWorld(function successFn(loadedURL) {
                        /* Respond to successful world loading if you need to */
                    }, function errorFn(error) {
                        alert('Loading AR web view failed: ' + error);
                    },
                    example.path, example.requiredFeatures, example.startupConfiguration
                );
            }, function(errorMessage) {
                alert(errorMessage);
            },
            example.requiredFeatures
        );
    },
    loadCustomARchitectWorldFromURL: function(url) {
        var world = {
            "path": url,
            "requiredFeatures": [
                "2d_tracking",
                "geo"
            ],
            "startupConfiguration": {
                "camera_position": "back"
            }
        };
        app.loadARchitectWorld(world);
    },
    // This function gets called if you call "document.location = architectsdk://" in your ARchitect World
    onUrlInvoke: function(url) {
            if (url.indexOf('captureScreen') > -1) {
                app.wikitudePlugin.captureScreen(
                    function(absoluteFilePath) {
                        alert("snapshot stored at:\n" + absoluteFilePath);
                    },
                    function(errorMessage) {
                        alert(errorMessage);
                    },
                    true, null
                );
            } else {
                alert(url + "not handled");
            }
        }
        // --- End Wikitude Plugin ---
};

app.initialize();
