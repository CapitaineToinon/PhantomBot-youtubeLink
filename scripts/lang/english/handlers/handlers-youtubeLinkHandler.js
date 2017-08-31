$.lang.register('youtube.linked.api.url', 'https://www.googleapis.com/youtube/v3/videos?part=id,statistics,snippet&id=$1&key=$2');
$.lang.register('youtube.linked.regex', /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([\w-]{11})(?:.+)?$/);
$.lang.register('youtube.linked.output', 'Linked video : "$1" by $2 | $3 views ($4% likes)');
$.lang.register('youtube.linked.api.key', 'AIzaSyDzr7ZYGPGQ9z-4O-2TDhbhIcMms7PDfDk');