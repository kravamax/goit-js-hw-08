var throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

let videoplayer_current_time = '';
const lastPlayingTime = localStorage.getItem('videoplayer_current_time');

const timeLog = function (data) {
  localStorage.setItem('videoplayer_current_time', data.seconds);
};

player.setCurrentTime(lastPlayingTime);
player.on('timeupdate', throttle(timeLog, 1000));
