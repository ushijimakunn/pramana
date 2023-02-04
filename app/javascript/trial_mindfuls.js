document.addEventListener("turbolinks:load", function() {
  if(document.URL.match('/start')) {
    const startBtn = document.getElementById('trial_start_btn');
    const stopBtn = document.getElementById('trial_stop_btn');
    const endtBtn = document.getElementById('trial_end_btn');
    const resetBtn = document.getElementById('trial_reset_btn');
    let count;
    
    $('#trial_start_btn').on('click', function(){
      $("#trial_start_btn").hide();
      $("#trial_stop_btn").show();
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
      clearInterval(count);
      alert('瞑想終了');
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
        clearInterval(count);
        alert('瞑想終了');
        window.location.href = '/end';
      }else{
        document.getElementById('min').value=Math.floor(mindfulTime / 60);
        document.getElementById('sec').value=Math.floor(mindfulTime % 60);
      }    
    }
  }
});