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

