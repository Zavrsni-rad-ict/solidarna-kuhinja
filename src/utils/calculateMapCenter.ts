import { Coordinates, EventLocation } from '@/types';

export const calculateMapCenter = (
  eventLocations: EventLocation[],
): Coordinates => {
  const totalLocations = eventLocations.length;

  const sumCoordinates = eventLocations.reduce(
    (acc, location) => {
      acc.lat += location.coordinates.lat;
      acc.lng += location.coordinates.lng;
      return acc;
    },
    { lat: 0, lng: 0 },
  );

  return {
    lat: sumCoordinates.lat / totalLocations,
    lng: sumCoordinates.lng / totalLocations,
  };
};
