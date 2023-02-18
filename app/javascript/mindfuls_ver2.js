const { event } = require("jquery");

document.addEventListener("turbolinks:load", function() {
  
  // 瞑想実施ページの処理を記載
  if(document.URL.match('/mindfuls/new')) {
    // Rails側に渡すmindfulness_typeのIDをクエリ文字列から取得
    const searchParams = new URLSearchParams(window.location.search);
    const typeIdParams = searchParams.get('mindfulness_type_id');
    
    let intervalId; //カウントダウンタイマー
    let leftTimeSec; // 残り時間 (秒)
    let startTime; // スタートした時刻（Date 型）


    // スタートボタンクリック時
    const startBtn =  document.getElementById('start_btn');
    startBtn.addEventListener('click', event => {
      let mindfulMin = parseInt(document.getElementById('mindful_min').value);
      let mindfulSec = parseInt(document.getElementById('mindful_sec').value);
      if(!mindfulMin){ mindfulMin = 0 }
      if(!mindfulSec){ mindfulSec = 0 }
      let mindfulTimeSec = mindfulMin * 60 + mindfulSec;
      startCountdown(mindfulTimeSec);
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
    function startCountdown(mindfulTimeSec){
      if (leftTimeSec > 0){
        console.log(leftTimeSec); // startTimeをストップしていた時間だけずらす
      } else{
        startTime = new Date();
        leftTimeSec = mindfulTimeSec;
      }

      intervalId = setInterval(function(){
        console.log('a');
      }, 1000);

    }
    
    function stopCountdown(){
      console.log('stopCount');
    }
    
    function resetCountdown(){
      console.log('resetCount');
    }
    
    function endCountdown(){
      console.log('endCount');
    }

  }
});





