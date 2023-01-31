document.addEventListener("turbolinks:load", function() {
  // 瞑想実施ページの処理を記載
  if(document.URL.match('/mindfuls/new')) {
    const startBtn =  document.getElementById('start_btn');
    const stopBtn =  document.getElementById('stop_btn');
    const resetBtn =  document.getElementById('reset_btn');

    if(localStorage.getItem('start_time')){
      startTime = localStorage.getItem('start_time');
      nowTime = Date.now();
      diffTime = nowTime - startTime;
      console.log(diffTime+'m秒');
    }else{
      console.log('LocalStrageの値は空');
    }
    
    let numberStartBtn = 0; // スタートボタンのクリック回数を定義。
    let count; // カウントダウンタイマーの定義
    
    // スタートボタンを押した時の処理
    startBtn.addEventListener("click", event => {
      // 音声再生
      const audio = document.getElementById('audio');
      if (audio !== null) { audio.play(); }

      startBtn.disabled=true;
      // カウントダウンの時間を表示
      numberStartBtn += 1;
      if (numberStartBtn==1) {
        $('#min').replaceWith(`<span id='min'>${ $('#mindful_min').val() }<span>`);
        $('#sec').replaceWith(`<span id='sec'>${ $('#mindful_sec').val() }<span>`);
        let today = Date.now();
        localStorage.setItem('start_time', today);
      }

      // Rails側に渡す瞑想時間を定義（秒）
      const mindfulMin = parseInt(document.getElementById('mindful_min').value) * 60;
      const mindfulSec = parseInt(document.getElementById('mindful_sec').value);
      const mindfulTime = mindfulMin + mindfulSec;

      // Rails側に渡すmindfulness_typeのIDをクエリ文字列から取得
      const searchParams = new URLSearchParams(window.location.search);
      const typeIdParams = searchParams.get('mindfulness_type_id');

      // Rails側に渡す値を格納
      const data = {'time': mindfulTime, 'type_id': typeIdParams};

      // カウントダウン処理
      count = setInterval(function(){
        const min = parseInt(document.getElementById('min').innerHTML);
        const sec = parseInt(document.getElementById('sec').innerHTML);
        const leftTime = min * 60 + sec - 1
        
        //差分の分・秒を取得
        const difMin = Math.floor(leftTime / 60)
        const difSec = Math.floor(leftTime % 60)
        
        //残り時間を上書き
        document.getElementById("min").innerHTML  = difMin
        document.getElementById("sec").innerHTML  = difSec
  
        //0になればカウントを止める
        if(leftTime <= 0) {
          // 音声再生
          if (audio !== null) { audio.play(); }

          document.getElementById('min').innerHTML="0";
          document.getElementById('sec').innerHTML="0";
          clearInterval(count)
          alert('瞑想終了！！');
          // dataをmindfuls_controllerに渡し、mindfuls/createアクションを実施。
          $.ajax({
            url: "/mindfuls/",
            type: "POST",
            data: data,
            success: function(data){
              console.log('success')
            },
            error: function(data){
              console.log('fails')
            }
          });
        }
      },1000);
    });
  
    // ストップボタンを押した時の処理
    stopBtn.addEventListener("click", event => {
      startBtn.disabled=false;
      clearInterval(count);
    });
  
    // リセットボタンを押した時の処理
    resetBtn.addEventListener("click", event => {
      startBtn.disabled=false;
      numberStartBtn = 0; //スタートボタン押した回数のリセット
      localStorage.removeItem('start_time') // localStrageの値をリセット
      document.getElementById('min').innerHTML="0";
      document.getElementById('sec').innerHTML="0";
      clearInterval(count);
    });

    const stopAudioBtn =  document.getElementById('stop_audio');
    const startAudioBtn =  document.getElementById('start_audio');
    const audioFunc = document.getElementById('audio');
    
    // 音声ON/OFFの処理
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
  }
});





