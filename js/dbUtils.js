import { getDbPath } from './dbPath.js';
    //Part 1 of inserting in ig_processing COLLECTION
    /* This function takes in the hashtag input and checks whether it already exists in the ig_processing collection.
     * If it does not yet exist, then it creates a new document (what you call a row in MongoDB) into the ig_processing
     * collection (collections == tables in MongoDB).
     * It adds the following fields in the new document:
     *       1. hashtag_name
     *       2. media array
     */
    export function igProcessingPart1(hashtagInput){
        var rest = getDbPath() + '/smile/ig_processing?filter={"hashtag_name": "' + hashtagInput + '"}';//var rest = 'http://127.0.0.1:88/smile/ig_processing?filter={"hashtag_name": "' + hashtagInput + '"}';
        $.ajax({
            async: true,
            type: "GET",
            url: rest,
            dataType: "json",
            success: function(response){

                // checks if there are any exising documents of the hashtag, if none, then insert a new document
                if(response._returned == 0){
                    var newUrl = getDbPath() + "/smile/ig_processing";
                    var restBody = {};

                    // hashtag_name field gets the hashtag input
                    restBody.hashtag_name = hashtagInput;

                    // media field is just an empty array for now to be dumped with media later
                    restBody.media = [];

                    $.ajax({
                        async: true,
                        type: "POST",
                        url: newUrl,
                        contentType: "application/json",
                        data: JSON.stringify(restBody),
                        processData: false,
                        complete: function(xhr, status){}
                    });
                    //end of ajax
                }
            }
            //succes
        });
        //end of ajax
    }

	//Microsoft Custom Vision API
    /* This function takes in the three API results--microsoftVisionDump and microsoftFaceDump as inputs
     * and inserts them into the document of the hashtag input. It queries for the document of the hashtag input, then
     * it adds the following fields in the new document:
     *       1. id - media ID from node.id returned from the scraped json response of IG
     *       2. microsoft_vision - from MS Computer Vision API
	 *		 3. microsoft_face - from MS Face API
     */
	export function igProcessingPart2(hashtagInput, mediaId, microsoftVisionDump, microsoftFaceDump){
		var mediaDump = {};
        mediaDump.id = mediaId;
		mediaDump.microsoft_vision = microsoftVisionDump;
        mediaDump.microsoft_face = microsoftFaceDump;
		var rest = getDbPath() + "/smile/ig_processing?filter={'hashtag_name':'" + hashtagInput + "'}";
		
		$.ajax({
            async: true,
            type: "GET",
            url: rest,
            dataType: "json",
            success: function(response){
                if(response._returned == 1){
                    response = response._embedded;
                    var theoid = response[0]._id.$oid;

                    var newUrl = getDbPath() + "/smile/ig_processing/" + theoid;
                    var newBody = {};
                    newBody.$push = {};
                    newBody.$push.media = mediaDump;

                    $.ajax({
                        async: true,
                        type: "PATCH",
                        url: newUrl,
                        processData: false,
                        contentType: "application/json",
                        data: JSON.stringify(newBody),
                        complete: function(xhr, status){
                            console.log(xhr);
                            console.log(status);
                        }
                    });
                }
            }
        });
        //ajax end
	}
	
	//Google Vision API
    /* This function takes in the google vision api as inputs
     * and inserts them into the document of the hashtag input. It queries for the document of the hashtag input, then
     * it adds the following fields in the new document:
     *       1. google - from Google MS Computer Vision API
     */
	export function igProcessingPart3(hashtagInput, mediaId, googleDump){
		var rest = getDbPath() + "/smile/ig_processing?filter={'hashtag_name':'" + hashtagInput + "'}";
		$.ajax({
            async: true,
            type: "GET",
            url: rest,
            dataType: "json",
			success: function(response){
				if(response._returned == 1){
					response = response._embedded;
					var obj = response[0].media;
                    var theoid = response[0]._id.$oid;
					var objIndex = $.map(obj, function(n, index) {
						if(n.id == mediaId) {
							console.log("MediaID: " + mediaId);
							console.log("Index = " + index); 
							return index;
						}
					});
					
					var newUrl = getDbPath() + "/smile/ig_processing/" + theoid;
                    var newBody = {};
					var temp = response[0].media[objIndex];
					temp.google = googleDump;
					newBody['media.' + objIndex] = temp;
					
					$.ajax({
                        async: true,
                        type: "PATCH",
                        url: newUrl,
                        processData: false,
                        contentType: "application/json",
                        data: JSON.stringify(newBody),
                        complete: function(xhr, status){
                            console.log(xhr);
                            console.log(status);
                        }
                    });
				}
			}
		});
		//end ajax
	}
	
    //Microsoft Custom Vision API
    /* This function takes in the three API results--microsoftVisionDump, microsoftFaceDump, and googleDump as inputs
     * and inserts them into the document of the hashtag input. It queries for the document of the hashtag input, then
     * it adds the following fields in the new document:
     *       1. id - media ID from node.id returned from the scraped json response of IG
     *       2. microsoft_vision - from MS Computer Vision API
     *       3. microsoft_face - from MS Face API
     *       4. google - from Google Cloud Vision API
     */
	/*
    export function igProcessingPart2(hashtagInput, mediaId, microsoftVisionDump, microsoftFaceDump, googleDump){
        var mediaDump = {};
        mediaDump.id = mediaId;
        mediaDump.microsoft_vision = microsoftVisionDump;
        mediaDump.microsoft_face = microsoftFaceDump;
        mediaDump.google = googleDump;
        var rest = "http://127.0.0.1:88/smile/ig_processing?filter={'hashtag_name':'" + hashtagInput + "'}";
        $.ajax({
            async: false,
            type: "GET",
            url: rest,
            dataType: "json",
            success: function(response){
                if(response._returned == 1){
                    response = response._embedded;
                    var theoid = response[0]._id.$oid;

                    var newUrl = "http://127.0.0.1:88/smile/ig_processing/" + theoid;
                    var newBody = {};
                    newBody.$push = {};
                    newBody.$push.media = mediaDump;

                    $.ajax({
                        async: false,
                        type: "PATCH",
                        url: newUrl,
                        processData: false,
                        contentType: "application/json",
                        data: JSON.stringify(newBody),
                        complete: function(xhr, status){
                            console.log(xhr);
                            console.log(status);
                        }
                    });
                }
            }
        });
        //ajax end
    }
	*/


    export function saveMediaToDB(hashtagInput, curUnixTime, igMedia){
        var search_history = {};
        search_history.searched_date = curUnixTime;
        search_history.nodes = igMedia;

        var rest = getDbPath() + "/smile/ig_media?filter={'hashtag' : '" + hashtagInput + "'}";
        $.ajax({
            async: false,
            type: "GET",
            url: rest,
            dataType: "json",
            success: function(response){
                if(response._returned == 1){
                    response = response._embedded;
                    var theoid = response[0]._id.$oid;

                    var newUrl = getDbPath() + '/smile/ig_media/' + theoid;
                    var push = {};
                    push.$push = {};
                    push.$push.search_history = search_history;

                    $.ajax({
                        async: false,
                        type: "PATCH",
                        contentType: "application/json",
                        url: newUrl,
                        processData: false,
                        data: JSON.stringify(push),
                        complete: function(xhr, status){
                            //console.log(xhr);
                            //console.log(status);
                        }
                    });
                    //end of ajax
                }
                else{
                    var newUrl = getDbPath() + '/smile/ig_media/';
                    var restBody = {};
                    restBody.hashtag = hashtagInput;
                    restBody.search_history = [];
                    restBody.search_history.push(search_history);

                    $.ajax({
                        async: false,
                        type: "POST",
                        url: newUrl,
                        processData: false,
                        contentType: "application/json",
                        data: JSON.stringify(restBody),
                        complete: function(xhr, status){
                            //console.log(xhr);
                            //console.log(status);
                        }
                    });
                }
            }
        });
        //end of ajax
        console.log("Saved IG Media " + hashtagInput);
    }
    //end of function

    //Google API ig_processing collection dump UNUSED
    // function igProcessingPart3(hashtagInput, mediaId, microsoftFaceDump){
    //     var mediaDump = {};
    //     mediaDump.id = mediaId;
    //     mediaDump.microsoft_vision = microsoftFaceDump;
    //     var rest = "http://127.0.0.1:88/smile/ig_processing?filter={'hashtag_name':'" + hashtagInput + "'}";
    //     $.ajax({
    //         async: false,
    //         type: "GET",
    //         url: rest,
    //         dataType: "json",
    //         success: function(response){
    //             if(response._returned == 1){
    //                 response = response._embedded;
    //                 var theoid = response[0]._id.$oid;
    //
    //                 var newUrl = "http://127.0.0.1:88/smile/ig_processing/" + theoid;
    //                 var newBody = {};
    //                 newBody.$push = {};
    //                 newBody.$push.media = mediaDump;
    //
    //                 $.ajax({
    //                     async: false,
    //                     type: "PATCH",
    //                     url: newUrl,
    //                     processData: false,
    //                     contentType: "application/json",
    //                     data: JSON.stringify(newBody),
    //                     complete: function(xhr, status){
    //                         console.log(xhr);
    //                         console.log(status);
    //                     }
    //                 });
    //             }
    //         }
    //     });
    //     //ajax end
    // }

