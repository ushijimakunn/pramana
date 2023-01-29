document.addEventListener("turbolinks:load", function() {
  // 瞑想実施ページの処理を記載
  if(document.URL.match('/mindfuls/new')) {
    const startBtn =  document.getElementById('start_btn');
    const stopBtn =  document.getElementById('stop_btn');
    const resetBtn =  document.getElementById('reset_btn');
    let numberStartBtn = 0; // スタートボタンのクリック回数を定義。
    let count; // カウントダウンタイマーの定義
    
    // スタートボタンを押した時の処理
    startBtn.addEventListener("click", event => {
      // 音声再生
      const audio = document.getElementById('sound');
      if (audio !== null) { audio.play(); }

      startBtn.disabled=true;
      // カウントダウンの時間を表示
      numberStartBtn += 1;
      if (numberStartBtn==1) {
        $('#min').replaceWith(`<span id='min'>${ $('#mindful_min').val() }<span>`);
        $('#sec').replaceWith(`<span id='sec'>${ $('#mindful_sec').val() }<span>`);
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
      numberStartBtn = 0;
      document.getElementById('min').innerHTML="0";
      document.getElementById('sec').innerHTML="0";
      clearInterval(count);
    });
  }
});





