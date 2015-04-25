var app = angular.module('housing', ['ui.router', 'ngMap']);
    
app.controller('baseController', ['$scope', function ($scope) {

    d3.json("bangalore_pincode2015.json",function(geoJson){
            var color = d3.scale.quantize()
        			 	.domain([2000,2300,2600,2700,3000,3300,3800])
        			 	.range([ "rgb(254,217,118)","rgb(254,178,76)","rgb(253,141,60)","rgb(252,78,42)","rgb(227,26,28)","rgb(189,0,38)","rgb(128,0,38)"]);
            var overlay = new google.maps.OverlayView();
            overlay.onAdd = function () {

            var layer = d3.select(this.getPanes().overlayMouseTarget).append("div").attr("class", "SvgOverlay");
            console.log(layer)
            var svg = layer.append("svg");
            var disableListener = false;																																																																																																																																			
            var adminDivisions = svg.append("g").attr("class", "AdminDivisions");



            overlay.draw = function () {
                var markerOverlay = this;
                var overlayProjection = markerOverlay.getProjection();
                var pricesArray = [];

				var tip = d3.tip()
				  .attr('class', 'd3-tip')
				  .offset([+20, -20])
				  .html(function(d) {
				  	console.log(d);
				    return "<strong>Price:</strong> <span style='color:	'>" + d.properties.Prices + "</span>";
				  })

                // Turn the overlay projection into a d3 projection
                var googleMapProjection = function (coordinates) {
                    var googleCoordinates = new google.maps.LatLng(coordinates[1], coordinates[0]);
                    var pixelCoordinates = overlayProjection.fromLatLngToDivPixel(googleCoordinates);
                    return [pixelCoordinates.x + 4000, pixelCoordinates.y + 4000];
                }

                path = d3.geo.path().projection(googleMapProjection);
                var first = adminDivisions.selectAll("path")
                    .data(geoJson.features)
                    .enter()
                    .append("g")
                    

                    
                    

                   var t = first // update existing paths
                	.append("svg:path")
                    .attr("d", path)	
                    .attr("fill", function(d,i){pricesArray.push(d.properties.Prices); return color(d.properties.Prices);})
                    // .attr("x", function(d,i){return i})
                    // .attr("y", function(d,i){return i})

                    .on("mouseover",tip.show)
                    .on("mouseout", tip.hide)

                   t.call(tip);

                   // var q = first.append("title")
                   // 				// .on("mouseover",function(){console.log(d3.mouse(this)); d3.selectAll('path').style("fill","blue"); })
                   // 				// .append("rect")
                   // 				// .style("visibility","hidden")
                   // 				// .attr("x",0)
                   // 				// .attr("y",0)
                   // 				// .attr("width",80)
                   // 				// .attr("height", 40)

                   // 				// .on("onmousedown",function(d){console.log(d3.mouse(this),d); return tip.show })
                   // 				.text(function(d,i){return d.properties.Prices;})
                   // 				// .on("dblclick",function(){console.log(d3.mouse(this)); })
                   // 				.append("g")
                   // 				// .on("dblclick",function(){console.log(d3.mouse(this)); })
                   // 				.text("te")

                   $scope.map.set("disableDoubleClickZoom", true);

                   				// .text(function(d,i){return d.properties.Price;})
                   // d3.select("#map-wrap").append("svg:text")
                   //  .text("tejehs")
                   //  .attr("z-index",99999)


                    // d3.select("#hot_map")
                    // 	.append("svg")
                    // 	.attr("height",600)
                    	
//                     google.maps.event.addListener(path, 'click', function() {

//                     	console.log(index);
//                     	console.log(oldPoint);
 
// });


                 //        d3.select("#panel")
                	// .text(Math.max.apply(null, pricesArray));
            };
           
        };
            overlay.setMap($scope.map);
    });

    $scope.update = function(data){
         d3.select('.SvgOverlay').remove();
         d3.json("bangalore_pincode"+data+".json",function(geoJson){
            // var color = d3.scale.quantize()
        			 // 	.domain([2000,2300,2600,3000,3300,3600,4000,4500,5000])
        			 // 	.range([ "rgb(255,255,204)","rgb(255,237,160)","rgb(254,217,118)","rgb(254,178,76)","rgb(253,141,60)","rgb(252,78,42)","rgb(227,26,28)","rgb(189,0,38)","rgb(128,0,38)"]);
            var color = d3.scale.quantize()
                    	.domain([2000,2300,2600,2700,3000,3300,3800])
        			 	.range([ "rgb(254,217,118)","rgb(254,178,76)","rgb(253,141,60)","rgb(252,78,42)","rgb(227,26,28)","rgb(189,0,38)","rgb(128,0,38)"]);

            var overlay = new google.maps.OverlayView();
            overlay.onAdd = function () {

            var layer = d3.select(this.getPanes().overlayMouseTarget).append("div").attr("class", "SvgOverlay");
            console.log(layer)
            var svg = layer.append("svg");
            var disableListener = false;																																																																																																																																			
            var adminDivisions = svg.append("g").attr("class", "AdminDivisions");



            overlay.draw = function () {
                var markerOverlay = this;
                var overlayProjection = markerOverlay.getProjection();
                var pricesArray = [];

				var tip = d3.tip()
				  .attr('class', 'd3-tip')
				  // .offset([-10, 0])
				  .html(function(d) {
				  	console.log(d);
				    return "<strong>Price:</strong> <span style='color:red'>" + d.properties.Prices + "</span>";
				  })

                // Turn the overlay projection into a d3 projection
                var googleMapProjection = function (coordinates) {
                    var googleCoordinates = new google.maps.LatLng(coordinates[1], coordinates[0]);
                    var pixelCoordinates = overlayProjection.fromLatLngToDivPixel(googleCoordinates);
                    return [pixelCoordinates.x + 4000, pixelCoordinates.y + 4000];
                }

                path = d3.geo.path().projection(googleMapProjection);
                var first = adminDivisions.selectAll("path")
                    .data(geoJson.features)
                    .enter()
                    .append("g")
                    

                    
                    

                   var t = first // update existing paths
                	.append("svg:path")
                    .attr("d", path)	
                    .attr("fill", function(d,i){pricesArray.push(d.properties.Prices); return color(d.properties.Prices);})
                    // .attr("x", function(d,i){return i})
                    // .attr("y", function(d,i){return i})

                    .on("mouseover",tip.show)
                    .on("mouseout", tip.hide)

                   t.call(tip);

                   // var q = first.append("title")
                   // 				// .on("mouseover",function(){console.log(d3.mouse(this)); d3.selectAll('path').style("fill","blue"); })
                   // 				// .append("rect")
                   // 				// .style("visibility","hidden")
                   // 				// .attr("x",0)
                   // 				// .attr("y",0)
                   // 				// .attr("width",80)
                   // 				// .attr("height", 40)

                   // 				// .on("onmousedown",function(d){console.log(d3.mouse(this),d); return tip.show })
                   // 				.text(function(d,i){return d.properties.Prices;})
                   // 				// .on("dblclick",function(){console.log(d3.mouse(this)); })
                   // 				.append("g")
                   // 				// .on("dblclick",function(){console.log(d3.mouse(this)); })
                   // 				.text("te")

                   $scope.map.set("disableDoubleClickZoom", true);

                   				// .text(function(d,i){return d.properties.Price;})
                   // d3.select("#map-wrap").append("svg:text")
                   //  .text("tejehs")
                   //  .attr("z-index",99999)


                    // d3.select("#hot_map")
                    // 	.append("svg")
                    // 	.attr("height",600)
                    	
//                     google.maps.event.addListener(path, 'click', function() {

//                     	console.log(index);
//                     	console.log(oldPoint);
 
// });


                 //        d3.select("#panel")
                	// .text(Math.max.apply(null, pricesArray));
            };

            $scope.map.set('styles', [
						           {
						  featureType: 'landscape',
						  elementType: 'geometry',
						  stylers: [
						    { visibility: 'off' }
						  ]
						},
						  {
						  featureType: 'poi',
						  elementType: 'geometry',
						  stylers: [
						    { visibility: 'off' }
						  ]
						},
						  {
						  featureType: 'water',
						  elementType: 'geometry',
						  stylers: [
						    { visibility: 'off' }
						  ]
						}
					]);
           
        };
            overlay.setMap($scope.map);
    });
    }

}]);