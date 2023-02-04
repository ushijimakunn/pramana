document.addEventListener("turbolinks:load", function() {
  if(location.pathname==="/") {
    $("header").addClass('absolute')
    $("header").removeClass('bg-[#036635]')
  }else{
    $("header").removeClass('absolute')
  }
});