var APIKey = "IXHrCW7HbVSkilRoks118mHFZJi08MKa";
var limit = 10;

var topics = ["Puppy", "Kitten", "Simba", "Pizza", "Thor", "Ironman", "Game of Thrones", "Spiderman", "Harry Potter", "Black Panther"];

var index = 0;

var move = {};
var addPair = function (myKey, myValue) {
    move[myKey] = myValue;
};
var giveValue = function (myKey) {
    return move[myKey];
};


$('body').on('click', 'img', function (e) {
    var imgObj = e.currentTarget;
    const imageid = imgObj.getAttribute('id');
    var moveValue = giveValue(imageid);
    if (moveValue === undefined || moveValue === null) {
        addPair(imageid, 0);
    }
    moveValue = giveValue(imageid);


    if (moveValue === 0) {
        imgObj.setAttribute('src', imgObj.getAttribute('animateUrl'));
        addPair(imageid, 1);


    } else if (moveValue === 1) {
        imgObj.setAttribute('src', imgObj.getAttribute('stillUrl'));
        addPair(imageid, 0);
    }
});


function displayGifs(searchedQuery) {
    index = 0;
    $("#graphics-view").empty();

    if (searchedQuery === undefined || searchedQuery === '' || searchedQuery === null) {
        searchedQuery = $("#giphy-input").val();
    }

    if (searchedQuery === '') {
        return;
    }

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchedQuery + "&api_key=" + APIKey + "&limit=" + limit;


    if (!(topics.map(function (item) { return item.toLowerCase() }).indexOf(searchedQuery.toLowerCase()) != -1)) {
        topics.push(searchedQuery);
        const buttonSearched = "<button style='margin-top:10px;' onClick=displayGifs('" + searchedQuery + "') type='button' class='btn btn-primary'>" + searchedQuery + "</button>";
        $("#buttons-view").append(buttonSearched).append('&nbsp;');
    }

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        response.data.forEach(element => {
            index++;
            const gif_image_object = element.images;
            const gif_image_still_src = gif_image_object.original_still.url;
            const gif_image_anim_src = gif_image_object.original.url;
            const rating = element.rating;
            const imgid = element.id;
            $("#graphics-view").append(`Rating: <b>${rating}</b> ➡️  <img id=${imgid} animateUrl=${gif_image_anim_src} stillUrl=${gif_image_still_src} src=${gif_image_still_src} style="margin-top:20px"; height='200' width='250' />`);
        });
        if (index === 0) {
            const buttonSearched = "<button onClick=displayGifs('" + searchedQuery + "') type='button' class='btn btn-secondary'>No Result Found For: " + searchedQuery + " </button>";
            $("#graphics-view").append(buttonSearched).append('&nbsp;');
        }
    });
    return false;
};

$(document).ready(function () {
    for (var i = 0; i < topics.length; i++) {
        const btnName = topics[i];
        const buttonSearched = "<button style='margin-top:10px;' onClick=displayGifs('" + btnName + "'); type='button' class='btn btn-primary'>" + btnName + "</button>";
        $("#buttons-view").append(buttonSearched).append('&nbsp;');
    }
});