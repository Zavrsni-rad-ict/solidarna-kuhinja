export const Calendar = ({
  date,
  setDate,
}: {
  date: string;
  setDate: (d: string) => void;
}) => {
  const currentDate = new Date().toISOString().slice(0, 10);

  return (
    <input
      type="date"
      id={'datepicker'}
      className="block w-full shadow-sm rounded-md border-0 py-1.5 pl-3 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 cursor-pointer"
      placeholder={'Testr'}
      onKeyDown={(e) => e.preventDefault()}
      onKeyUp={(e) => e.preventDefault()}
      onChange={(e) => {
        setDate(e.currentTarget.value);
      }}
      min={currentDate}
    />
  );
};

Calendar.displayName = 'Calendar';
