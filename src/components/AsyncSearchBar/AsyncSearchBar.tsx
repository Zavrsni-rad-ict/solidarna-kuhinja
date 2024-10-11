import axios from 'axios';
import { AsyncPaginate } from 'react-select-async-paginate';
import makeAnimated from 'react-select/animated';

type Props = any;

const AsyncSearchBar = ({
  setLocation,
  setQuery,
  shouldReturnOneLocation,
  query,
}: Props) => {
  const animatedComponents = makeAnimated();

  const filterLocations = async (input: string) => {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search.php?q=${input}&polygon_geojson=1&format=jsonv2`,
    );

    return { options: response.data };
  };

  return (
    <AsyncPaginate
      loadOptions={filterLocations}
      components={animatedComponents}
      debounceTimeout={800}
      getOptionLabel={(e) => e.display_name}
      getOptionValue={(e) => e.display_name}
      onInputChange={(value) => setQuery(value)}
      defaultInputValue={query}
      onChange={(value) => {
        console.log('Klik');
        if (shouldReturnOneLocation) {
          return setLocation(() => ({
            lat: Number(value.lat),
            lng: Number(value.lon),
          }));
        }

        setLocation((prevState) => [
          ...prevState,
          { lat: Number(value.lat), lng: Number(value.lon) },
        ]);
      }}
    />
  );
};

export default AsyncSearchBar;
