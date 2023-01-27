// $(function() {
//   console.log( document.getElementById('start_btn') );
// });

// var time_interval;
// var mindful_sec;

// function cntStart() {
//   document.getElementById('start_btn').disabled=true;
//   time_interval = setInterval('countDown()',1000);
//   sec_mindful = parseInt(document.getElementById('mindful_min').value) * 60;
//   $('#min').replaceWith(`<span id='min'>${ $('#mindful_min').val() }<span>`);
// }

// function cntStop(){
//   document.getElementById('start_btn').disabled=false;
//   clearInterval(time_interval);
// }

// function countDown(){
//   var min = document.getElementById('min').innerHTML;
//   var sec = document.getElementById('sec').innerHTML;
//   if((min=='')&&(sec=='')){
//     alert('please input number');
//     reSet();
//   }
//   else{
//     if (min=="") min=0;
//     min = parseInt(min);
//     if (sec=="") sec=0;
//     sec = parseInt(sec);
    
//     tmWrite(min*60 + sec - 1);
//   }
  
// }

// function tmWrite(int){
//   int = parseInt(int);
//   if(int<=0){
//     reSet();
//     alert('瞑想時間を記録する！');
//     // createメソッドを実行。paramsに値を渡す。
//         $.ajax({
//           url: "/mindfuls/",
//           type: "POST",
//           data: {time : sec_mindful},
//           datatype: "html",
//           success: function(data){
//             console.log('success')
//           },
//           error: function(data){
//             console.log('fails')
//           }
//         });
//     console.log(sec_mindful)
//     // window.location.href = '/end'
//   }else{
//     document.getElementById('min').innerHTML=Math.floor(int/60);
//     document.getElementById('sec').innerHTML=int % 60;
//   }
// }

// function reSet()
// {
//   document.getElementById('min').innerHTML="0";
//   document.getElementById('sec').innerHTML="0";
//   document.getElementById('start_btn').disabled=false;
//   clearInterval(time_interval);
// }  
