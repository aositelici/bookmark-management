$(document).ready(function(){

  $.getJSON("../bookmark.json",function(result){
    $.each(result, function(i, field){

      var content=$("<p></p>").text(field["title"]);
      $("div").append(content);
    });

    var bookmarks = $("div").html();

    $("input:text").bind("input propertychange",function(){

      var origin = $(this).val();
      clearHighLight(bookmarks);
      highLightMatchingword(origin);
    });
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
