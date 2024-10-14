import { Map } from '@/components';

import AsyncSearchBar from '@/components/AsyncSearchBar/AsyncSearchBar';
import { Coordinates } from '@/types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  coordinates: Coordinates | null;
  setCoordinates: (location: Coordinates) => void;
  querySearch?: string;
};
export const MapView = ({
  coordinates,
  setCoordinates,
  querySearch,
}: Props) => {
  const [query, setQuery] = useState(querySearch);

  const { t } = useTranslation('CreateEventView');
  return (
    <>
      <div className="my-4 relative z-[1001]">
        <label>{t('mapLocation')}</label>
        <AsyncSearchBar
          setLocation={setCoordinates}
          setQuery={setQuery}
          query={query}
          shouldReturnOneLocation
        />
      </div>
      <Map setLocation={setCoordinates} location={coordinates} />
    </>
  );
};

MapView.displayName = 'MapView';
