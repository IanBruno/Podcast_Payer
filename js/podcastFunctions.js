google.load("feeds", "1");
//google.feeds.Feed.XML_FORMAT;


//This is the main function, here we add the HTML elements according to the 
//tags that have been readed from the XML.
function initializeXML(url) {
    var feed = new google.feeds.Feed(url);
    feed.setResultFormat(google.feeds.Feed.XML_FORMAT);
    feed.setNumEntries(1000);

    feed.load(function(result) {
        if (!result.error) {

            //elements from the HTML page.
            var containerTitle = document.getElementById("titleDIV");
            containerTitle.innerHTML = "";
            var containerImage = document.getElementById("imageFeed");
            containerImage.innerHTML = "";
            var containerDetails = document.getElementById("details");
            containerDetails.innerHTML = "";
            var containerData = document.getElementById("contentTable");
            containerData.innerHTML = "";
            containerData.setAttribute("cellpadding","30");
            var containerEpisode = document.getElementById("episode");
            var containerMedia = document.getElementById("media");
            var containerAudio = document.getElementById("divAudio");
            containerAudio.innerHTML = "";

            var x = document.createElement("audio");

            x.setAttribute("controls", "controls");
            x.setAttribute("preload", "auto");
            x.setAttribute("id", "audio");

            containerAudio.appendChild(x);

            //elements From the HTML page.
            var trTableH = document.createElement("tr");
            trTableH.setAttribute("height","28");
            var th1 = document.createElement("th");
            var th2 = document.createElement("th");
            var th3 = document.createElement("th");
            th3.setAttribute("class", "visible-lg");
            var th4 = document.createElement("th");
            th4.setAttribute("class", "visible-lg");

            th1.appendChild(document.createTextNode(""));
            th2.appendChild(document.createTextNode("Name"));
            //th3.appendChild(document.createTextNode("Duraci\u00f3n"));
            th3.appendChild(document.createTextNode("Duration"));
            th4.appendChild(document.createTextNode("Published"));

            trTableH.appendChild(th1);
            trTableH.appendChild(th2);
            trTableH.appendChild(th3);
            trTableH.appendChild(th4);

            containerData.appendChild(trTableH);


            var divTitle = document.createElement("div");
            var divDescription = document.createElement("div");
            divDescription.setAttribute("class", "well");
            var h1Ttitle = document.createElement("h3");
            var divCopyR = document.createElement("div");

            titles = result.xmlDocument.getElementsByTagName('title');
            divTitle.appendChild(document.createTextNode(titles[0].firstChild.nodeValue)); //TITLE OF THE PODCAST

            copyR = result.xmlDocument.getElementsByTagName('link');
            divCopyR.appendChild(document.createTextNode(copyR[0].firstChild.nodeValue));
            containerDetails.appendChild(divCopyR);

            description = result.xmlDocument.getElementsByTagName('description');
            divDescription.appendChild(document.createTextNode(description[0].firstChild.nodeValue));

            h1Ttitle.appendChild(divTitle);
            containerTitle.appendChild(h1Ttitle);
            containerTitle.appendChild(divDescription);

            /***********we have to separate the NAMESPACE of the itunes RSS.  ********/
            nameSpace = result.xmlDocument.getElementsByTagNameNS("http://www.itunes.com/dtds/podcast-1.0.dtd", "image");

            var img = new Image();
            //var divImage = document.getElementById('imageFeed');
            img.onload = function() {
                containerImage.appendChild(img);
            };
            img.src = nameSpace[0].getAttribute("href");
            img.width = 200;
            img.height = 200;
            img.setAttribute("class", "img-rounded img-thumbnail");

            //alert(nameSpace[0].getAttribute("href"));


            var items = result.xmlDocument.getElementsByTagName('item');

            //iteration in the items tag to get all the episodes information.
            for (var i = 0; i < items.length; i++) {
                var item = items[i];


                var trTable = document.createElement("tr");
                var tdEpisode = document.createElement("td");
                tdEpisode.setAttribute("width", "400");
                var tdNumer = document.createElement("td");
                tdNumer.setAttribute("width","40");
                var tdDuration = document.createElement("td");
                tdDuration.setAttribute("width", "150");
                tdDuration.setAttribute("class", "visible-lg");
                var tdPubDate = document.createElement("td");
                tdPubDate.setAttribute("class", "visible-lg");
                tdPubDate.setAttribute("width", "300");

                var enclosure = item.getElementsByTagName('enclosure');
                var aList = document.createElement("a");

                aList.setAttribute("href", enclosure[0].getAttribute("url"));
                aList.appendChild(document.createTextNode(item.getElementsByTagName('title')[0].firstChild.nodeValue));


                date1 = new Date(item.getElementsByTagName('pubDate')[0].firstChild.nodeValue);
                dateP = date1.getDate();
                yearP = date1.getFullYear();
                monthP = date1.getMonth();

                nameSpaceDuration = item.getElementsByTagNameNS("http://www.itunes.com/dtds/podcast-1.0.dtd", "duration");


                //var divEpisode = document.createElement("div");
                //var divMedia = document.createElement("div");

                //div.appendChild(document.createTextNode(item.getElementsByTagName('publishedDate')[0].firstChild.nodeValue));
                //div.appendChild(document.createTextNode(item.content));
                //div.appendChild(document.createTextNode(item.description));
                //div.appendChild(document.createTextNode(entry.childNodes[0].attributes['id'].nodeValue));

                //tdEpisode.appendChild(divEpisode);
                //tdMedia.appendChild(divMedia);
                //containerData.appendChild(trTable);

                //divNumber.appendChild(ulNumber);
                tdNumer.appendChild(document.createTextNode(i + 1));
                tdEpisode.appendChild(aList);
                tdDuration.appendChild(document.createTextNode(nameSpaceDuration[0].firstChild.nodeValue));
                tdPubDate.appendChild(document.createTextNode(dateP + "-" + monthP + "-" + yearP));

                trTable.appendChild(tdNumer);
                trTable.appendChild(tdEpisode);
                trTable.appendChild(tdDuration);
                trTable.appendChild(tdPubDate);

                if(i%2==0)
                    trTable.setAttribute("bgcolor","#D6D6D6");
                trTable.setAttribute("height","28");
                containerData.appendChild(trTable);
            }


            /***** ADD the information obtained to the HTML page.******/
            


            //alert(item.getElementsByTagName('guid')[0].firstChild.nodeValue);
            //build each element
            /*
            var title = document.createElement("h4");
            title.innerHTML = item.getElementsByTagName('title')[0].firstChild.nodeValue;

            var content = document.createElement("p");
            content.innerHTML = item.getElementsByTagName('description')[0].firstChild.nodeValue;

            href = item.getElementsByTagName('link')[0].firstChild.nodeValue;
            */

        } else {
            //if the URL can not be read, we show the DialogModal Error.
            $("#myModal2").modal()
        }
        init();
    });

}
//THIS is a failed function, it SHOULD be ignored.
/*
function initialize(url) {
    //var feed = new google.feeds.Feed("http://feeds.feedburner.com/tiestos_club_life");
    //var feed = new google.feeds.Feed("http://kearnage.abtc-recordings.com/podcast.xml");

    var feed = new google.feeds.Feed(url);
    feed.setNumEntries(1000);

    feed.load(function(result) {
        if (!result.error) {
            var container = document.getElementById("feed");
            var containerTitle = document.getElementById("titleDIV");
            var containerImage = document.getElementById("imageFeed");

            var divTitle = document.createElement("div");
            divTitle.appendChild(document.createTextNode(result.feed.title)); //TITLE OF THE PODCAST

            divTitle.appendChild(document.createTextNode(result.feed.description));

            containerTitle.appendChild(divTitle);

            for (var i = 0; i < result.feed.entries.length; i++) {


                var entry = result.feed.entries[i];
                var div = document.createElement("div");
                div.appendChild(document.createTextNode(entry.title));
                div.appendChild(document.createTextNode(entry.publishedDate));
                div.appendChild(document.createTextNode(entry.content));
                div.appendChild(document.createTextNode(entry.description));
                //div.appendChild(document.createTextNode(entry.childNodes[0].attributes['id'].nodeValue));

                var x = document.createElement("AUDIO");

                if (x.canPlayType("audio/mpeg")) {
                    x.setAttribute("src", entry.guid);
                } else {
                    x.setAttribute("src", entry.guid);
                }

                x.setAttribute("controls", "controls");
                x.setAttribute("preload", "none");
                div.appendChild(x);

                container.appendChild(div);
            }
        } else {
            alert("URL no valida");
        }
    });
}


//TEST of Function to read an XML
//This is just a test, not used to load RSS
//****************************************************************
function readXML(url) {

    xmlDoc = loadXMLDoc(url);
    //alert("HOLA");
    x = xmlDoc.getElementsByTagName("item");
    for (i = 0; i < x.length; i++) {
        document.write(x[i].childNodes[0].nodeValue);
        document.write("<br>");
    }
}

function loadXMLDoc(filename) {
    if (window.XMLHttpRequest) {
        xhttp = new HttpRequest();
    } else // code for IE5 and IE6
    {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET", filename, false);
    xhttp.send();
    return xhttp.responseXML;
}
//***********************************************************
//END OF THE TEST
*/

//GET the url typed in the textField and activate de CallBack of the Google Feed Api
//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
function readRSS() {
    var url = document.getElementById("urlTextField").value;
    if (url.length == 0 || url == null) {
        $("#myModal").modal()
    } else
        google.setOnLoadCallback(initializeXML(url));
    //readXML(url);


}
//************************************************************


//FUNCTION TO CONTROL THE AUDIO PLAYER
var audio;
var playlist;
var tracks;
var current;


function init() {
    current = 0;
    audio = $('audio');
    playlist = $('#contentTable');
    tracks = playlist.find('tr td a');
    len = tracks.length - 1;
    audio[0].volume = .10;
    //ADD an event to the UL List to set the Source of the audio.
    playlist.find('a').click(function(e) {
        e.preventDefault();
        link = $(this);
        current = link.parent().index();
        run(link, audio[0]);
    });
    audio[0].addEventListener('ended', function(e) {
        current++;
        if (current == len) {
            current = 0;
            link = playlist.find('a')[0];
        } else {
            link = playlist.find('a')[current];
        }
        run($(link), audio[0]);
    });
}

function run(link, player) {
    player.src = link.attr('href');
    par = link.parent();
    par.addClass('active').siblings().removeClass('active');
    audio[0].load();
    audio[0].play();
}
