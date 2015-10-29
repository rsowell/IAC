var map, featureList, boroughSearch = [], theaterSearch = [], museumSearch = [];

$(window).resize(function() {
  sizeLayerControl();
  if ($(this).width() <  768)
  {
     $(".row").height("50%");
  }
  else
  {
     $(".row").height("100%");
  }
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
  console.log(width);
  if(width < 90)
  {
      $("#map-container").width("100%");
      $("#reading-container").hide();
  }
  else
  {
      $("#map-container").attr( "style", "" );
      $("#reading-container").show();
  }
  map.invalidateSize();
});

$("#reading-max").on("click", function(e){
  width = $("#reading-container").width() / $(document).width() * 100; 
  console.log(width);
  if(width < 90)
  {
      $("#reading-container").width("100%");
      $("#map-container").hide();
  }
  else
  {
      $("#reading-container").attr( "style", "" );
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
  if($("#pre-content").text() == "" )
  {
    $('#pre-reading-btn').prop('disabled', true); // Disables visually and functionally
    console.log('yayayayay');
  }
  if($("#passage-content").text() == "" )
  {
    $('#passage-btn').prop('disabled', true); // Disables visually and functionally
  }
  if($("#post-content").text() == "" )
  {
    $('#post-reading-btn').prop('disabled', true); // Disables visually and functionally
  }
  if($("#media-content").text() == "" )
  {
    $('#media-btn').prop('disabled', true); // Disables visually and functionally
  }
  if($("#question-content").text() == "" )
  {
    $('#question-btn').prop('disabled', true); // Disables visually and functionally
  }
}


        /**This function grabs a passage by its Passage Number.
        It will then set all of the HTML reading container fields.
        @param pasNum the number of the passage.*/
        function getPassage(pasNum){
        //This grabs a Service that given a passage number, will return all of the infomration regarding the passage.
        $.getJSON('http://imaginingancientcorinth.com/cms/rest/views/rest_api?filters[num]='+pasNum , function (data) {
            $("#passageNumber").html(data[0].passageNumber);
            $("#text-title-name").html(data[0].node_title);
            $("#pre-content").html(data[0].pre_q);
            $("#post-content").html(data[0].post_q);
            $("#passage-content").html(data[0].body);
            //$("#question-content").html(data[0].question);
            //$("#media-content").html();
            var content = $('#passage-content').html();
            $("#text-content").html(content);
            //if the site has gps data, pan to the site.
            if(data[0].lat != null && data[0].lon != null)
             { 
                map.panTo([data[0].lon, data[0].lat], 
                {
                    animate:true, 
                    duration:3
                });
             }
                disableButtons();
          });
        }