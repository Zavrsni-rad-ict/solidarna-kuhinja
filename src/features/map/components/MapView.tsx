import { Map } from '@/components';

import AsyncSearchBar from '@/components/AsyncSearchBar/AsyncSearchBar';
import { Coordinates } from '@/types';
import { useState } from 'react';

export const MapView = () => {
  const [_, setLocation] = useState<never[] | Coordinates[]>([]);
  const [query, setQuery] = useState('');

  return (
    <>
      <div className="my-4 relative z-[1001]">
        <AsyncSearchBar
          setLocation={setLocation}
          setQuery={setQuery}
          query={query}
        />
      </div>
      <Map />
    </>
  );
};

MapView.displayName = 'MapView';
