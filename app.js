var app = angular.module('housing', ['ui.router', 'ngMap']);
    
app.controller('baseController', ['$scope', function ($scope) {

    d3.json("data/bangalore_pincode2015.json",function(geoJson){
            var color = d3.scale.quantize()
        			 	.domain([2000,2300,2600,2700,3000,3300,3800])
        			 	.range([ "rgb(254,217,118)","rgb(254,178,76)","rgb(253,141,60)","rgb(252,78,42)","rgb(227,26,28)","rgb(189,0,38)","rgb(128,0,38)"]);
            var overlay = new google.maps.OverlayView();
            overlay.onAdd = function () {

            var layer = d3.select(this.getPanes().overlayMouseTarget).append("div").attr("class", "SvgOverlay");
            var svg = layer.append("svg");
            var disableListener = false;																																																																																																																																			
            var adminDivisions = svg.append("g").attr("class", "AdminDivisions");
            var legendRectSize = 18;
			var legendSpacing = 4;
			var price_range = ["2000","2300","2600","2700","3000","3300","3800"]


            var legend = d3.select("#legendId").append("svg").selectAll('.legend')
							  .data(color.range())
							  .enter()
							  .append('g')
							  .attr('class', 'legend')
							    .attr('transform', function(d, i) {
							    var height = legendRectSize + legendSpacing;
							    var vert = i * height;
							    return 'translate(' + 0 + ',' + vert + ')';
							  });
			legend.append('rect')
				  .attr('width', legendRectSize)
				  .attr('height', legendRectSize)
				  .attr('fill', function(d,i){return d;})
				 	.attr('stroke', function(d,i){return d;})

		

			legend.append('text')
				  .attr('x', legendRectSize + legendSpacing)
				  .attr('y', legendRectSize - legendSpacing)
				  .text(function(d,i) { return "Rs " + price_range[i] + " per sqft"; });


            overlay.draw = function () {
                var markerOverlay = this;
                var overlayProjection = markerOverlay.getProjection();
                var pricesArray = [];

				var tip = d3.tip()
				  .attr('class', 'd3-tip')
				  .offset([+20, -20])
				  .html(function(d) {
				    return "<span style='color:yellow'>"+d.properties.name + "</span><br>"+"<strong>Price:</strong> <span style='color:red'>" + (d.properties.Prices - (Math.floor(Math.random()*600)+200))+" - "+d.properties.Prices +" </span> per sqft";
				  })

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
                	.append("svg:path")
                    .attr("d", path)
                    .attr("fill", function(d,i){pricesArray.push(d.properties.Prices); return color(d.properties.Prices);})
                    .on("mouseover",tip.show)
                    .on("mouseout", tip.hide)
                    .on("click", function(d,i){d3.select(".panelClass").remove(); 
                    							d3.select(".close").remove();
                    							var panel =  d3.select("#panel")
                    												
                    												panel.append("div").attr("class","panelClass")
                    												.text(d.properties.name)
                    												.append("div")
                    												.attr("class","price")
                    													.text("Rs " + d.properties.Prices + " per sqft")
                                                                    .append("div")
                                                                    .attr("class","c-rate")
                                                                        .text(function(){
                                                                            if(d.properties.Prices%10 > 7){
                                                                                return "High";
                                                                            }
                                                                            else if(d.properties.Prices%10 > 4){
                                                                                return "Moderate";
                                                                            }
                                                                            else{
                                                                                return "Low";
                                                                            }
                                                                        })
                                                                    .append("div")
                                                                    .attr("class","t-rate")
                                                                        .text(function(){
                                                                            var x =Math.floor((Math.random()*10)+2);
                                                                            if(x<4){
                                                                                return "High";
                                                                            }
                                                                            else if(x<8){
                                                                                return "Moderate";
                                                                            }
                                                                            else{
                                                                                return "Low";
                                                                            }
                                                                        }); 

                    							panel.append("div").attr("class","close")
                    							.on("click", function(){
                    								// if(d3.select(this)[0][0])

                    								d3.select(".panelClass").remove();                    						
                    								d3.select(".close").remove();    
                    								})                							
                    												})
                    .call(tip);

           

                   $scope.map.set("disableDoubleClickZoom", true);

      
            };
           
        };
            overlay.setMap($scope.map);
    });

    $scope.update = function(data){
         d3.select('.SvgOverlay').remove();
         d3.json("data/bangalore_pincode"+data+".json",function(geoJson){
            var color = d3.scale.quantize()
                    	.domain([2000,2300,2600,2700,3000,3300,3800])
        			 	.range([ "rgb(254,217,118)","rgb(254,178,76)","rgb(253,141,60)","rgb(252,78,42)","rgb(227,26,28)","rgb(189,0,38)","rgb(128,0,38)"]);

            var overlay = new google.maps.OverlayView();
            overlay.onAdd = function () {

            var layer = d3.select(this.getPanes().overlayMouseTarget).append("div").attr("class", "SvgOverlay");
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
				    return "<span style='color:yellow'>"+d.properties.name + "</span><br>"+"<strong>Price:</strong> <span style='color:red'>" + (d.properties.Prices - (Math.floor(Math.random()*600)+200))+" - "+d.properties.Prices +" </span> per sqft";
				  })


                var googleMapProjection = function (coordinates) {
                    var googleCoordinates = new google.maps.LatLng(coordinates[1], coordinates[0]);
                    var pixelCoordinates = overlayProjection.fromLatLngToDivPixel(googleCoordinates);
                    return [pixelCoordinates.x + 4000, pixelCoordinates.y + 4000];
                }

                path = d3.geo.path().projection(googleMapProjection);
             	adminDivisions.selectAll("path")
                    .data(geoJson.features)
                    .enter()
                    .append("g")
                	.append("svg:path")
                    .attr("d", path)	
                    .attr("fill", function(d,i){pricesArray.push(d.properties.Prices); return color(d.properties.Prices);})      
                    .on("mouseover",tip.show)
                    .on("mouseout", tip.hide)
                     .on("click", function(d,i){d3.select(".panelClass").remove(); 
                    							d3.select(".close").remove();
                    							var panel =  d3.select("#panel")
                    												
                    												panel.append("div").attr("class","panelClass")
                    												.text(d.properties.name)
                    												.append("div")
                    												.attr("class","price")
                    													.text("Rs " + d.properties.Prices + " per sqft")
                                                                    .append("div")
                                                                    .attr("class","c-rate")
                                                                        .text(function(){
                                                                            if(d.properties.Prices%10 > 7){
                                                                                return "High";
                                                                            }
                                                                            else if(d.properties.Prices%10 > 4){
                                                                                return "Moderate";
                                                                            }
                                                                            else{
                                                                                return "Low";
                                                                            }
                                                                        })
                                                                    .append("div")
                                                                    .attr("class","t-rate")
                                                                        .text(function(){
                                                                            var x = Math.floor((Math.random()*10)+2);
                                                                            if(x<4){
                                                                                return "High";
                                                                            }
                                                                            else if(x<8){
                                                                                return "Moderate";
                                                                            }
                                                                            else{
                                                                                return "Low";
                                                                            }
                                                                        });    

                    							panel.append("div").attr("class","close")
                    							.on("click", function(){
                    								// if(d3.select(this)[0][0])

                    								d3.select(".panelClass").remove();                    						
                    								d3.select(".close").remove();    
                    								})                							
                    												})
                    .call(tip);


                
                   $scope.map.set("disableDoubleClickZoom", true);

            
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
						  featureType: 'water	',
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