var map, featureList, boroughSearch = [], theaterSearch = [], museumSearch = [];

$(window).resize(function() {
  sizeLayerControl();
});

$(document).on("click", ".feature-row", function(e) {
  $(document).off("mouseout", ".feature-row", clearHighlight);
  sidebarClick(parseInt($(this).attr("id"), 10));
});

$(document).on("mouseover", ".feature-row", function(e) {
  highlight.clearLayers().addLayer(L.circleMarker([$(this).attr("lat"), $(this).attr("lng")], highlightStyle));
});

$(document).on("mouseout", ".feature-row", clearHighlight);

$("#about-btn").click(function() {
  $("#aboutModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#full-extent-btn").click(function() {
  map.fitBounds(boroughs.getBounds());
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#legend-btn").click(function() {
  $("#legendModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#login-btn").click(function() {
  $("#loginModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});


$("#nav-btn").click(function() {
  $(".navbar-collapse").collapse("toggle");
  return false;
});


function sizeLayerControl() {
  $(".leaflet-control-layers").css("max-height", $("#map").height() - 50);
}

function clearHighlight() {
  highlight.clearLayers();
}

function sidebarClick(id) {
  var layer = markerClusters.getLayer(id);
  map.setView([layer.getLatLng().lat, layer.getLatLng().lng], 17);
  layer.fire("click");
  /* Hide sidebar and go to the map on small screens */
  if (document.body.clientWidth <= 767) {
    $("#reading-sidebar").hide();
    $("#map-sidebar").hide();
    map.invalidateSize();
  }
}

/* Larger screens get expanded layer control and visible sidebar */
if (document.body.clientWidth <= 767) {
  var isCollapsed = true;
} else {
  var isCollapsed = false;
}

/* Highlight search box text on click */
$("#searchbox").click(function () {
  $(this).select();
});

/* Prevent hitting enter from refreshing the page */
$("#searchbox").keypress(function (e) {
  if (e.which == 13) {
    e.preventDefault();
  }
});

$("#featureModal").on("hidden.bs.modal", function (e) {
  $(document).on("mouseout", ".feature-row", clearHighlight);
});

$("#reading-list-btn").on("click", function(e){ 
  if($("#reading-sidebar").is(":hidden"))
  {
    $("#reading-sidebar").show();
    $("#text-container").removeClass("col-xs-12").addClass("col-xs-9"); 
  } 
  else 
  {
    $("#reading-sidebar").hide();
    $("#text-container").removeClass("col-xs-9").addClass("col-xs-12");
  }
  map.invalidateSize();
});

$("#reading-sidebar-hide-btn").on("click", function(e){ 
  if($("#reading-sidebar").is(":hidden"))
  {
    $("#reading-sidebar").show();
    $("#text-container").removeClass("col-xs-12").addClass("col-xs-9"); 
  } 
  else 
  {
    $("#reading-sidebar").hide();
    $("#text-container").removeClass("col-xs-9").addClass("col-xs-12");
  }
  map.invalidateSize();
});

$("#map-list-btn").on("click", function(e){ 
  if($("#map-sidebar").is(":hidden"))
  {
    $("#map-sidebar").show();
    $("#map").removeClass("col-xs-12").addClass("col-xs-9");
  }  
  else 
  {
    $("#map-sidebar").hide();
    $("#map").removeClass("col-xs-9").addClass("col-xs-12");
  }
  map.invalidateSize();
});

$("#map-sidebar-hide-btn").on("click", function(e){ 
  if($("#map-sidebar").is(":hidden"))
  {
    $("#map-sidebar").show();
    $("#map").removeClass("col-xs-12").addClass("col-xs-9");
  }  
  else 
  {
    $("#map-sidebar").hide();
    $("#map").removeClass("col-xs-9").addClass("col-xs-12");
  }
  map.invalidateSize();
});

$("#map-max").on("click", function(e){
  width = $("#map-container").width() / $(document).width() * 100; 
  if(width != 100)
  {
      $("#map-container").width("100%");
      $("#reading-container").hide();
  }
  else
  {
      $("#map-container").width("50%");
      $("#reading-container").show();
  }
  map.invalidateSize();
});

$("#reading-max").on("click", function(e){
  width = $("#reading-container").width() / $(document).width() * 100; 
  console.log(width);
  if(width != 100)
  {
      $("#reading-container").width("100%");
      $("#map-container").hide();
  }
  else
  {
      $("#reading-container").width("50%");
      $("#map-container").show();
  }
  map.invalidateSize();
});


$("#pre-reading-btn").on("click", function(e){
  var content = $('#pre-content').html();
  $("#text-content").html(content);
});

$("#passage-btn").on("click", function(e){
  var content = $('#passage-content').html();
  $("#text-content").html(content);
});

$("#post-reading-btn").on("click", function(e){
  var content = $('#post-content').html();
  $("#text-content").html(content);
});

$("#media-btn").on("click", function(e){
  var content = $('#media-content').html();
  $("#text-content").html(content);
});

$("#question-btn").on("click", function(e){
  var content = $('#question-content').html();
  $("#text-content").html(content);
});

/*
This function should be loaded everytime a new passage is loaded. It will look at each content section.
If a content section is null/empty The button should be disabled and should look grayed out
*/
function disableButtons(){
  if($("#pre-content").html() == "" )
  {
    $('#pre-reading-btn').prop('disabled', true); // Disables visually and functionally
  }
  if($("#passage-content").html() == "" )
  {
    $('#passage-btn').prop('disabled', true); // Disables visually and functionally
  }
  if($("#post-content").html() == "" )
  {
    $('#post-reading-btn').prop('disabled', true); // Disables visually and functionally
  }
  if($("#media-content").html() == "" )
  {
    $('#media-btn').prop('disabled', true); // Disables visually and functionally
  }
  if($("#question-content").html() == "" )
  {
    $('#question-btn').prop('disabled', true); // Disables visually and functionally
  }
}


//This section of code handles the calling of the first passage.  Loading in the JSON file and changing the contents of the page.
function loadFirstPassage()
{
    var file = "passages/2.3.1.json";
        //load the new JSON file and change the elements
        $.getJSON(file, function( data ) {
            $("#passageNumber").html(data["passageNumber"]);
            $("#text-title-name").html(data["title"]);;
            $("#pre-content").html(data["preReading"]);
            $("#post-content").html(data["postReading"]);
            $("#passage-content").html(data["reading"]);
            $("#media-content").html(data["media"]);
            var content = $('#passage-content').html();
            $("#text-content").html(content);
            //if the site has gps data, pan to the site.
            /*if(data["lat"] != "" && data["lon"] != "")
            { 
                map.panTo([data["lon"],data["lat"]], 
                {
                    animate:true, 
                    duration:3
                })
            }*/
                disableButtons();
       });
}