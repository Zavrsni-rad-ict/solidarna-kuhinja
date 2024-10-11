import { Map } from '@/components';

import AsyncSearchBar from '@/components/AsyncSearchBar/AsyncSearchBar';
import { Coordinates } from '@/types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  location: Coordinates | null;
  setLocation: (location: Coordinates) => void;
  querySearch?: string;
};
export const MapView = ({ location, setLocation, querySearch }: Props) => {
  const [query, setQuery] = useState(querySearch);

  const { t } = useTranslation('CreateEventView');
  return (
    <>
      <div className="my-4 relative z-[1001]">
        <label>{t('mapLocation')}</label>
        <AsyncSearchBar
          setLocation={setLocation}
          setQuery={setQuery}
          query={query}
          shouldReturnOneLocation
        />
      </div>
      <Map location={location} />
    </>
  );
};

MapView.displayName = 'MapView';
