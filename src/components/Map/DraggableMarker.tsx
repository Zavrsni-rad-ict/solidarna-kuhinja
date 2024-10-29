import { useEffect, useMemo, useRef, useState } from 'react';
import { Marker, useMap, useMapEvents } from 'react-leaflet';

interface Props {
  lat: number;
  lng: number;
  setLocation: (position: { lat: number; lng: number }) => void;
  center: { lat: number; lng: number };
}

export const DraggableMarker = ({ lat, lng, setLocation, center }: Props) => {
  const [position, setPosition] = useState(center);
  const markerRef = useRef<any>(null);
  const changePoisition = useMap();

  // Attach map click event to update marker position
  useMapEvents({
    click(e) {
      setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
      setLocation && setLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
      changePoisition.flyTo(e.latlng, changePoisition.getZoom());
    },
  });

  // Memoize event handlers for marker drag
  const eventHandlers = useMemo(
    () => ({
      dragend: (e: any) => {
        const marker = markerRef.current;
        if (marker) {
          const { lat, lng } = marker.getLatLng();
          setLocation && setLocation({ lat, lng });
          setPosition({ lat, lng });
        }
      },
    }),
    [setLocation],
  );

  useEffect(() => {
    if (lat && lng) {
      setPosition({ lat, lng });
      changePoisition.setView([lat, lng]);
    }
  }, [lat, lng]);

  return (
    <Marker
      draggable
      position={position}
      ref={markerRef}
      eventHandlers={eventHandlers}
    />
  );
};
