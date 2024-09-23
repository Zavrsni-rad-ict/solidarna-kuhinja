import { Map } from '@/components';

import AsyncSearchBar from '@/components/AsyncSearchBar/AsyncSearchBar';
import { Coordinates } from '@/types';
import { useState } from 'react';

type Props = {
  location: Coordinates | null;
  setLocation: (location: Coordinates) => void;
};
export const MapView = ({ location, setLocation }: Props) => {
  const [query, setQuery] = useState('');

  return (
    <>
      <div className="my-4 relative z-[1001]">
        <label>Izaberi lokaciju na mapi</label>
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
