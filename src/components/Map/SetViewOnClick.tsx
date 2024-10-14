import { MutableRefObject } from 'react';
import { useMapEvent } from 'react-leaflet';

export const SetViewOnClick = ({
  animateRef,
}: {
  animateRef: MutableRefObject<boolean>;
}) => {
  const map = useMapEvent('click', (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: animateRef.current || false,
    });
  });

  return null;
};
