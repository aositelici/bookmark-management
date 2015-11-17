$(document).ready(function(){

  var bookmarks = $("div").html();

  $("input:text").bind("input propertychange",function(){

    var origin = $(this).val();
    clearHighLight(bookmarks);
    highLightMatchingword(origin);
  });
});

function clearHighLight(bookmarks) {
  $("div").html(bookmarks);
}

function highLightMatchingword(origin) {
  if(origin !== "") {

    $("p").html(function(i,origText){

      var patten = new RegExp("("+origin+")","ig");
      return origText.replace(patten,'<span style="background-color:#f54698">'+'$1'+'</span>');
    });
  }
}
