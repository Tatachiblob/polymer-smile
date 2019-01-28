import { getDbPath } from './dbPath.js';
export function igProcessingMicrosoft(hashtagInput, mediaId, mediaUrl, microsoftVisionDump, microsoftFaceDump){
    var mediaDump = {};
    mediaDump.ig_id = mediaId;
    mediaDump.hashtag = hashtagInput;
    mediaDump.ig_url = mediaUrl;
    mediaDump.vision = microsoftVisionDump;
    mediaDump.face = microsoftFaceDump;
    var rest = getDbPath() + "/smile/ig_processing_ms";

    $.ajax({
        async: true,
        type: "POST",
        url: rest,
        processData: false,
        contentType: "application/json",
        data: JSON.stringify(mediaDump),
        complete: function(xhr, status){
            console.log('Microsoft igProcessing');
            console.log(xhr);
            console.log(status);
        }
    });
    //ajax end
}

export function igProcessingGoogle(hashtagInput, mediaId, mediaUrl, googleDump){
    var mediaDump = {};
    mediaDump.ig_id = mediaId;
    mediaDump.hashtag = hashtagInput;
    mediaDump.ig_url = mediaUrl;
    mediaDump.google = googleDump;
    var rest = getDbPath() + "/smile/ig_processing_google";

    $.ajax({
        async: true,
        type: "POST",
        url: rest,
        processData: false,
        contentType: "application/json",
        data: JSON.stringify(mediaDump),
        complete: function(xhr, status){
            console.log('Google igProcessing');
            console.log(xhr);
            console.log(status);
        }
    });
    //ajax end
}

export function saveMediaSearchToDBNew(hashtagInput, curUnixTime, mediaCount, igMedia){
        //When user searches for Hashtag
		 //console.log("SENPOUT SIZE: " + igMedia.length);
		 for (let node of igMedia) {
			 //console.log("SENPOUUU");
			 
			var newUrl = getDbPath() + '/smile/ig_media/';
			var restBody = {};
			restBody.hashtag = hashtagInput;
			restBody.searched_date = curUnixTime;
			restBody.ig_object = {};
			restBody.ig_object = node;

			$.ajax({
				async: false,
				type: "POST",
				url: newUrl,
				processData: false,
				contentType: "application/json",
				data: JSON.stringify(restBody),
				complete: function(xhr, status){
				}
			});
			 
		 }
	}
    //end of function

/**
 This method is to keep track of what the user searched.
 */
export function saveSearchToDB(hashtagInput, curUnixTime, mediaCount){
    //When user searches for Hashtag
    /**
     1. Check if hashtag exists.
     1.1. If hashtag exists, get the document's _id.$oid.
     1.2. Make a url with the oid at the end of the url.
     1.3. Push the search_history and its details to the array.
     2. If hashtag does not exists,
     2.1. PUT a new document.
     **/
    var rest = getDbPath() + "/smile/user_search?filter={'search_hashtag':'"+hashtagInput+"'}";
    $.ajax({
        async: false,
        type: "GET",
        url: rest,
        dataType: "json",
        success: function(response){
            if(response._returned == 1){
                response = response._embedded;
                var theoid = response[0]._id.$oid;

                var newUrl = getDbPath() + "/smile/user_search/" + theoid;
                var newBody = '{"$push": { "search_history": { "named_search": "replaceme", "searched_date": ' + curUnixTime + ', "media_count": ' + mediaCount + ' } }}';
                $.ajax({
                    async: false,
                    type: "PATCH",
                    url: newUrl,
                    processData: false,
                    contentType: "application/json",
                    data: newBody,
                    complete: function(xhr, status){}
                });
            }
            //IF IT DOES NOT EXIST
            else{
                var rest = getDbPath() + "/smile/user_search";
                var restBody = {};
                restBody.search_hashtag = hashtagInput;
                restBody.search_history = [];
                var toPush = {}
                toPush.named_search = "replaceme";
                toPush.searched_date = curUnixTime;
                toPush.media_count = mediaCount;
                restBody.search_history.push(toPush);
                console.log(restBody);
                $.ajax({
                    async: false,
                    type: "POST",
                    url: rest,
                    processData: false,
                    contentType: "application/json",
                    data: JSON.stringify(restBody),
                    complete: function(xhr, status){}
                });
            }
        }
        //success
    });
    //end of ajax
}
//end of function