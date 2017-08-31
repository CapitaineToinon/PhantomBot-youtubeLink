/*
 * Your YouTube API Key
 *
 * Check the YouTube API documentation to key your own key
 * https://developers.google.com/youtube/v3/getting-started
 */
$.lang.register('youtube.linked.api.key', '');

/*
 * Values used by the youtubeLinkHandler.js file
 * DO NOT CHANGE
 */
$.lang.register('youtube.linked.api.url', 'https://www.googleapis.com/youtube/v3/videos?part=id,statistics,snippet&id=$1&key=$2');
$.lang.register('youtube.linked.regex', /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([\w-]{11})(?:.+)?$/);
$.lang.register('youtube.linked.output', 'Linked video : "$1" by $2 | $3 views ($4% likes)');
$.lang.register('youtube.linked.help', 'YouTube API Key not found. Get your own Key : https://developers.google.com/youtube/v3/getting-started and add the Key to the lang handlers-youtubeLinkHandlers.js file.');
