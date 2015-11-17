$(document).ready(function(){
  $("input:text").bind("input propertychange",function(){

    var origin = $(this).val();
    var length = origin.length;
    var patten = new RegExp(origin,"ig");
    var text = $("p").text();
    while (result = patten.exec(text)){
      console.log(result);
    }
  });
});
