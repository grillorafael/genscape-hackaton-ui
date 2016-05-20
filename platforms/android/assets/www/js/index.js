var app = {
    isDeviceSupported: false,
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        app.wikitudePlugin = cordova.require("com.wikitude.phonegap.WikitudePlugin.WikitudePlugin");
        app.wikitudePlugin._sdkKey = 'hlt/VBWCHDb4FmxPFFh5qjErDHr0Ao8WZB0dGCCa6xIn3tWmFA36+HNPQn3FDaeWPqCQqdynFHWqIBx/ex2M4V6RtHuLaWlokr5Uny3sCSVMUFcuFlhGPuc1xDx2hkJ8o4aQPFOTgP/wKLCfAn/5KcYplQqwr9OJbxSKcf0MUfpTYWx0ZWRfXzdm9NPM2ORjRWwKbqZnFGKihM4zkQS7GCCDeglNT9PhCLUqN3ywEc/DHK4ckU+dn1kqNAt+WRKxJUv89xaGWwYLU+LDseeWSEnJOZPGniDylP0wWZbbh+iHRV3H6oCVxeJLlUdXOcDRtRtugzalxfuWu4W4qfQS5bpMuJ0/1CqdtjXERO1RRMb8W+QPnZUyt2VZw/9LWNnf2dyspoLZ9B86jyAAm91B5A1xepyF6h39RHRMc5FiYwrrrmcxRMHtoArHYUiWenm5C6k73g+hKq0SwlcwpksphJihDcqxA8n5HGFVW2R21HYI+BUk47PpJ6a8OTM2e6lkWSJmDFc+i/vATVaMyEBv869UEiw71saUPcaUvsaDwdcnav9M6wWok8h3+b7meA1UJ+PcUhU7bE/KVFIOUEiqF7xYEi9GBzJC3zunKnOAkiHQhuKWE71YtZN67OrDea6NYFYVqONurqFGiiA4XGdPLkbdhRen+f6eEt11MZQp7ik=';

        app.loadARchitectWorld({
            "path": "www/world/cassino/index.html",
            "requiredFeatures": [
                "geo"
            ],
            "startupConfiguration": {
                "camera_position": "back"
            }
        });
    },
    loadARchitectWorld: function(example) {
        app.wikitudePlugin.isDeviceSupported(function() {
                app.wikitudePlugin.setOnUrlInvokeCallback(app.onUrlInvoke);
                if (example.requiredExtension === "ObtainPoiDataFromApplicationModel") {
                    navigator.geolocation.getCurrentPosition(onLocationUpdated, onLocationError);
                }

                app.wikitudePlugin.loadARchitectWorld(function successFn(loadedURL) {}, function errorFn(error) {
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
};

app.initialize();
