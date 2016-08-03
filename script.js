// GLOBAL VARIABLES
var myLocation;
var genderSelect;
var firstName;
var lastName;
var map;

function LocationObj(){
    var myPosition = {
        lat: null,
        long: null,
        success: null
    };
    var nav = navigator.geolocation;
    nav.getCurrentPosition(success, failure);
    function success(position){
        myPosition.lat = position.coords.latitude;
        myPosition.long = position.coords.longitude;
        myPosition.success = true;
    }
    function failure(error){
        //defaults to learningfuze location if it fails
        myPosition.lat = 33.6362183;
        myPosition.lang = -117.7394721;
        myPosition.success = false;
        myPosition.error = error;
    }
    this.getLocation = function(){
        return myPosition;
    }
}
//DOCUMENT READY
$(document).ready(function(){
    //create location object
    var locObj = new LocationObj();
    myLocation = locObj.getLocation();
    console.log(myLocation);

    createDomPage1();


    //Added from Amina
    getNames();
    navigator.geolocation.getCurrentPosition(initialize);
    getPersonImages();

});

function clearMain(){
    $('.main').children().remove();
}

// PAGE 1 - Date Choice
function createDomPage1(){
    var choiceArray = ['Male', 'Female', 'Surprise Me'];
    for (var i = 0; i < choiceArray.length; i++){
        $('<div>').text(choiceArray[i])
            .addClass('col-sm-12 dateChoices').click(function(){selectedGender();}).appendTo('.main');
    }
}

function selectedGender() {
    genderSelect = $(this).text();
    clearMain();
    createDomPage2();
    console.log(genderSelect);
}


// PAGE 2 - Date Buttons

function createDomPage2 (){
    for (var i=0; i < 6; i++){
        var dateDiv = $('<div>').addClass('dateBtns col-sm-4 col-xs-6').text(i+1);
        $(dateDiv).click(clickDateBtns);
        $('.main').append(dateDiv);
    }
}


//Getting random names function via ajax call
function getNames() {
    $.ajax({
        method: 'get',
        datatype: 'json',
        url: 'http://uinames.com/api/',
        success: function (result) {
            firstName = result.name;
            lastName = result.surname;

            $(".name").html(firstName + ' ' + lastName);
        },

        error: function () {
            console.log('call was unsuccessful');
        }
    })
}
//End of random name function

//Getting images from Flickr function
function getPersonImages() {
    $.ajax({
        url: 'https://api.flickr.com/services/rest',
        method: 'get',
        data: {
            method: 'flickr.photos.search',
            api_key: '4291af049e7b51ff411bc39565109ce6',
            nojsoncallback: '1',
            sort: 'relevance',
            text: 'person',
            format: 'json'
        },

        success: function (result) {
            console.log(result);

        }
    })
}

function clickDateBtns (){
    clearMain();
    //save the img and name of clicked item
    createDomPage3();
}



// PAGE 3 - Event Choices

function createDomPage3(){
    for(var i = 0; i < 6; i++) {
        var selectEvent = $('<div>').addClass('eventChoices col-sm-4 col-xs-6 box' + i).text('EVENT CHOICE' + i).click(clickeventChoices);
        $('.main').append(selectEvent);
        if ($('.eventChoices').hasClass('box5')){
            $('.box5').text('SURPRISE ME!')
        }
    }
}

function clickeventChoices(){
    if($(this).hasClass('box5')){
        clearMain();
        createDomPage5();
    } else {
        clearMain();
        createDomPage4();
    }
}


// PAGE 4  -  Events Buttons
function createDomPage4(){
    for(var i = 0; i < 6 ; i++){
        var div = $('<div>').addClass('eventBtns col-xs-6 col-sm-4 col-md-4 col-lg-4').click(function(){
            clearMain();
            createDomPage5();
        });
        $('.main').append(div);
    }
}

var map;
var infowindow;
var object_list;

function initMap() {
    clearMain();
    var mapsize = $('<div>').attr('id', 'map').appendTo('.main');
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 33.6839, lng: -117.7947},
        zoom: 12
    });
    infowindow = new google.maps.InfoWindow();//
    var service = new google.maps.places.PlacesService(map); //constructor
    service.nearbySearch({
        location: {lat: 33.6839, lng: -117.7947}, //use brian's plug in location object
        radius: 7000,//radius in meters
        type: ['restaurant'],//variables for this keyword. use parameter
    }, callback);
    function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            object_list = results;
            console.log(object_list);//this gives objects of searched places in an array (from line 37 - 41 and calls this function);
        }
    }
}



// Dinner





// Cafe





// Parks





// Theaters





// Malls





// Museum





// PAGE 5


function createDomPage5(){
    for (var i=0; i<4; i++){
        var finalDiv = $('<div>').addClass('finalBtns col-sm-6 col-xs-12').text(i+1);
        $('.main').append(finalDiv);
    }
}





//Getting google maps for the locations

function initialize(location) {
    console.log(location);


}
//End of google maps function














