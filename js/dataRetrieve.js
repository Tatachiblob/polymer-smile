import { getDbPath } from './dbPath.js';
export function getIGProcessingMs(hashtag){
    var domain = getDbPath();
    var page = 1;
    var maxPage = 10;
    var rest = domain +  '/smile/ig_processing_ms?filter={"hashtag":"' + hashtag + '"}&count&pagesize=1000&page=' + page;
    var processing = [];

    do{
        $.ajax({
            async: false,
            type: "GET",
            url: rest,
            dataType: "json",
            success: function(response){
                //console.log("rest url: " + rest);
                //console.log("current page: " + page);
                page++;
                rest = domain +  '/smile/ig_processing_ms?filter={"hashtag":"' + hashtag + '"}&count&pagesize=1000&page=' + page;
                maxPage = response._total_pages;
                for(let a of response._embedded){
                    processing.push(a);
                }
            }
        });
    }while(page <= maxPage)
    //console.log('Ms Processing length: ' + processing.length);
    return processing;
}

export function getIGProcessingGoogle(hashtag){
    var domain = getDbPath();
    var page = 1;
    var maxPage = 10;
    var rest = domain +  '/smile/ig_processing_google?filter={"hashtag":"' + hashtag + '"}&count&pagesize=1000&page=' + page;
    var processing = [];

    do{
        $.ajax({
            async: false,
            type: "GET",
            url: rest,
            dataType: "json",
            success: function(response){
                //console.log("rest url: " + rest);
                //console.log("current page: " + page);
                page++;
                rest = domain +  '/smile/ig_processing_google?filter={"hashtag":"' + hashtag + '"}&count&pagesize=1000&page=' + page;
                maxPage = response._total_pages;
                for(let a of response._embedded){
                    processing.push(a);
                }
            }
        });
    }while(page <= maxPage)
    //console.log('Google Processing length: ' + processing.length);
    return processing;
}

export function getIGProcessing(hashtag){
	var domain = getDbPath();
	var rest = domain +  '/smile/ig_processing?filter={"hashtag_name":"' + hashtag + '"}';
	var processing = {};
	
	$.ajax({
		async: false,
		type: "GET",
        url: rest,
        dataType: "json",
        success: function(response){
			processing = response._embedded[0];
		}
	});
	
	return processing;
}

export function getIGMedia(hashtag){
	var domain = getDbPath();
	var rest = domain +  '/smile/ig_media?filter={"hashtag":"' + hashtag + '"}';
	var processing = {};
	
	$.ajax({
		async: false,
		type: "GET",
        url: rest,
        dataType: "json",
        success: function(response){
			processing = response._embedded[0];
		}
	});
	
	return processing;
}

export function getFullIGMedia(hashtag){
	var domain = getDbPath();
	var rest = domain +  '/smile/ig_media?filter={"hashtag":"' + hashtag + '"}';
	var processing = {};
	
	var mediaObj = [];
	
	$.ajax({
		async: false,
		type: "GET",
        url: rest,
        dataType: "json",
        success: function(response){
			processing = response._embedded[0];
			for(let history of processing.search_history){
				for(let node of history.nodes){
					mediaObj.push(node);
				}
			}
		}
	});
	
	return mediaObj;
}

export function getIGMediaNew(hashtag){
    var domain = getDbPath();
    var rest = domain +  '/smile/ig_media?filter={"hashtag":"' + hashtag + '"}&count&pagesize=1000&page=1';
    var page = 1;
    var maxPage = 100;
    var processing = [];

    do{
        $.ajax({
            async: false,
            type: "GET",
            url: rest,
            dataType: "json",
            success: function(response){
                page++;
                rest = domain +  '/smile/ig_media?filter={"hashtag":"' + hashtag + '"}&count&pagesize=1000&page=' + page;
                maxPage = response._total_pages;
                for(let a of response._embedded){
                    processing.push(a);
                }
            }
        });
    }while(page <= maxPage)
    return processing;
}

export function getIGHistory(){
	var domain = getDbPath();
	var rest = domain + "/smile/user_search";
	var history = {};
	
	$.ajax({
		async: false,
		type: "GET",
        url: rest,
        dataType: "json",
        success: function(response){
			history = response._embedded;
		}
	});
	
	return history;
}

export function getIGCount(hashtag){
    var domain = getDbPath();
    var rest = domain + '/smile/ig_media?filter={"hashtag":"' + hashtag + '"}&count&pagesize=0';
    var count = 0;

    $.ajax({
        async: false,
        type: "GET",
        url: rest,
        dataType: "json",
        success: function(response){
            count = response._size;
        }
    });

    return count;
}

export function getLatestMediaID(hashtag){
    var domain = getDbPath();
    var rest = domain + '/smile/ig_media?filter={"hashtag":"' + hashtag + '"}&sort=-ig_object.taken_at_timestamp&pagesize=1&np';
    var instagramId = "";

    $.ajax({
        async: false,
        type: "GET",
        url: rest,
        dataType: "json",
        success: function(response){
            if(response.length != 0)
                instagramId = response[0].ig_object.id;
        }
    });

    return instagramId;
}

export function getYearRange(hashtag){
	var low, high, yearRange = [], tempDate;
	var restLatest = domain + '/smile/ig_media?filter={"hashtag":"' + hashtag + '"}&sort=-ig_object.taken_at_timestamp&pagesize=1&np';
	var restOldest = domain + '/smile/ig_media?filter={"hashtag":"' + hashtag + '"}&sort=ig_object.taken_at_timestamp&pagesize=1&np';
	
	$.ajax({
        async: false,
        type: "GET",
        url: restLatest,
        dataType: "json",
        success: function(response){
            if(response.length != 0){
				tempDate = new Date((response[0].ig_object.taken_at_timestamp) * 1000);
				high = tempDate.getFullYear();
			}
        }
    });
	$.ajax({
        async: false,
        type: "GET",
        url: restOldest,
        dataType: "json",
        success: function(response){
            if(response.length != 0){
				tempDate = new Date((response[0].ig_object.taken_at_timestamp) * 1000);
				low = tempDate.getFullYear();
			}
        }
    });
	for(var i = low; i <= high; i++){
		yearRange.push(i);
	}
	if(yearRange.length == 0)
		yearRange = [(new Date()).getFullYear()];
	return yearRange;
}

export function getSpecificRange(startUnix, endUnix, hashtag){
    var igMedia = [];
    var url = getDbPath() + "/smile/ig_media?filter={'hashtag':'" + hashtag + "'}&filter={'ig_object.taken_at_timestamp':{'$gte':" + startUnix + "}}&filter={'ig_object.taken_at_timestamp':{'$lte':" + endUnix + "}}&pagesize=1000";

    $.ajax({
        async: false,
        type: "GET",
        url: url,
        dataType: "json",
        success: function(response){
            igMedia = response._embedded;
        }
    });
    return igMedia;
}

export function tryIGSearch(desiredHashtag){
    var isUsed = false;
    $.ajax({
        async: false,
        url: 'https://www.instagram.com/explore/tags/' + desiredHashtag + '/?__a=1',
        type: "GET",
        dataType: 'json',
        success: function(data, textStatus, jqXHR) {
            isUsed = true;
        },
        error: function(jqXHR, textStatus, errorThrown) {
            isUsed = false;
        }
    });
    return isUsed;
}

export function getGoogleProcessingRange(startUnix, endUnix, hashtag){
    var igMediaId = [];
    var url = "http://127.0.0.1:88/smile/ig_media?filter={'hashtag':'" + hashtag + "'}&filter={'ig_object.taken_at_timestamp':{'$gte':" + startUnix + "}}&filter={'ig_object.taken_at_timestamp':{'$lte':" + endUnix + "}}&pagesize=1000";
    var googleProcessing = [];
    $.ajax({
        async: false,
        type: "GET",
        url: url,
        dataType: "json",
        success: function(response){
            for(let a of response._embedded){
                igMediaId.push(a.ig_object.id);
            }
        }
    });
    url = "http://127.0.0.1:88/smile/ig_processing_google?filter={'ig_id':{'$in': " + JSON.stringify(igMediaId) + "}}&filter={'hashtag': '" + hashtag + "'}";
    //console.log(url);

    $.ajax({
        async: false,
        type: "GET",
        url: url,
        dataType: "json",
        success: function(response){
            googleProcessing = response._embedded;
        }
    });

    return googleProcessing;
}