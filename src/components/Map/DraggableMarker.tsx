import { Coordinates } from '@/types';
import { useState, useMemo, useRef, useEffect } from 'react';
import { Marker, useMapEvents, useMap } from 'react-leaflet';

type Props = {
  lat: number;
  lng: number;
  setLocation: ((location: Coordinates) => void) | undefined;
  center: Coordinates;
};

export const DraggableMarker = ({ lat, lng, setLocation, center }: Props) => {
  const [position, setPosition] = useState(center);
  const markerRef = useRef<any>(null);
  const changePoisition = useMap();

  useEffect(() => {
    if (lat && lng) {
      setPosition({ lat, lng });
      changePoisition.setView([lat, lng]);
    }
  }, [lat, lng]);

  const map = useMapEvents({
    click(e) {
      setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
      setLocation && setLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  const eventHandlers = useMemo(
    () => ({
      dragend(e: any) {
        const marker = markerRef.current;
        if (marker != null) {
          setLocation &&
            setLocation({
              lat: e.target._latlng.lat,
              lng: e.target._latlng.lng,
            });
          setPosition(marker.getLatLng());
        }
      },
    }),
    [],
  );

  return (
    <Marker
      draggable
      eventHandlers={eventHandlers}
      position={position}
    ></Marker>
  );
};
