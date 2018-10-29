    var api, autho, backgroundRGB, key;
    api = "https://kanjialive-api.p.mashape.com/api/public/search/advanced/?kanji=%E8%A6%AA";
    //"https://kanjialive-api.p.mashape.com/api/public/search/advanced/?kanji=%E8%A6%AA"
    autho = "X-Mashape-Authorization";
    key = "vmV1yBNhyAmshNCUsFigRG26pHvAp1ua1o5jsnedTyVw5PYtXI";


    var loadquote = function() {
        $.ajax({
                type: "GET",
                url: api,
                data: {},
                dataType: 'json',
                success: function(data) {
                $("#quote-text").html('"' + data[0].kanji.character + '"');
                $("#quote-author").html('&mdash;' + ' ' + data[0].radical.character);  
                $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?text=' + '"' + data[0].kanji.character + '"' + ' ' + ' ' + ' ' + ' \u2014' + ' ' + data[0].radical.character).attr('target', '_blank');
                $('#facebook-quote').attr('href', 'https://m.facebook.com/?hrc=1&refsrc=http%3A%2F%2Fh.facebook.com%2Fhr%2Fr&_rdr=' + '"' + data[0].kanji.character + '"' + ' ' + ' ' + ' ' + ' \u2014' + ' ' + data[0].radical.character).attr('target', '_blank');
                },
                error: function(err) { alert("Internet Disconnected!"); },
                beforeSend: function(xhr) {
                    xhr.setRequestHeader(autho, key);
                }
        });
    };





    

    var backgroundChange = function() {
        x = Math.floor(Math.random() * 256);
        y = Math.floor(Math.random() * 256);
        z = Math.floor(Math.random() * 256);
        backgroundRGB = "rgb(" + x + "," + y + "," + z + ")";
       document.body.style.backgroundColor = backgroundRGB;
       document.getElementById("quote-text").style.color = backgroundRGB;
       document.getElementById("tweet-quote").style.color = backgroundRGB;
       document.getElementById("quote-author").style.color = backgroundRGB;
       document.getElementById("facebook-quote").style.color = backgroundRGB;
       document.getElementById("new-quote").style.color = backgroundRGB;
    }

    

   
    var transition = function() {
        document.getElementById("quote-box").style.transition = "all 2s";
    }
    $("#new-quote").on("click", function() {
        loadquote();
        backgroundChange();
        transition();
    })
    //coded by teegoldz