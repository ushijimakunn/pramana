document.addEventListener("turbolinks:load", function() {
  // 瞑想実施ページの処理を記載
  if(document.URL.match('/mindfuls/new')) {
    const startBtn =  document.getElementById('start_btn');
    const stopBtn =  document.getElementById('stop_btn');
    const resetBtn =  document.getElementById('reset_btn');
    let numberStartBtn = 0; // スタートボタンのクリック回数を定義。
    let count; // カウントダウンタイマーの定義

    // 音声ON/OFFの処理
    const stopAudioBtn =  document.getElementById('stop_audio');
    const startAudioBtn =  document.getElementById('start_audio');
    const audioFunc = document.getElementById('audio');
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
      const mindfulMin = document.getElementById('mindful_min').value * 60;
      const mindfulSec = document.getElementById('mindful_sec').value;
      console.log(mindfulMin);
      console.log(mindfulSec);
      const mindfulTime = mindfulMin + mindfulSec;
      // 音声再生
      const audio = document.getElementById('audio');
      if (audio !== null) { audio.play(); }
      startBtn.disabled = true;

      // カウントダウンの時間を表示,LocalStrageへ開始時間と瞑想時間を保存
      if (numberStartBtn==0) {
        $('#min').replaceWith(`<span id='min'>${ $('#mindful_min').val() }<span>`);
        $('#sec').replaceWith(`<span id='sec'>${ $('#mindful_sec').val() }<span>`);
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
    stopBtn.addEventListener("click", event => {
      startBtn.disabled=false;
      numberStartBtn += 1;
      clearInterval(count);
    });
  
    // リセットボタンを押した時の処理
    resetBtn.addEventListener("click", event => {
      startBtn.disabled=false;
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
      //0になればカウントを止める
      if (leftTime <= 0) {
        // Rails側に渡すmindfulness_typeのIDをクエリ文字列から取得
        const searchParams = new URLSearchParams(window.location.search);
        const typeIdParams = searchParams.get('mindfulness_type_id');
        
        // Rails側に渡す値を格納
        const data = {'time': mindfulTime, 'type_id': typeIdParams};
        console.log(data);
        //音声再生
        const audio = document.getElementById('audio');
        if (audio !== null) { audio.play(); };

        localStorage.removeItem('start_date') // localStrageの値をリセット
        clearInterval(count);
        document.getElementById('min').innerHTML = "0";
        document.getElementById('sec').innerHTML = "0";
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




    // // リロードが入っても、カウントダウンを継続
    // if(localStorage.getItem('start_time')){
    //   startBtn.disabled=true;
    //   // 開始時間をLocalStrageから取得
    //   startDate = localStorage.getItem('start_time');
    //   nowDate = Date.now();
    //   diffTime = nowDate - startDate
    //   const calcMin = Math.floor(diffTime / 1000 / 60) % 60;
    //   const calcSec = Math.floor(diffTime / 1000) % 60;
    //   const calcTime = calcMin * 60 + calcSec;
    //   // 瞑想時間をHTMLから取得
    //   const mindfulMin = parseInt(document.getElementById('mindful_min').value) * 60;
    //   const mindfulSec = parseInt(document.getElementById('mindful_sec').value);
    //   const mindfulTime = mindfulMin + mindfulSec;

    //   //残り時間から処理を実行
    //   const lastTime = mindfulTime - calcTime;
    //   console.log(lastTime/60 +'分');
    //   //瞑想設定時間ー経過時間＞０
    //   if (lastTime >= 0){
    //     document.getElementById("min").innerHTML = Math.floor(lastTime / 60);
    //     document.getElementById("sec").innerHTML = Math.floor(lastTime % 60);
    //     // カウントダウン処理
    //     countFunc();
    //     count = setInterval(countFunc,1000);
    //   }else if(lastTime <= 0){
    //     //  タイマーを書き換え,カウントダウン処理を継続
    //     //＜＝0の時
    //     //  瞑想終了のアラート＋経過時間＋超過時間をサーバー側に渡す
    //     startBtn.disabled=false;
    //     localStorage.removeItem('start_time') // localStrageの値をリセット
    //     console.log(lastTime/60 +'分');
    //     alert('時間超過したので、瞑想終了！！');
    //   }
    // }else{
    //   console.log('LocalStrageの値は空');
    // }
    
   
  }
});





