// GLOBAL VARIABLES
var locObj;
var genderSelect;
var firstName;
var lastName;
var map;
var myAddressString = '';

function LocationObj(successCallback, errorCallback){
    this.success = successCallback;
    this.error = errorCallback;
    var myPosition = {
        lat: null,
        long: null,
        status: null
    };
    var nav = navigator.geolocation;

    function success(position){
        myPosition.lat = position.coords.latitude;
        myPosition.long = position.coords.longitude;
        myPosition.status = true;
        this.success();
    }
    
    function failure(error){
        //defaults to learningfuze location if it fails
        myPosition.lat = 33.6362183;
        myPosition.lang = -117.7394721;
        myPosition.status = false;
        myPosition.error = error;
    }
    this.getLocation = function(){
        return myPosition;
    }
    nav.getCurrentPosition(success.bind(this), failure);
}

//DOCUMENT READY
$(document).ready(function(){
    //create location object
    getAddress();
    createDomPage1();
    //Added from Amina
    getNames();
    getPersonImages();

});

function clearMain(){
    $('.main').children().remove();
}
function getAddress(){
    locObj = new LocationObj(checkAddress, null);
}
function checkAddress(){

    console.log(locObj.getLocation());
    var locTest = locObj.getLocation();

    if (locTest.status === false ){
        createAddressBar();
    }
}

function createAddressBar(){
    $('<input>').attr({
        type: 'text',
        placeholder: 'Enter Your Location',
        class: 'form-control',
        id : 'address'
    }).appendTo('.main');
}

// PAGE 1 - Date Choice
function createDomPage1(){
    var choiceArray = ['Male', 'Female', 'Surprise Me'];
    for (var i = 0; i < choiceArray.length; i++){

        var dateChoices = $('<div>').addClass('col-sm-4 dateChoices').click(selectedGender);
        $('.main').append(dateChoices);
        var dateChoicesContainer = $('<div>').addClass('dateChoicesContainer').text(choiceArray[i]);
        $(dateChoices).append(dateChoicesContainer);

    }
}

function selectedGender() {
    genderSelect = $(this).text();
    setAddress();
    
    if (genderSelect === 'Surprise Me'){
        createDomPage5();
    }
    
    clearMain();
    createDomPage2();
    console.log(genderSelect);
}

function setAddress(){
    myAddressString = $(':input').val();
    console.log(myAddressString);

    if(myAddressString !== ''){
        //get geocode
        console.log('get geocode');
    }else{
        //default location
        myAddressString = '9080 Irvine Center Dr';
    }
}

function geocodeAddress(){
    function initMap() {
        var map = new google.maps.Map(document.getElementById('main'), {
            zoom: 8,
            center: {lat: -34.397, lng: 150.644}
        });
        var geocoder = new google.maps.Geocoder();

        document.getElementById('submit').addEventListener('click', function() {
            geocodeAddress(geocoder, map);
        });
    }

    function geocodeAddress(geocoder, resultsMap) {
        var address = document.getElementById('address').value;
        geocoder.geocode({'address': address}, function(results, status) {
            if (status === 'OK') {
                resultsMap.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: resultsMap,
                    position: results[0].geometry.location
                });
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }

}

// PAGE 2 - Date Buttons

function createDomPage2 (){
    for (var i=0; i < 6; i++){
        var dateDiv = $('<div>').addClass('dateBtns col-sm-4 col-xs-6');
        $(dateDiv).click(clickDateBtns);
        $('.main').append(dateDiv);
        var dateContainer = $('<div>').addClass('dateContainers').text('date ' + (i+1));
        $(dateDiv).append(dateContainer);
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
        var eventDiv = $('<div>').addClass('eventBtns col-sm-4 col-xs-6').click(clickeventChoices);
        var eventContainer = $('<div>').addClass('eventContainers box' + i).text(i + 1);
        eventDiv.append(eventContainer).appendTo($('.main'));
        if ($('.eventContainers').hasClass('box5')){
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
        var eventDiv = $('<div>').addClass('eventBtns col-sm-4 col-xs-6');
        $(eventDiv).click(clickEventBtns);
        $('.main').append(eventDiv);
        var eventContainer = $('<div>').addClass('dateContainers').text(i+1);
        $(eventDiv).append(eventContainer);
    }
}

function clickEventBtns () {
    clearMain();
    //save the img and name of clicked item
    createDomPage5();
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
        var finalDiv = $('<div>').addClass('finalBtns col-sm-6 col-xs-12')
        $('.main').append(finalDiv);
        var finalDivContainer = $('<div>').addClass('finalDivContainer').text(i+1).attr('id', 'final_' +i);
        $(finalDiv).append(finalDivContainer);
        navigator.geolocation.getCurrentPosition(initialize);
    }
}


//Getting google maps for the locations

function initialize(location) {
    console.log(location);

    var mapOptions = {
        center: new google.maps.LatLng(-34.397, 150.644),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("final_2"), mapOptions);
}

//End of google maps function














