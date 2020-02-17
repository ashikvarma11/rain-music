

var sound = new Howl({
  src: ['lovespell.mp3'],
  autoplay:true,
  loop:true
});

// Clear listener after first call.
sound.once('load', function(){
  sound.play();
});

// Fires when the sound finishes playing.
sound.on('end', function(){
  console.log('Finished!');
});


