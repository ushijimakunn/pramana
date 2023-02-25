document.addEventListener("turbolinks:load", function() {
  if(document.URL.match('/start')) {
    const startBtn = document.getElementById('trial_start_btn');
    const stopBtn = document.getElementById('trial_stop_btn');
    const endtBtn = document.getElementById('trial_end_btn');
    const resetBtn = document.getElementById('trial_reset_btn');
    let count;

    // 音声ON/OFFの処理
    const stopAudioBtn =  document.getElementById('stop_audio');
    const startAudioBtn =  document.getElementById('start_audio');
    const audioEl = document.getElementById('non_audio');
    stopAudioBtn.addEventListener("click", event => {
      $('#stop_audio').hide();
      $('#start_audio').show();
      audioEl.id = 'non_audio'
    });
    startAudioBtn.addEventListener("click", event => {
      $('#stop_audio').show();
      $('#start_audio').hide();
      audioEl.id = 'audio'
    });
    
    $('#trial_start_btn').on('click', function(){
      $("#trial_start_btn").hide();
      $("#trial_stop_btn").show();
      // 音声再生
      const audio = document.getElementById('audio');
      if (audio !== null) { audio.play(); }

      countDown();
      count = setInterval(countDown,1000);
    });

    $('#trial_stop_btn').on('click', function(){
      // startBtn.disabled = false;
      $("#trial_start_btn").show();
      $("#trial_stop_btn").hide();
      clearInterval(count);
    });

    $('#trial_end_btn').on('click', function(){
      alert('瞑想終了');
      clearInterval(count);
      window.location.href = '/end';
    });

    $('#trial_reset_btn').on('click', function(){
      clearInterval(count);
      document.getElementById('min').value="3";
      document.getElementById('sec').value="0";
      document.getElementById('trial_start_btn').disabled=false;
    });

    function countDown(){
      let min = parseInt(document.getElementById('min').value);
      let sec = parseInt(document.getElementById('sec').value);
      if (!min) min=0;
      if (!sec) sec=0;
      let mindfulTime = min*60 + sec - 1;
      if(mindfulTime <= 0){
        document.getElementById('min').value = 0 ; 
        document.getElementById('sec').value = 0 ;
        audioToAlert();
        clearInterval(count);
      }else{
        document.getElementById('min').value=Math.floor(mindfulTime / 60);
        document.getElementById('sec').value=Math.floor(mindfulTime % 60);
      }    
    }
    
    // 音声再生関数
    function audioFunc() {
      return new Promise(resolve => {
        const audio = document.getElementById('audio');
        if (audio !== null) { audio.play();}
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    }
    
    async function audioToAlert() {
      await audioFunc();
      alert('瞑想終了');
      window.location.href = '/end';
    }

  }
});