$( document ).ready(function() {
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex ;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
        }

        return array;
    }
    
    function sleep(miliseconds) {
       var currentTime = new Date().getTime();

       while (currentTime + miliseconds >= new Date().getTime()) {
       }
   }
    
    var upvoteArrowText;
    var downvoteArrowText;
    var upvoteHeyText = 'Ya!';
    var downvoteHeyText = 'Boo!';
    var doneOnce = false;

   var data = [
        "Radiohead",
        "Converge",
        "LCD Soundsystem",
        "The Smiths",
        "Talk Talk",
        "Todd Terje",
       "Arcade Fire",
       "Broken Social Scene"
   ];
    
    shuffle(data);
    
    $.each(data, function( index, value ) {
       $('#album_list').append('<li><span class="upvote">&#8679;&#8679;&#8679;</span> ' + value + ' <span class="downvote">&#8681;&#8681;&#8681;</span></li>');
    });
       
       $('.upvote').mouseenter(function(event) {
           if (!doneOnce){
                upvoteArrowText = $(this).text();
                downvoteArrowText = $(this).siblings().filter('.downvote').text();
                doneOnce = true;
           }
            $(this).text('Ya!');
            $(this).siblings().filter('.downvote').text('Boo!');
       }).mouseleave(function(event) {
            $(this).text(upvoteArrowText);
            $(this).siblings().filter('.downvote').text(downvoteArrowText);
       });
       
       $('.downvote').mouseenter(function(event) {
           if (!doneOnce){
                upvoteArrowText = $(this).text();
                downvoteArrowTextvoteText = $(this).siblings().filter('.downvote').text();
                doneOnce = true;
           }
            $(this).text('Boo!');
            $(this).siblings().filter('.upvote').text('Ya!');
       }).mouseleave(function(event) {
            $(this).text(downvoteArrowText);
            $(this).siblings().filter('.upvote').text(upvoteArrowText);
       });
    
    $('li').mouseenter(function() {
        $(this).toggleClass('bold');   
    }).mouseleave(function() {
        $(this).toggleClass('bold');
    });
       
    $('.upvote').click(function(event) {
        $(this).text(upvoteHeyText);
        if ($(this).siblings().filter('.downvote').css('visibility') == 'visible') {
            $(this).siblings().filter('.downvote').css('visibility', 'hidden');
       }
       else {
        $(this).siblings().filter('.downvote').css('visibility', 'visible')
       }
    });
       
       $('.downvote').click(function(event) {
           $(this).text(downvoteHeyText);
        if ($(this).siblings().filter('.upvote').css('visibility') == 'visible') {
            $(this).siblings().filter('.upvote').css('visibility', 'hidden');
       }
       else {
        $(this).siblings().filter('.upvote').css('visibility', 'visible')
       }
    });
});