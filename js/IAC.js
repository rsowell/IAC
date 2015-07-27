//JQUERY check for file
function doesNextSectionExist(file)
{
	filez = file;
    $.ajax({
    	url: file,
    	type:'HEAD',
    	error: function()
    	{
    		getNextChapter(file);
    	},
    	success: function()
    	{
      		loadNextPassage(file);
    	}
	});
}

//JQUERY check for file
function doesNextChapterExist(file)
{
	filez = file;
    $.ajax({
    	url: file,
    	type:'HEAD',
    	error: function()
    	{
    		getNextBook(file);
    	},
    	success: function()
    	{
      		loadNextPassage(file);
    	}
	});
}

//JQUERY check for file
function doesNextBookExist(file)
{
	filez = file; 
    $.ajax({
    	url: file,
    	type:'HEAD',
    	error: function()
    	{
            //what do we do?
    	},
    	success: function()
    	{
      		loadNextPassage(file);
    	}
	});
}

function getNextSection(curr)
{
	//Stripping down the name of the JSON file
	var str = curr;

    //look for the passage number
    var patt = /\d.\d.\d/g;
    var num = patt.exec(str).toString();
   
    /*breaks down the passage number into book/chapter/section*/
    //ex. passage-2.13.1  -> book=2 / chapter=13 / section=1
    var book = num.substring(0, num.indexOf("."));
    var chapter = num.substring(num.indexOf(".")+1, num.lastIndexOf("."));
    var section = num.substring(num.lastIndexOf(".")+1, num.length);


    /*Search for the next file. 
    This will check if the next passage exist in this section and chapter, if it does it will load it.  
    If that file does not exist, it will go to the next section, and set the passage to 1. 
    If that file does not exist, it will go to the next chapter, and set the section and passage to 1.
    //adding 1 to the passage, going to the next passage;
	passage = Number(passage) + 1; */
	//checking if the next passage exist
    var file = "passages/".concat(book).concat(".").concat(chapter).concat(".").concat(Number(section)+1).concat(".json");

    doesNextSectionExist(file);
}

function getNextChapter(curr)
{
	//Stripping down the name of the JSON file
	var str = curr;

    //look for the passage number
    var patt = /\d.\d.\d/g;
    var num = patt.exec(str).toString();
   
    /*breaks down the passage number into book/chapter/section*/
    //ex. passage-2.13.1  -> book=2 / chapter=13 / section=1
    var book = num.substring(0, num.indexOf("."));
    var chapter = num.substring(num.indexOf(".")+1, num.lastIndexOf("."));
    var section = num.substring(num.lastIndexOf(".")+1, num.length);

    //looking for the next section
    var file = "passages/".concat(book).concat(".").concat(Number(chapter)+1).concat(".").concat("1").concat(".json"); 

    doesNextChapterExist(file);
    	
}

function getNextBook(curr)
{
	//Stripping down the name of the JSON file
	var str = curr;

    //look for the passage number
    var patt = /\d.\d.\d/g;
    var num = patt.exec(str).toString();
   
    /*breaks down the passage number into book/chapter/section*/
    //ex. passage-2.13.1  -> book=2 / chapter=13 / section=1
    var book = num.substring(0, num.indexOf("."));
    var chapter = num.substring(num.indexOf(".")+1, num.lastIndexOf("."));
    var section = num.substring(num.lastIndexOf(".")+1, num.length);

    //looking for the next section
    var file = "passages/".concat(Number(book)+1).concat(".").concat("1").concat(".").concat("1").concat(".json"); 

    doesNextBookExist(file);
}


//This section of code handles the calling of the next passage.  Loading in the JSON file and changing the contents of the page.
function loadNextPassage(file)
{
	var timeout = 400;
    //Fading out effect
    $("#passage-title").fadeOut(timeout);
    $("#title").fadeOut(timeout);
    $("#pre-post").fadeOut(timeout);
    $("#passage-content").fadeOut(timeout);
    $("#media-content").fadeOut(timeout, function() {
        //load the new JSON file and change the elements
        $.getJSON(file, function( data ) {
            document.getElementById("passage-title").innerHTML = data["passageNumber"];
            document.getElementById("title").innerHTML = data["title"];
            document.getElementById("pre-post").innerHTML = "<p class='serif'>".concat(data["preReading"]).concat('</p>');
            document.getElementById("pre-reading-content").innerHTML = "<p class='serif'>".concat(data["preReading"]).concat('</p>');
            document.getElementById("post-reading-content").innerHTML = "<p class='serif'>".concat(data["postReading"]).concat('</p>');
            document.getElementById("passage-content").innerHTML = "<p class='serif'>".concat(data["reading"]).concat('</p>');
            document.getElementById("media-content").innerHTML = "<p class='media'>".concat(data["media"]).concat('</p>');
            //if the site has gps data, pan to the site.
            if(data["lat"] != "" && data["lon"] != "")
            { 
                map.panTo([data["lon"],data["lat"]], 
                {
                    animate:true, 
                    duration:3
                })
            }

            //fading the elements back in
            $("#passage-title").fadeIn(timeout);
            $("#title").fadeIn(timeout);
            $("#pre-post").fadeIn(timeout);
            $("#passage-content").fadeIn(timeout);
            $("#media-content").fadeIn(timeout);
        });
    });
filez = file;
}

//This section of code handles the calling of the first passage.  Loading in the JSON file and changing the contents of the page.
function loadFirstPassage()
{
    var file = "passages/2.1.1.json";
        //load the new JSON file and change the elements
        $.getJSON(file, function( data ) {
            document.getElementById("passage-title").innerHTML = data["passageNumber"];
            document.getElementById("title").innerHTML = data["title"];
            document.getElementById("pre-reading-content").innerHTML = "<p class='serif'>".concat(data["preReading"]).concat('</p>');
            document.getElementById("post-reading-content").innerHTML = "<p class='serif'>".concat(data["postReading"]).concat('</p>');
            document.getElementById("passage-content").innerHTML = "<p class='serif'>".concat(data["reading"]).concat('</p>');
            document.getElementById("media-content").innerHTML = "<p class='media'>".concat(data["media"]).concat('</p>');
            //if the site has gps data, pan to the site.
            if(data["lat"] != "" && data["lon"] != "")
            { 
                map.panTo([data["lon"],data["lat"]], 
                {
                    animate:true, 
                    duration:3
                })
            }

       });
}

//JQUERY check for file
function doesLastSectionExist(file)
{
    filez = file;
    $.ajax({
        url: file,
        type:'HEAD',
        error: function()
        {
            getLastSection(file);
        },
        success: function()
        {
            loadNextPassage(file);
        }
    });
}


function getLastSection(curr)
{
    //Stripping down the name of the JSON file
    var str = curr;

    //look for the passage number
    var patt = /\d.\d.\d/g;
    var num = patt.exec(str).toString();
   
    /*breaks down the passage number into book/chapter/section*/
    //ex. passage-2.13.1  -> book=2 / chapter=13 / section=1
    var book = num.substring(0, num.indexOf("."));
    var chapter = num.substring(num.indexOf(".")+1, num.lastIndexOf("."));
    var section = num.substring(num.lastIndexOf(".")+1, num.length);
    console.log("function");


    if (Number(section) != 1)
    {
        //checking if the last passage exist
        var file = "passages/".concat(book).concat(".").concat(chapter).concat(".").concat(Number(section)-1).concat(".json");
         console.log( file + " section != 1");
    }
    else
    {
        if(Number(chapter) != 1)
        {
           var file = "passages/".concat(book).concat(".").concat(Number(chapter)-1).concat(".").concat(100).concat(".json");
            console.log( file+ " chapter != 1");
        }
        else 
        {
            if (Number(book)!= 1)
            {
                var file = "passages/".concat(Number(book)-1).concat(".").concat(25).concat(".").concat(100).concat(".json");
                 console.log( file + " book != 1");
            }
            else
            {
                //do something else
                 console.log( "LAWLZ");
            }
        }
    }
    console.log(file);
    doesLastSectionExist(file);
}


