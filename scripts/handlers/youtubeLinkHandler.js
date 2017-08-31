(function () {

    var cache = {};
    var cache_lifespan = 30; // 30 seconds

    function getYouTubeVideoInfosPerUser(id, sender) {
        if (sender === '') {
            return getYouTubeVideoInfos(id);
        }
        if (!(sender in cache)) {
            cache[sender] = {};
            cache[sender]['content'] = getYouTubeVideoInfos(id);
            cache[sender]['time'] = $.systemTime();
            return cache[sender]['content'];
        } else {
            if ($.systemTime() - cache[sender]['time'] < cache_lifespan * 1000) {
                // Cache didn't expire yet so we ignore the link
                return false;
            } else {
                cache[sender] = {};
                cache[sender]['content'] = getYouTubeVideoInfos(id);
                cache[sender]['time'] = $.systemTime();

                return cache[sender]['content'];
            }
        }
    }

    function getYouTubeVideoInfos(id) {
        var key = $.lang.get('youtube.linked.api.key');
        if (key === '') {
            return $.lang.get('youtube.linked.help');
        }

        var url = $.lang.get('youtube.linked.api.url', id, key);

        var response = getCustomAPIValue(url);
        if (response) {
            var json = JSON.parse(response);
            if (json.items.length > 0) {
                var likes = parseInt(json.items[0].statistics.likeCount);
                var dislikes = parseInt(json.items[0].statistics.dislikeCount);

                var likes_ratio = likes / (likes + dislikes) * 100;
                likes_ratio = Math.round(likes_ratio);

                // Sets cooldown per user
                //$.coolDown.set('youtubeLinkHandler', true, 30, false, sender);

                return $.lang.get(
                    'youtube.linked.output',
                    json.items[0].snippet.title,
                    json.items[0].snippet.channelTitle,
                    numberWithCommas(json.items[0].statistics.viewCount),
                    likes_ratio
                );
            }
        }

        // else
        return false;
    }


    /*
    * @function getCustomAPIValue
    *
    * @param {string} url
    * @returns {string}
    */
    function getCustomAPIValue(url) {
        var HttpResponse = Packages.com.gmt2001.HttpResponse,
            HttpRequest = Packages.com.gmt2001.HttpRequest,
            HashMap = Packages.java.util.HashMap,
            responseData = HttpRequest.getData(HttpRequest.RequestType.GET, url, '', new HashMap());

        return responseData.content;
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


    /**
     * https://stackoverflow.com/a/10315969/624466
     */
    function ytVidId(message) {
        var p = $.lang.get('youtube.linked.regex');
        return (message.match(p)) ? RegExp.$1 : false;
    }


    $.bind('ircChannelMessage', function (event) {
        // All of the default methods are stored in the event argument. You can change `event` to anything you want.
        // To access a method, in this case, you would do `event.myMethod()`.

        // We are registering all method into variables to make it easier to remember.
        var message = event.getMessage();
        var sender = event.getSender();
        var tags = event.getTags();


        // But what if you want to check the message for a specific keyword? Here's how you would do it the simple way.
        var match = ytVidId(message);
        if (match) {
            if (sender === $.channelName) {
                //sender = '';
            }
            var output = getYouTubeVideoInfosPerUser(match, sender);
            if (output) {
                $.say(output);
            }
        }
    });

    /*
     * @event initReady
     */
    $.bind('initReady', function () {
        if ($.bot.isModuleEnabled('./handlers/youtubeLinkedHandler.js')) {
            $.registerChatCommand('./handlers/youtubeLinkedHandler.js');
            announceBits = true;
        }
    });
})();