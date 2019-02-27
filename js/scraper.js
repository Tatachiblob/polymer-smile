import { igProcessingMicrosoft } from './dbUtils2.js';
import { igProcessingGoogle } from './dbUtils2.js';
import { getDbPath } from './dbPath.js';
import { saveMediaSearchToDBNew } from './dbUtils2.js';
import { saveSearchToDB } from './dbUtils2.js';
import { getLatestMediaID } from './dataRetrieve.js'
import { instagramLocation } from './locationScrape.js'

$(document).ready(function(){
    // The json response returned by the Microsoft Computer Vision API
    var MSComputerVisionAPIResults = {}; //"<p>MICROSOFT COMPUTER VISION API RESULTS</p><br>";

    // The json response returned by the Microsoft Face API
    var MSFaceAPIResults = {}; //"<p>MICROSOFT FACE API RESULTS</p><br>";

    // The json response returned by the Google Cloud Vision API
    var GoogleAPIResults = {}; //"<p>GOOGLE CLOUD VISION API RESULTS</p><br>";

    // Number of images needed for aggregation & visualization

    var IMAGES_LIMIT = 50; // change to 1000 after development stage

    // Safe number of posts that can be scraped in Instagram per minute
    var IG_LIMIT = 3000;

    // TODO: Safe number of calls that can be requested from MS Face API per minute
    var MS_FACE_LIMIT = 20;

    // TODO: Safe number of calls that can be requested from MS Computer Vision API per minute
    var MS_COMPVISION_LIMIT = 20;

    // TODO: Safe number of calls that can be requested from Google Cloud Vision API per minute
    var GOOGLE_CLOUDVISION_LIMIT = 20;

    // Instagram REST API URL call
    var middleProxy = "http://localhost:8084/com.arraylist.smile/api/v1/status?url=";
    var url = "https://www.instagram.com/explore/tags/";

    // MongoDB REST API URL domain
    var dbPath = getDbPath();

    // The search bar
    var searchBar = document.getElementById("searchBar");

    // Initialize variable to get the input from the search bar
    var hashtagInput = "";

    // search results are globally referenced throughout the code.
    var searchResult = [];

    // TODO: replace the ff with visualizations
    //var searchResultView = document.getElementById("searchResults");

    // $('#inputForm').on( "submit", function() {
    //
    // });

    // listens for when the enter key is pressed
    searchBar.addEventListener("keydown", function (e) {

        //checks whether the pressed key is "Enter"
        if (e.keyCode === 13) {
            e.preventDefault();
            $("#loadMe").modal({
                backdrop: "static", //remove ability to close modal with click
                keyboard: false, //remove option to close with keyboard
                show: true //Display loader!
            });

            setTimeout(
                function()
                {
                    hashtagInput = $('#searchBar').val();

                    // If the input in the search bar is not empty
                    if(hashtagInput.length > 0) {

                        // It takes a while to scrape everything considering the limit is 1000 as of June 22, 2018
                        //alert("Please wait a few moments for scraping...");

                        // From the given hashtag, scrape all images that are related to that hashtag
                        scrapeImages(hashtagInput);

                        // get the total dataset card in the dashboard
                        var totalDataset = document.getElementById("total-dataset");//$('#total-dataset').innerHTML(searchResult.length);

                        var figure = searchResult.length;
                        //alert(figure);
                        if(searchResult.length > 999999999){ // 1B or more results
                            figure /= 1000000000;
                            figure += 'B';
                        }
                        else if(searchResult.length > 999999){ // 1M or more results
                            figure /= 1000000;
                            figure += 'M';
                        }
                        else if(searchResult.length > 999) {    // 1K or more results
                            figure /= 1000;
                            figure += 'K';
                        }
                        //totalDataset.innerHTML = figure;//totalDataset.innerHTML = figure + '&nbsp<i class="fa fa-picture-o"></i>';

                        // INTEGRATION MODULE
                        //We already have to insert to IG_PROCESSING.
                        /*
                        {
                          "hashtag_name": "animolasalle"
                        }
                        The processing data is going to be PATCH.
                        */
                        //igProcessingPart1(hashtagInput);
                        sendImagesToMicrosoftAPI();
                        sendImagesToGoogleAPI();

                        // Check browser support
                        if (typeof(Storage) !== "undefined") {
                            // Store
                            sessionStorage.setItem("hashtagInput", hashtagInput);
                            sessionStorage.setItem("MSComputerVisionAPIResults", MSComputerVisionAPIResults);
                            sessionStorage.setItem("MSFaceAPIResults", MSFaceAPIResults);
                            sessionStorage.setItem("GoogleAPIResults", GoogleAPIResults);
                            // Retrieve
                            //document.getElementById("result").innerHTML = sessionStorage.getItem("lastname");
                        }

                        instagramLocation(hashtagInput);
                        alert("Yay! Done scraping!");
                        // redirect to dashboard
                        window.location.href = "../dashboard.html";

                        //searchResultView.innerHTML = "<p>" + MSComputerVisionAPIResults + "</p><p>" + MSFaceAPIResults + "</p>";
                    }
                }, 1000);
            // Get the input in the search bar

        }
    });

    /** This method scrapes images and their details from Instagram and saves them into json files (commented out)
     * and into MongoDB. It takes in a string input for the file name of the json file.
     */
    function scrapeImages(hashtagInput) {
        //UNIX TIMESTAMP
        var curUnixTime = Math.round((new Date()).getTime() / 1000);
        var latestInstagramId = getLatestMediaID(hashtagInput);

        //This is the result for IG and post counts.
        var result;
        var totalPosts = 0;

        // This is from the search bar
        var hashtag = hashtagInput;

        // append the hashtag parameter to call the REST API of Instagram
        var sendUrl = url + hashtag + "/?__a=1";

        // There is an attribute part of the json response named "end_cursor" returned by a call for each page of results
        // If nextCursor is null, that means there is no more pages left, and it is in the last page.
        var nextCursor = null;

        // If there should be a limited number of images to be scraped
        var limitReached = false;

        // strike counter to delay requesting images from Instagram
        var nStrike = 0;

        do {
            // send an ajax call to Instagram to get the images related to the given hashtag
            $.ajax({
                async: false,   // if this is true, then limitReached will not reflect the results
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                type: 'GET',
                url: middleProxy + sendUrl,
                success: function (data, textStatus, jqXHR) {
                    // get the image and details
                    totalPosts = data.graphql.hashtag.edge_hashtag_to_media.count;
                    result = data.graphql.hashtag.edge_hashtag_to_media;

                    // get the end_cursor attribute from the json response to see if there's more pages
                    nextCursor = result.page_info.end_cursor;

                    // Get each image node from the search results
                    for (var edge = 0; edge < result.edges.length; edge++) {

                        // Gets the particular node
                        var curNode = result.edges[edge].node;

                        // If it is an image and not a video
                        if (!curNode.is_video) {

                            //check first if limit has been reach before adding it to the search results
                            // For testing and debugging purposes.
                            if(searchResult.length >= IMAGES_LIMIT){
                                limitReached = true;
                                //console.log("breaking..." + searchResult.length);
                                break;
                            }

                            // This block gets IG_LIMIT posts before sleeping for 1.5 minutes. Uncomment this for actual testing
                            if(nStrike >= IG_LIMIT){
                                 //alert('gonna sleep kek ' + nStrike + " total dataset: " + searchResult.length);
                                 console.log("posts collected so far: " + searchResult.length);
                                 sleep(90000); // sleep for over 2 minutes before bulk calling again
                                 nStrike = 0;
                            }

                            //check if media is already searched.
                            if(curNode.id == latestInstagramId){
                                nextCursor = null;
                                break;
                            }

                            // if limit has not yet been reached, then add the image node to the search results
                            searchResult.push(curNode);

                            // increment strike counter
                            nStrike ++;
                        }
                    }

                    // If there are still more pages for that hashtag, reassign the URL for the next ajax call in loop
                    sendUrl = url + hashtag + "/?__a=1&max_id=" + nextCursor;
                },
                error: function (jqXhr, textStatus, errorThrown) {
                    console.log(textStatus);
                    nextCursor = null;
                }
            });

        } while (nextCursor != null && !limitReached);


        //console.log(searchResult);
        console.log("End of search results. TOTAL: " + searchResult.length);

        // create a json file and save result as a .json file
        // this is for data gathering stage and will no longer be used in the integration and visualization modules
        //console.log("saving...");
        //saveToJSON(hashtagInput);   // comment this if no longer needed
        //console.log("saved!");

        saveSearchToDB(hashtagInput, curUnixTime, totalPosts);
        //saveMediaToDB(hashtagInput, curUnixTime, searchResult);
		saveMediaSearchToDBNew(hashtagInput, curUnixTime, totalPosts,searchResult);
    }

    /* This method takes in milliseconds (60000 = 60 seconds = 1 minute) and stops all processes
     for that amount of milliseconds*/
    function sleep(ms) {
        console.log('sleeping for a while...')
        var currentTime = new Date().getTime();

        while (currentTime + ms >= new Date().getTime()) {
        }
    }

    /** This method sends the images from the search result to the Microsoft Face & Computer Vision API
     It takes in the image URL of each image in the search result as a parameter to the API call, and
     processes the image, returning a json response containing the image processing results.
     */
    function sendImagesToMicrosoftAPI() {
        for (let node of searchResult) {    // TODO: instead of searchResult, get json files from db
            // input to the integration module
            console.log(node.display_url);

            $(function() {
                var body = node.display_url;
                var postData = {
                    url: body
                };
                postData = JSON.stringify(postData);
                console.log(postData);


                // ####################### MICROSOFT COMPUTER VISION API ###############################################
                var params = {
                    // Request parameters
                    "visualFeatures": "Color,ImageType,Categories,Tags,Description",
                    "language": "en",
                };
                $.ajax({
                    async: false,
                    url: "https://southeastasia.api.cognitive.microsoft.com/vision/v2.0/analyze?" + $.param(params),
                    beforeSend: function(xhrObj){
                        // Request headers
                        xhrObj.setRequestHeader("Content-Type","application/json");
                        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","716a022bfd254c268ea9fe553337457d");
                    },
                    type: "POST",
                    // Request body
                    data: postData,
                })
                    .done(function(data) {
                        MSComputerVisionAPIResults = data;
                        //console.log("success computer vision api");
                        // TODO: get json response and make visualization out of the results
                        //MSComputerVisionAPIResults += "<br><p>" + JSON.stringify(data) + "</p>";
                        //searchResultView.innerHTML = MSComputerVisionAPIResults + "</p><br><br><p>" + MSFaceAPIResults + "</p><br><br><p>" + GoogleAPIResults;
                        //console.log(data);

                    })
                    .fail(function() {
                        console.log("error");
                    });

                // ####################### MICROSOFT FACE API ##########################################################
                var params = {
                    // Request parameters
                    "returnFaceId": "true",
                    "returnFaceLandmarks": "false",
                    "returnFaceAttributes": "age,gender,glasses,emotion",
                };
                $.ajax({
                    async: false,
                    url: "https://southeastasia.api.cognitive.microsoft.com/face/v1.0/detect?" + $.param(params),
                    beforeSend: function(xhrObj){
                        // Request headers
                        xhrObj.setRequestHeader("Content-Type","application/json");
                        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","76d4d70c6c4c441695b3d60af5ef2b8a");
                    },
                    type: "POST",
                    // Request body
                    data: postData,
                })
                    .done(function(data) {
                        MSFaceAPIResults = data;
                        //console.log("success face api");
                        // TODO: get json response and make visualization out of the results
                        //MSFaceAPIResults += "<br><p>" + JSON.stringify(data) + "</p>";
                        //searchResultView.innerHTML = MSComputerVisionAPIResults + "</p><br><br><p>" + MSFaceAPIResults + "</p><br><br><p>" + GoogleAPIResults;
                        //console.log(data);
                    })
                    .fail(function() {
                        console.log("error");
                    });
            });
            igProcessingMicrosoft(hashtagInput, node.id, node.display_url, MSComputerVisionAPIResults, MSFaceAPIResults)
			//igProcessingPart2(hashtagInput, node.id, MSComputerVisionAPIResults, MSFaceAPIResults);
        }
    }

    /** This method sends the images from the search result to the Google Cloud Vision API
     It takes in the image URL of each image in the search result as a parameter to the API call,
     the type of feature to include for image processing, and
     processes the image, returning a json response containing the image processing results.
     */
    function sendImagesToGoogleAPI() {
        for (let node of searchResult) {    // TODO: instead of searchResult, get json files from db
            // get the image url attribute fromt the Instagram JSON search result
            var imageUri = node.display_url;

            // this is the domain that is working based on tests
            var domain = "https://scontent-hkg3-2.cdninstagram.com/";

            // switch the domain from https://instagram.fmnl10-1.fna.fbcdn.net to
            // https://scontent-hkg3-2.cdninstagram.com to prevent Google from saying that they
            // cannot request the image url on our behalf
            imageUri = domain + imageUri.substring(40);

            // Make the request body, putting the features that we would like to add for the image processing
            var request = {
                requests: [
                    {
                        image: {
                            source: {
                                imageUri: imageUri
                            }
                        },
                        features: [
                            {
                                type: "FACE_DETECTION",
                                maxResults: IMAGES_LIMIT
                            },
                            {
                                type: "LABEL_DETECTION",
                                maxResults: IMAGES_LIMIT
                            },
                            {
                                type: "TEXT_DETECTION",
                                maxResults: IMAGES_LIMIT
                            },
                            {
                                type: "SAFE_SEARCH_DETECTION",
                                maxResults: IMAGES_LIMIT
                            },
                            {
                                type: "IMAGE_PROPERTIES",
                                maxResults: IMAGES_LIMIT
                            },
                            {
                                type: "LOGO_DETECTION",
                                maxResults: IMAGES_LIMIT
                            }

                        ]
                    }
                ]
            };
            request = JSON.stringify(request);

            // send the request to Google Cloud Vision API using Yuta's API key
                $.ajax({
                    async: false,
                    url: "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDn-kpTRu7LwAuYYbDJ3mZo2evvmH2qL9U", // Yuta's API Key
                    type: "POST",
                    contentType: "application/json",
                    data: request,
                    success: function(result){
                        GoogleAPIResults = result;
                        //console.log(result);
                        // TODO: get json response and make visualization out of the results
                        //GoogleAPIResults += "<br><p>" + JSON.stringify(result) + "</p>";
                        //searchResultView.innerHTML = MSComputerVisionAPIResults + "</p><br><br><p>" + MSFaceAPIResults + "</p><br><br><p>" + GoogleAPIResults;
						//igProcessingPart2(hashtagInput, node.id, MSComputerVisionAPIResults, MSFaceAPIResults);
                        
                    },
                    error: function (xhr, status, error) {
                        //alert("error");
                        console.log("" + status + " " + error);
                    }
                });
			//igProcessingPart3(hashtagInput, node.id, GoogleAPIResults);
            igProcessingGoogle(hashtagInput, node.id, node.display_url, GoogleAPIResults)
        }
		
    }

    /** This method creates a json object and saves the resulting images from the hastag into a .json file.
        It takes in a string input for the file name of the json file.
     */
    function saveToJSON(filename) {
        // this will serve as the indices of each post in JSON
        var i = 0;

        // initialize empty JSON object
        var jsonObj = {
            results: {}
        }

        // push each post into the JSON object
        for(let node of searchResult){
            console.log(JSON.stringify(node));
            jsonObj.results[i] = node ;
            i++;
        }

        // self explanatory
        var text = JSON.stringify(jsonObj, null, 4);

        // create blob for saving files
        var blob = new Blob( [text], {
            //type: 'application/octet-stream' // alternate type perhaps
            type: 'text/plain;charset=utf-8'
        });

        // the following was taken from http://jsfiddle.net/soulwire/4ooupev9/ for creating/saving JSON files
        url = URL.createObjectURL( blob );
        var link = document.createElement( 'a' );
        link.setAttribute( 'href', url );
        link.setAttribute( 'download', filename + ".json");

        var event = document.createEvent( 'MouseEvents' );
        event.initMouseEvent( 'click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
        link.dispatchEvent( event );
    }
});
