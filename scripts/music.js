var lastfmBaseUrl = "http://ws.audioscrobbler.com/2.0/?api_key=ea0f1a71a01268c9d5fa440510e9f3fc";
var apiKey = 'ea0f1a71a01268c9d5fa440510e9f3fc';
var secondsInAWeek = 604800;

function addUrlParam(url, key, value) {
    "use strict";
    
    return url + '&' + key + '=' + value;
}

/*
* Given an object of URL parameters, returns a URL for hitting the Last.fm API
*/
function constructUrl(urlParams) {
    "use strict";
    
    var url = lastfmBaseUrl;
    
    if (urlParams !== undefined) {
        for (var key in urlParams) {
            url = addUrlParam(url, key, urlParams[key]);   
        }
    }
    
    return url;
}

/*
* Given an album object, creates 
*/
function createCoverDescription(album) {
    var albumTitle, artistName;
    
    albumTitle = album.name;
    artistName = album.artist['#text'];
    
    theUrl = constructUrl({method: 'album.getInfo', artist: artistName, album: albumTitle, format: 'json'});
    $.getJSON(theUrl, function(data) {
        var album, artist, albumTitle, imageUrl, newImg, newDiv;
        album = data.album;
        artist = album.artist;
        imageUrl = album.image[2]['#text'];
        albumTitle = album.name;
        newDiv = $('<div></div>', {class: 'col-md-2'});
        newImg = $('<img/>', {src: imageUrl});
        newTitle = $('<p></p>');
        newTitle.text(albumTitle + " by " + artist);
        newDiv.append(newImg);
        newDiv.append(newTitle);
        $('#covers').append(newDiv);
    });
}

(function ($) {
    "use strict";
    
    var now = new Date().getTime() / 1000;
    var oneWeekAgo = now - secondsInAWeek;
    
    var weeklyAlbumChartData = {method: 'user.getWeeklyAlbumChart', user: 'nickvanhoog', format: 'json'};
    $.getJSON(lastfmBaseUrl, weeklyAlbumChartData, function(data) {
        var i = 0;
        var  numAlbumsProcessed = 0;
        var albumsRaw = data.weeklyalbumchart.album;
        var albums = []
        while (numAlbumsProcessed < 6) {
            if (albumsRaw[i].artist['#text'] !== 'Fishmans') {
                createCoverDescription(albumsRaw[i]);
                numAlbumsProcessed++;
            }
            
            i++;
        }
    });
})(jQuery);