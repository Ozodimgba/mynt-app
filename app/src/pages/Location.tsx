import { useState, useEffect } from 'react';

interface Location {
    latitude: number;
    longitude: number;
  }

function HomePage() {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);

  useEffect(() => {
   // initializeMap(); 
    trackLocation();
  }, []);

  // ... Google Maps initialization (initializeMap)

  function trackLocation() {
    // ... Use browser's Geolocation API or suitable library
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        setCurrentLocation({ 
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      });
    }
  }

  useEffect(() => {
    // if (currentLocation) {
    //   fetch('/api/locationUpdate', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(currentLocation)
    //   }); 
    // }
  }, [currentLocation]);
  
  console.log(currentLocation)
  // ... Render map, handle geofence events 
  return (<main></main>);
}

export default HomePage;





