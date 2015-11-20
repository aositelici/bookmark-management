$(document).ready(function(){

  $.getJSON("bookmark.json", function(data){
    $.each(data, function(i, field){
      appendbookmark(field.title,field.created);
    });

    var bookmarks = $(".content").html();
    $("input:text").bind("input propertychange",function(){
      var inputWord = $(this).val();
      highLightMatchingword(inputWord ,data, bookmarks);
    });
  });

  function appendbookmark(title,createdDate) {
    var content='<p class="bookmark">' + title + '</p>';
    var formatDate = getFormatDate(createdDate);
    var date = $("<p></p>").text(formatDate).addClass("date");
    var line = $("<hr>").addClass("line");
    $(".content").append(content);
    $(".content").append(date);
    $(".content").append(line);
  }

  function getFormatDate(number) {
    var date = new Date(parseInt(number)*1000);
    return 'created@' + date.getFullYear() + '-' + (date.getMonth()+1) + '-' + (date.getDate()+1);
  }

  function highLightMatchingword(inputWord, data, bookmarks) {
    if(inputWord !== "") {
      clearHtml();

      var patten = new RegExp("("+inputWord+")","ig");
      data.filter(function (subData){
        return patten.test(subData.title);
      })
      .map(function (subData){
        var highLightBookmark = subData.title.replace(patten,'<span style="background-color:#f54698">'+'$1'+'</span>');
        appendbookmark(highLightBookmark,subData.created);
      });

    } else {
      showInitBookmark(bookmarks);
    }
  }

  function clearHtml() {
     $(".content").html("");
  }

  function showInitBookmark(bookmarks) {
    $(".content").html(bookmarks);
  }
});
