$(document).ready(function(){
  $.ajaxSettings.async = false;

  var data;
  $.getJSON("bookmark.json",function(bookmarks){
      data = bookmarks;
  });

  $.each(data, function(i, field){

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
  highLightMatchingword(origin);
});




function clearHighLight(bookmarks) {
  $(".content").html(bookmarks);
}
function clearHtml() {
   $(".content").html("");
}

function highLightMatchingword(origin) {
  if(origin !== "") {
    clearHtml();
    var patten = new RegExp("("+origin+")","ig");
    var filteingData = data.filter(function (subData){
      return patten.test(subData.title);
    });
    filteingData.map(function (subData){

      var highLightBookmark = subData.title.replace(patten,'<span style="background-color:#f54698">'+'$1'+'</span>');
      var content='<p class="bookmark">' + highLightBookmark + '</p>';
      var formatDate = getDate(subData.created);
      var date = $("<p></p>").text(formatDate).addClass("date");
      var line = $("<hr>").addClass("line");
      $(".content").append(content);
      $(".content").append(date);
      $(".content").append(line);
    });
  }
  else {
    clearHighLight(bookmarks);
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
});
