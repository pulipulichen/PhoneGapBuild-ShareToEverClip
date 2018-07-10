var FILTER_SUBJECT = [
    "Text Scanner"
];

intent_handler = function (intent) {
    alert("換了 可以嗎？");
    //alert(JSON.stringify(intent));
    if (typeof (intent.action) === "string"
            && intent.action === "android.intent.action.MAIN") {
        return openActivityDefault();
    }

    var _url = extractURL(intent);
    if (_url !== undefined) {
        intent.extras = {
            "android.intent.extra.TEXT": _url
        };
    } 
    
    openActivityDefault(intent);
};

openActivityDefault = function (intent) {
    intent.package = "com.noinnion.android.everclip";
    intentStartActivity(intent);
};

// --------------------------

extractURL = function (intent) {
    if (typeof (intent.extras) === "object") {
        var _needles = ["http://", "https://"];
        var _needles_foot = [" ", "\n"];
        for (var _key in intent.extras) {
            var _value = intent.extras[_key];
            for (var _i = 0; _i < _needles.length; _i++) {
                var _needle = _needles[_i];
                if (_value.indexOf(_needle) > -1) {
                    var _url = _value.substring(_value.indexOf(_needle), _value.length);
                    for (var _j = 0; _j < _needles_foot.length; _j++) {
                        var _needle_foot = _needles_foot[_j];
                        if (_url.indexOf(_needle_foot) > -1) {
                            _url = _url.substr(0, _url.indexOf(_needle_foot));
                        }
                    }

                    _url = _url.trim();
                    return _url;
                }
            }
        }
    }
};

intentStartActivity = function (_config) {
    if (typeof(_config.extras) === "object") {
        var _extras = _config.extras;
        if (typeof(_extras["beginTime"]) === "string") {
            eval('_extras["beginTime"] = ' + _extras["beginTime"]);
        }
    }
    window.plugins.webintent.startActivity(_config,
            function () {
                navigator.app.exitApp();
            },
            function (e) {
                alert('Start activity failed:' + JSON.stringify(e, null, 2));
                navigator.app.exitApp();
            }
    );
};