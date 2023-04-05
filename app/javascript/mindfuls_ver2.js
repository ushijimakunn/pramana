const { event } = require("jquery");

document.addEventListener("turbolinks:load", function() {
  
  // 瞑想実施ページの処理を記載
  if(document.URL.match('/mindfuls/new')) {
    // Rails側に渡すmindfulness_typeのIDをクエリ文字列から取得
    const searchParams = new URLSearchParams(window.location.search);
    const typeIdParams = searchParams.get('mindfulness_type_id');
    
    let intervalId; //カウントダウンタイマー
    let totalTimeSec = 0; // 瞑想時間 (秒)
    let leftTimeSec = 0; // 残り時間 (秒)
    let clickCountStBtn = 0; // スタートボタンのクリック回数

    // スタートボタンクリック時
    const startBtn =  document.getElementById('start_btn');
    startBtn.addEventListener('click', event => {
      audioFunc();
      bgVideoStart();
      $('#stop_btn').show();
      $('#end_btn').show();
      $('#start_btn').hide();
      if (clickCountStBtn == 0) {
        min = parseInt(document.getElementById('mindful_min').value)
        sec = parseInt(document.getElementById('mindful_sec').value)
        totalTimeSec = min * 60 + sec;
      }
      clickCountStBtn += 1;
      let mindfulMin = parseInt(document.getElementById('mindful_min').value);
      let mindfulSec = parseInt(document.getElementById('mindful_sec').value);
      if(!mindfulMin){ mindfulMin = 0 }
      if(!mindfulSec){ mindfulSec = 0 }
      leftTimeSec = mindfulMin * 60 + mindfulSec;
      startCountdown(leftTimeSec);
    });
    
    // ストップボタンクリック時
    const stopBtn =  document.getElementById('stop_btn');
    stopBtn.addEventListener('click', stopCountdown);
    
    // リセットボタンクリック時
    const resetBtn =  document.getElementById('reset_btn');
    resetBtn.addEventListener('click', resetCountdown);
    
    // エンドボタンクリック時
    const endBtn =  document.getElementById('end_btn');
    endBtn.addEventListener('click', endCountdown);
    

    // カウントダウン開始関数
    function startCountdown(leftTimeSec){
      intervalId = setInterval(function(){
        leftTimeSec -= 1;
        const leftMin = Math.floor(leftTimeSec / 60);
        const leftSec = Math.floor(leftTimeSec % 60);
        // 残り時間を表示
        document.getElementById('mindful_min').value = leftMin;
        document.getElementById('mindful_sec').value = leftSec;
        // 残り時間が0になったらカウントダウンを終了
        if(leftTimeSec <= 0){
          const dataToRails = {'time': totalTimeSec, 'type_id': typeIdParams};
          clearInterval(intervalId);
          alertAndSendToRails(dataToRails); 
        }
      }, 1000);
    }
    
    function stopCountdown(){
      clearInterval(intervalId);
      bgVideoStop()
      $('#stop_btn').hide();
      $('#start_btn').show();
    }
    
    function resetCountdown(){
      document.getElementById('mindful_min').value="0";
      document.getElementById('mindful_sec').value="0";
      clearInterval(intervalId);
      bgVideoStop()
    }
    
    function endCountdown(){
      clearInterval(intervalId);
      bgVideoStop()
      // 残りの瞑想時間を計算
      const endLeftMin = parseInt(document.getElementById('mindful_min').value);
      const endLeftSec = parseInt(document.getElementById('mindful_sec').value);
      const endTotalTimeSec = totalTimeSec - (endLeftMin * 60 + endLeftSec);
      alert(endTotalTimeSec + '秒を記録する');
      const dataToRails = {'time': endTotalTimeSec, 'type_id': typeIdParams};
      sendToRails(dataToRails);
    }

    
    // アラート表示、および瞑想実績データをRails側に渡す関数
    async function alertAndSendToRails(dataToRails){
      await audioFunc();
      alert('瞑想終了');
      sendToRails(dataToRails);
    }

    // 瞑想実績データをRails側に渡す
    function sendToRails(dataToRails){
      $.ajax({
        url: '/mindfuls',
        type: 'POST',
        data: dataToRails
      })
    }

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
    
    // 音声再生関数 1秒間音源を再生する
    function audioFunc() {
      return new Promise(resolve => {
        const audio = document.getElementById('audio');
        if (audio !== null) { audio.play();}
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    }

    // 背景動画再生関数
    function bgVideoStart() {
      bgVideo = document.getElementById('bg_video');
      bgVideo.play();
    }

    function bgVideoStop() {
      bgVideo = document.getElementById('bg_video');
      bgVideo.pause();
    }

  }
});





