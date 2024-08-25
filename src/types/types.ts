export type FormProps = {
  status: 'error' | 'idle' | 'pending' | 'success';
};

export type EventLocation = {
  name: string;
  coordinates: Coordinates;
};

export type Coordinates = {
  lat: number;
  lng: number;
};
