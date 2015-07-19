/* Plotting Data */
	function draw(filepath) {

		if (drawn) {
			svgPoints.selectAll("path").remove();
			svgPoints.selectAll(".centroid").remove();		
		}

		d3.json(filepath, function(collection) {

			/* Get hour value from slider */
			var hr = hour.innerHTML;

			/* Continue listening to slider even if data is already drawn */
			slider_hour.addEventListener('input', function(){
				hour.innerHTML = slider_hour.value;
				hr = hour.innerHTML;
				update();
			});
	
			/* Add a LatLng object to each item in the dataset */
			collection.forEach(function(d) {
				d.LatLng = new L.LatLng(d.lat,
										d.lon);
			})
			/* Get Voronoi polygons per centroid */
			var voronoi = d3.geom.voronoi()
			.x(function(d) { return map.latLngToLayerPoint(d.LatLng).x; })
			.y(function(d) { return map.latLngToLayerPoint(d.LatLng).y; });

			voronoi(collection).forEach(function(d) {
				d.point.cell = d;
			})

			/* Initializing points to be drawn */
			svgPoints = g.attr("class", "points")
      						 .selectAll("g")
        					 .data(collection)
      						 .enter().append("g")
       						 .attr("class", "point");

       		/* Builds paths for Voronoi polygons*/
    		var buildPathFromPoint = function(point) {
    			return "M" + point.cell.join("L") + "Z";
    		}

    		/* Update drawing when map is zoomed/moved */
			map.on("viewreset moveend", update);

			/* Initial drawing */
			update();

			/* Drawing points */
			function update() {
				/* Remove any points that have been drawn */
				svgPoints.selectAll("path").remove();
				svgPoints.selectAll(".centroid").remove();
				
				/* Draw only on visible part of the map*/
				bounds = map.getBounds(),
    	    	topLeft = map.latLngToLayerPoint(bounds.getNorthWest()),
    	    	bottomRight = map.latLngToLayerPoint(bounds.getSouthEast()),
    			existing = d3.set(),
    	  		drawLimit = bounds.pad(0.4);
    	  		
    	  		/* Updating SVG */
	    		svg = d3.select(map.getPanes().overlayPane).append("svg")
					 	.attr('id', 'overlay')
		    			.attr("class", "leaflet-zoom-hide")
		    			.style("width", map.getSize().x + 'px')
		     			.style("height", map.getSize().y + 'px')
		    			.style("margin-left", topLeft.x + "px")
		    			.style("margin-top", topLeft.y + "px");

				g = svg.append("g")
      				.attr("transform", "translate(" + (-topLeft.x) + "," + (-topLeft.y) + ")");

      			/* Updating Voronoi */
      			voronoi = d3.geom.voronoi()
							.x(function(d) { return map.latLngToLayerPoint(d.LatLng).x; })
							.y(function(d) { return map.latLngToLayerPoint(d.LatLng).y; });

				voronoi(collection).forEach(function(d) {
					d.point.cell = d;
				})

				/* Updating SVG points */
				svgPoints = g.attr("class", "points")
      						 .selectAll("g")
        					 .data(collection)
      						 .enter().append("g")
       						 .attr("class", "point");

       			buildPathFromPoint = function(point) {
    				return "M" + point.cell.join("L") + "Z";
    			}

    			/* Updates path */
				svgPoints.append("path")
      			.attr("class", "point-cell")
      			.attr("d", buildPathFromPoint)
      			.style("fill","none")
      			.style("fill","green")
      			.style("fill-opacity", function (d) {
      				if (!d[hr])
      					return 0;
      				else
      					return 0.5
      			})
      			.style("stroke","black")
      			.classed("selected", function(d) { return selectedCluster == d} )
      			.on("click", function(d) {
      				clusterNum.innerHTML = +d.cls;
      				if (!d[hr]) 
      					prob.innerHTML = "n/a";
      				else
      					prob.innerHTML = d[hr];
      				d3.selectAll('.selected').classed('selected', false);
    				var cell = d3.select(this),
    				selectedCluster = d.cls;
    				cell.classed('selected', true);
      			});

      			/* Updates points to denote centroid location */
    			svgPoints.append("circle")
    			  .attr("class","centroid")
    			  .attr("transform", function(d) { return "translate("+ 
								map.latLngToLayerPoint(d.LatLng).x +","+ 
								map.latLngToLayerPoint(d.LatLng).y +")";
							})
    	  		.style('fill', "teal" )
    	  		.attr("r", 1);
			}
		});	 
	}