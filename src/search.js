$(document).ready(function(){

  $.getJSON("bookmark.json",function(result){

    $.each(result, function(i, field){
      var content=$("<p></p>").text(field["title"]).addClass("bookmark");
      var formatDate = getDate(field["created"]);
      var date = $("<p></p>").text(formatDate).addClass("date");
      var line = $("<hr>").addClass("line");
      $(".content").append(content);
      $(".content").append(date);
      $(".content").append(line);

    });

    var bookmarks = $(".content").html();
    $("input:text").bind("input propertychange",function(){
      var origin = $(this).val();
      clearHighLight(bookmarks);
      highLightMatchingword(origin);
    });
  });
});

function clearHighLight(bookmarks) {
  $(".content").html(bookmarks);
}

function highLightMatchingword(origin) {
  if(origin !== "") {

    $("p").html(function(i,origText){

      var patten = new RegExp("("+origin+")","ig");
      return origText.replace(patten,'<span style="background-color:#f54698">'+'$1'+'</span>');
    });
  }
}

function getDate(number) {

  var date = new Date(parseInt(number));
  var year = date.getFullYear().toString();
  var month = (date.getMonth()+1).toString();
  var day = date.getDate().toString();
  var formatDate = 'created@' + year + '-' + month + '-' + day;
  return formatDate;
}
