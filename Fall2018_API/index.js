    var api, api_grade, autho, backgroundRGB, key, num, word;
    //"https://kanjialive-api.p.mashape.com/api/public/search/advanced/?kanji=%E8%A6%AA"
    autho = "X-Mashape-Authorization";
    key = "vmV1yBNhyAmshNCUsFigRG26pHvAp1ua1o5jsnedTyVw5PYtXI";


var myFunction = function() {
  var input = document.getElementById("input_id").value;

  api_grade = "https://kanjialive-api.p.mashape.com/api/public/search/advanced/?grade=" + input;



    
     //?grade=6


}


var loadWord = function() {
        $.ajax({
                type: "GET",
                url: api_grade,
                data: {},
                dataType: 'json',
                success: function(data) {
                 
                 // var i = random(data.length);   
                  var num = Math.floor(Math.random() * (data.length - 0 + 1)) + 0;
                 console.log(num);
                // console.log(data);

                word = decodeURIComponent(data[num].kanji.character);

                api = "https://kanjialive-api.p.mashape.com/api/public/kanji/"+ word;
                loadquote();
              
             },
                error: function(err) { alert("Internet Disconnected!"); },
                beforeSend: function(xhr) {
                    xhr.setRequestHeader(autho, key);
                }
        });
    };




    var loadquote = function() {
        $.ajax({
                type: "GET",
                url: api,
                data: {},
                dataType: 'json',
                success: function(data) {
                 
                 // var i = random(data.length);   
                //  var num = Math.floor(Math.random() * (data.length - 0 + 1)) + 0;
                // console.log(num);
                console.log(data);

                $("#quote-text").html(data.kanji.character);
                $("#quote-author").html('&mdash;' + ' ' + data.radical.character); 
                $("#kunyomi").html('"'+ data.kanji.kunyomi.romaji+ ' -- '+data.kanji.kunyomi.hiragana+'"');
                $("#onyomi").html('"'+data.kanji.onyomi.romaji+ '  -- '+ data.kanji.onyomi.katakana+ '"');  

                // $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?text=' + '"' + data[0].kanji.character + '"' + ' ' + ' ' + ' ' + ' \u2014' + ' ' + data[0].radical.character).attr('target', '_blank');
                // $('#facebook-quote').attr('href', 'https://m.facebook.com/?hrc=1&refsrc=http%3A%2F%2Fh.facebook.com%2Fhr%2Fr&_rdr=' + '"' + data[0].kanji.character + '"' + ' ' + ' ' + ' ' + ' \u2014' + ' ' + data[0].radical.character).attr('target', '_blank');
                
             },
                error: function(err) { alert("Internet Disconnected!"); },
                beforeSend: function(xhr) {
                    xhr.setRequestHeader(autho, key);
                }
        });
    };


// <input type="text" value="请输入用户名" 
// onfocus="if(value=='请输入用户名') {value=''}" 
// onblur="if (value=='') {value='请输入用户名'}"/>



    

    var backgroundChange = function() {
        x = Math.floor(Math.random() * 256);
        y = Math.floor(Math.random() * 256);
        z = Math.floor(Math.random() * 256);
        backgroundRGB = "rgb(" + x + "," + y + "," + z + ")";
       document.body.style.backgroundColor = backgroundRGB;

       document.getElementById("quote-text").style.color = backgroundRGB;
　
       document.getElementById("quote-author").style.color = backgroundRGB;

       document.getElementById("new-quote").style.color = backgroundRGB;};
    

    

   
    var transition = function() {
        document.getElementById("quote-box").style.transition = "all 2s";
    }
    $("#new-quote" || "#input_id").on("click", function() {
        loadWord();
        backgroundChange();
        transition();
    })
    //coded by teegoldz