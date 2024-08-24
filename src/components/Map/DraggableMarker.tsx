import { useState, useMemo, useRef, useEffect } from 'react';
import { Marker, useMapEvents, useMap } from 'react-leaflet';

type Props = any;

export const DraggableMarker = ({ lat, lng, setQuery, center }: Props) => {
  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);
  const changePoisition = useMap();

  // console.log('lat', lat);
  // console.log('long', lng);

  useEffect(() => {
    if (lat && lng) {
      setPosition({ lat, lng });
      changePoisition.setView([lat, lng]);
    }
  }, [lat, lng]);

  const map = useMapEvents({
    click(e) {
      // console.log('eeeeeeeeeeee', e.latlng);
      setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
      setQuery({ lat: e.latlng.lat, lng: e.latlng.lng });

      map.flyTo(e.latlng, map.getZoom());
    },
  });

  const eventHandlers = useMemo(
    () => ({
      dragend(e) {
        const marker = markerRef.current;
        if (marker != null) {
          setQuery({ lat: e.target._latlng.lat, lng: e.target._latlng.lng });
          setPosition(marker.getLatLng());
        }
      },
    }),
    [],
  );

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    ></Marker>
  );
};
