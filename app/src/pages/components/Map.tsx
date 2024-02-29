import React, { useEffect, useRef } from "react";
import mapboxgl, { GeoJSONSourceRaw } from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'

interface MovingObject {
  path: { type: string; geometry: { type: string; coordinates: number[]; }; properties: { name: string; }; }[];
  id: number;
  name: string;
  coordinates: number[];
}

const MapComponent: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);

  const movingObjects: MovingObject[] = [
    // Define your moving objects here
  ];

  useEffect(() => {
    mapboxgl.accessToken = "pk.eyJ1IjoidGhlY2FwaXRhbGlzdCIsImEiOiJjbHQ0NHRwcjIwYmlyMmlwc2dsMjB5aTd6In0.BBj48kQk3BBPRwfuIaajRA";

    if (mapContainer.current) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [6.5273856, 3.3325056],
        zoom: 5,
        maxZoom: 15,
      });

      // Add zoom controls
      map.addControl(new mapboxgl.NavigationControl(), "top-left");

      const Draw = new MapboxDraw({
        keybindings: true,
        controls: {
          polygon: true
        },
        modes: {
          draw_polygon: MapboxDraw.modes.draw_polygon
        }
      });
      console.log(Draw)
      // map.addControl(Draw, 'top-left');

      // Add your custom markers and lines here
      movingObjects.forEach((object) => {
        // Add object point source and layer
        map.addSource(`object-source-${object.id}`, {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
        });
      
        map.addLayer({
          id: `object-layer-${object.id}`,
          type: "symbol",
          source: `object-source-${object.id}`,
          layout: {
            "icon-image": "custom-marker",
            "icon-size": 0.09,
            "icon-allow-overlap": true,
          },
        });
      
        // Add object line source and layer
        map.addSource(`object-line-source-${object.id}`, {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
        });
      
        map.addLayer({
          id: `object-line-layer-${object.id}`,
          type: "line",
          source: `object-line-source-${object.id}`,
          paint: {
            "line-color": "#00ff00", // Change line color to green
            "line-width": 2,
          },
        });
      
        // Initialize object path
        object.path = [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: object.coordinates,
            },
            properties: {
              name: object.name,
            },
          },
        ];
      });

      map.on('draw.create', (event) => {
        const geofencePolygon = event.features[0]; // Get the drawn geofence
     
        // Process the geofence here (e.g., store, check against moving objects)
     });
      // Clean up on unmount
      return () => map.remove();
    }
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{ position: "absolute", top: 0, bottom: 0, width: "100%" }}
    />
  );
};

export default MapComponent;


//mapboxAccessToken=''