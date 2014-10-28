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
    artistName = album.artist.name;
    
    theUrl = constructUrl({method: 'album.getInfo', artist: artistName, album: albumTitle, format: 'json'});
    $.getJSON(theUrl, function(data) {
        var album, artist, albumTitle, imageUrl, newImg, newDiv;
        album = data.album;
        artist = album.artist;
        albumReleaseDate = album.releasedate.split(',')[0];
        if (/\S/.test(albumReleaseDate)) {
            albumReleaseDate = album.releasedate.split(',')[0];
        }
        else {
            albumReleaseDate = 'n/a';   
        }
        imageUrl = album.image[2]['#text'];
        albumTitle = album.name;
        newDiv = $('<div></div>', {class: 'col-md-2'});
        newImg = $('<img/>', {src: imageUrl});
        newTitle = $('<p></p>');
        albumTypog = $('<b></b>').text(albumTitle); 
        artistTypog = $('<p></p>').text('by ' + artist);
        
        newTitle.append(albumTypog);
        newTitle.append(artistTypog);
        newDiv.append(newImg);
        newDiv.append(newTitle);
        $('#covers').append(newDiv);
    });
}

(function ($) {
    "use strict";
    
    var now = new Date().getTime() / 1000;
    var oneWeekAgo = now - secondsInAWeek;
    
    var monthlyAlbums = {method: 'user.getTopAlbums', user: 'nickvanhoog', limit: 6, period: "1month", format: 'json'};
    $.getJSON(lastfmBaseUrl, monthlyAlbums, function(data) {
        var i = 0;
        var  numAlbumsProcessed = 0;
        var albumsRaw = data.topalbums.album;
        while (numAlbumsProcessed < 6) {
            if (albumsRaw[i].artist['#text'] !== 'Fishmans') {
                createCoverDescription(albumsRaw[i]);
                numAlbumsProcessed++;
            }
            
            i++;
        }
    });
})(jQuery);