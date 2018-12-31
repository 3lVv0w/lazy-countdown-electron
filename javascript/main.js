var NEW_YEAR = 15462756e5

var isResumed = false
var isNewYear = false

document.addEventListener('DOMContentLoaded', () => {
  var container = document.querySelector('.container')
  var countdown = document.querySelector('#countdown')
  var newYear = document.querySelector('#newyear')

  document.querySelector('body').addEventListener('click', function () {
    if (isNewYear) {
      var audioEl = document.querySelector('audio')

      if (audioEl) {
        audioEl.play()
      } else {
        window.createAudio()
      }
    }
  })

  window.createAudio = function () {
    var audio = document.createElement('audio')

    audio.src = './assets/media/newyear.mp3'
    audio.play()

    container.appendChild(audio)
  }

  window.itsNewYear = function () {
    isNewYear = true

    countdown.style.display = 'none'

    newYear.style.display = 'block'

    createAudio()
  }

  window.timer = setInterval(function () {
    var ms = NEW_YEAR - Date.now()
    var secs = Math.floor(ms / 1000)

    var hours = Math.floor(secs / 3600);
    var minutes = Math.floor((secs - (hours * 3600)) / 60);
    var seconds = secs - (hours * 3600) - (minutes * 60);

    document.querySelector('#countdown').innerHTML = hours.toFixed(0).padStart(2, '0') + ":" + minutes.toFixed(0).padStart(2, '0') + ":" + seconds.toFixed(0).padStart(2, '0');

    // Happy New Year!
    if (Date.now() >= NEW_YEAR) {
      clearInterval(timer)

      itsNewYear()

      return
    }

    // 60 Seconds before New Year
    if (secs <= 60) {
      document.querySelector('#countdown').className = 'critical'
    }
  }, 1000)

  var controller = new Controller()
  controller.init()
  requestAnimationFrame(controller.animation)
})