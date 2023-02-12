const { event } = require("jquery");

document.addEventListener("turbolinks:load", function() {
  // 瞑想実施ページの処理を記載
  if(document.URL.match('/mindfuls/new')) {
    const startBtn =  document.getElementById('start_btn');
    const stopBtn =  document.getElementById('stop_btn');
    const endBtn =  document.getElementById('end_btn');
    const resetBtn =  document.getElementById('reset_btn');
    let numberStartBtn = 0; // スタートボタンのクリック回数を定義。
    let count; // カウントダウンタイマーの定義

    // Rails側に渡すmindfulness_typeのIDをクエリ文字列から取得
    const searchParams = new URLSearchParams(window.location.search);
    const typeIdParams = searchParams.get('mindfulness_type_id');

    // 音声ON/OFFの処理
    const stopAudioBtn =  document.getElementById('stop_audio');
    const startAudioBtn =  document.getElementById('start_audio');
    const audioFunc = document.getElementById('non_audio');
    stopAudioBtn.addEventListener("click", event => {
      $('#stop_audio').hide();
      $('#start_audio').show();
      audioFunc.id = 'non_audio'
    });
    startAudioBtn.addEventListener("click", event => {
      $('#stop_audio').show();
      $('#start_audio').hide();
      audioFunc.id = 'audio'
    });

    // スタートボタンを押した時の処理
    startBtn.addEventListener("click", event => {
      $('#end_btn').show();
      $('#start_btn').hide();
      let mindfulMin = parseInt(document.getElementById('mindful_min').value);
      let mindfulSec = parseInt(document.getElementById('mindful_sec').value);
      if(!mindfulMin){ mindfulMin = 0 }
      if(!mindfulSec){ mindfulSec = 0 }
      let mindfulTime = mindfulMin * 60 + mindfulSec;
      // 音声再生
      const audio = document.getElementById('audio');
      if (audio !== null) { audio.play(); }
      // startBtn.disabled = true;

      // カウントダウンの時間を表示,LocalStrageへ開始時間と瞑想時間を保存
      if (numberStartBtn==0) {
        $('#min').replaceWith(`<span id='min'>${ mindfulMin }<span>`);
        $('#sec').replaceWith(`<span id='sec'>${ mindfulSec }<span>`);
        let today = Date.now();
        localStorage.setItem('start_date', today);
        localStorage.setItem('mindful_time', mindfulTime);
      }
      // カウントダウン処理
      const localStartDate = localStorage.getItem('start_date');
      const localMindfulTime = localStorage.getItem('mindful_time');
      count = setInterval(function(){countFunc(localStartDate, localMindfulTime)},1000);
    });
  
    // ストップボタンを押した時の処理
    // stopBtn.addEventListener("click", event => {
    //   startBtn.disabled=false;
    //   numberStartBtn += 1;
    //   clearInterval(count);
    // });

    // エンドボタンを押した時の処理
    endBtn.addEventListener("click", event => {
      clearInterval(count);
      // 瞑想開始時間と今の時間の差を計算
      const startDate = localStorage.getItem('start_date');
      let nowDate = Date.now();
      let spendTime = Math.floor((nowDate - startDate)/1000);
      alert(spendTime + '秒を記録する');

      localStorage.removeItem('start_date') // localStrageの値をリセット
      localStorage.removeItem('mindful_time') // localStrageの値をリセット

      const data = {'time': spendTime, 'type_id': typeIdParams};
      $.ajax({
        url: "/mindfuls/",
        type: "POST",
        data: data,
        success: function () {
          console.log('success');
        },
        error: function () {
          console.log('fails');
        }
      });

    });
  
    // リセットボタンを押した時の処理
    resetBtn.addEventListener("click", event => {
      // startBtn.disabled=false;
      $('#end_btn').hide();
      $('#start_btn').show();
      numberStartBtn = 0; //スタートボタン押した回数のリセット
      localStorage.removeItem('start_date') // localStrageの値をリセット
      localStorage.removeItem('mindful_time') // localStrageの値をリセット
      document.getElementById('min').innerHTML="0";
      document.getElementById('sec').innerHTML="0";
      clearInterval(count);
    });

    // リロードが入っても、カウントダウンを継続
    if(localStorage.getItem('start_date')){
      startBtn.disabled = true;
      // 関数に渡す値を取得
      const localStartDate = localStorage.getItem('start_date');
      const localMindfulTime = localStorage.getItem('mindful_time');
      count = setInterval(function(){countFunc(localStartDate, localMindfulTime)},1000);
    }else{
      console.log('LocalStrageの値は空');
    } 

    // 1秒ごとに実施されるカウントダウン関数
    function countFunc(startDate, mindfulTime) {
      let nowDate = Date.now();
      let spendTime = Math.floor((nowDate - startDate)/1000);
      let leftTime = mindfulTime - spendTime
      //差分の分・秒を取得
      const leftMin = Math.floor(leftTime / 60);
      const leftSec = Math.floor(leftTime % 60);

      //残り時間を上書き
      document.getElementById("min").innerHTML = leftMin;
      document.getElementById("sec").innerHTML = leftSec;
      
      // 音声再生
      if(leftTime == 0){
        const audio = document.getElementById('audio');
        if (audio !== null) { audio.play(); }
      }
      
      //0になればカウントを止める
      if (leftTime <= 0) {
        // Rails側に渡す値を格納
        const data = {'time': mindfulTime, 'type_id': typeIdParams};

        localStorage.removeItem('start_date') // localStrageの値をリセット
        clearInterval(count);
        alert('瞑想終了！！');
        // dataをmindfuls_controllerに渡し、mindfuls/createアクションを実施。
        $.ajax({
          url: "/mindfuls/",
          type: "POST",
          data: data,
          success: function (data) {
            console.log('success');
          },
          error: function (data) {
            console.log('fails');
          }
        });
      }
    }
  }
});





