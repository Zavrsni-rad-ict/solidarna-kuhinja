import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  useMap,
  Circle,
  useMapEvents,
} from 'react-leaflet';

import 'react-leaflet-fullscreen/styles.css';
import 'leaflet/dist/leaflet.css';

import { useEffect, useRef, useState } from 'react';
import { SetViewOnClick } from './SetViewOnClick';
import { BELGRADE_COORDINATES } from '@/constants';
import { Coordinates, EventLocation } from '@/types';
import { calculateMapCenter } from '@/utils/calculateMapCenter';
import { DraggableMarker } from './DraggableMarker';

type Props = {
  eventLocations?: EventLocation[];
  location?: Coordinates | null;
  setQuery: (query: string) => void;
  showDraggableMarker?: boolean;
};

// This Component will be used in Home tab
const CalculateMapCenter = ({
  eventLocations,
}: {
  eventLocations: EventLocation[] | undefined;
}) => {
  const map = useMap();

  useEffect(() => {
    if (eventLocations) {
      const mapCenter = calculateMapCenter(eventLocations);
      map.flyTo(mapCenter);
    }
  }, [eventLocations]);

  return null;
};

// This Component will be used after searching location and map view will show new location
const RecenterAutomatically = ({ lat, lng }: any) => {
  const map = useMap();
  useEffect(() => {
    if (!lat && !lng) return;

    map.setView([lat, lng]);
  }, [lat, lng]);
  return null;
};

// TODO Ideja je da se prati zoom level da bi prikazili ili krug iii pinove
function ZoomLevel() {
  const [zoomLevel, setZoomLevel] = useState(16); // initial zoom level provided for MapContainer

  const mapEvents = useMapEvents({
    zoomend: () => {
      setZoomLevel(mapEvents.getZoom());
    },
  });

  return null;
}

export const Map = ({
  eventLocations,
  location,
  setQuery,
  showDraggableMarker,
}: Props) => {
  const animateRef = useRef(true);

  return (
    <MapContainer
      center={BELGRADE_COORDINATES}
      zoom={16}
      className="min-h-[320px]"
      id="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {showDraggableMarker && (
        <>
          <RecenterAutomatically lat={location?.lat} lng={location?.lng} />
          <DraggableMarker
            lat={location?.lat}
            lng={location?.lng}
            setQuery={setQuery}
            center={BELGRADE_COORDINATES}
          />
        </>
      )}

      {animateRef && <SetViewOnClick animateRef={animateRef} />}

      {eventLocations && (
        <>
          <CalculateMapCenter eventLocations={eventLocations} />
          {eventLocations.map((location) => (
            <>
              <Marker
                position={[location.coordinates.lat, location.coordinates.lng]}
                key={location.name}
                eventHandlers={{
                  mouseover: (event) => event.target.openPopup(),
                }}
              >
                <Popup>{location.name}</Popup>
              </Marker>
              {/* <Circle
                center={{
                  lat: location.coordinates.lat,
                  lng: location.coordinates.lng,
                }}
                radius={15}
                fill
                fillOpacity={1}
              /> */}
            </>
          ))}
        </>
      )}
    </MapContainer>
  );
};

Map.displayName = 'Map';
