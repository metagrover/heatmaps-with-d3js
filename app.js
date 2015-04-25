var app = angular.module('housing', ['ui.router', 'ngMap']);
    
app.controller('baseController', ['$scope', function ($scope) {
            d3.json("bangalore_pincode779.json",function(geoJson){


            var color = d3.scale.linear()
					 	.domain([2000,5000])
					 	.range([ "yellow","red"]);
            var overlay = new google.maps.OverlayView();
            overlay.onAdd = function () {

                var layer = d3.select(this.getPanes().overlayLayer).append("div").attr("class", "SvgOverlay");
                var svg = layer.append("svg");
                var adminDivisions = svg.append("g").attr("class", "AdminDivisions");

                overlay.draw = function () {
                    var markerOverlay = this;
                    var overlayProjection = markerOverlay.getProjection();

                    // Turn the overlay projection into a d3 projection
                    var googleMapProjection = function (coordinates) {
                        var googleCoordinates = new google.maps.LatLng(coordinates[1], coordinates[0]);
                        var pixelCoordinates = overlayProjection.fromLatLngToDivPixel(googleCoordinates);
                        return [pixelCoordinates.x + 4000, pixelCoordinates.y + 4000];
                    }

                    path = d3.geo.path().projection(googleMapProjection);
                    adminDivisions.selectAll("path")
                        .data(geoJson.features)
                        .attr("d", path) // update existing paths
                    .enter().append("svg:path")
                        .attr("d", path)
                        // .attr("stroke",function(){return "black";})
                        // .attr("fill",function(d,i){return  "rgb(" + (Math.floor((Math.random() * 255) + 1)) + "," +(Math.floor((Math.random() * 255) + 1))+"," +0+")";})
                        // .attr("fill", function(d,i){ ; return d.properties.PI})
                        // .attr("class", function(d) { return "q"+Math.floor((Math.random() * 9) + 0); })
                        .attr("fill", function(d,i){console.log(d.properties.Prices,i); return color(d.properties.Prices);})
                };

            };

            overlay.setMap($scope.map);
        });
}]);