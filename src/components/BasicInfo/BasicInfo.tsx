import { nullValueText } from '@/constants';
import { useUser } from '@/lib/auth';
import { Card, CardBody, DialogHeader } from '@material-tailwind/react';
import { useMemo } from 'react';
import { Spinner } from '../ui/spinner';
import moment from 'moment';

export const BasicInfo = () => {
  const { data: user, isLoading } = useUser();

  const latestEvent = useMemo(
    () =>
      user?.events.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      )[0].date,
    [user],
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="my-4">
      <DialogHeader>
        Dobrodosao nazad - hc {user?.firstName} {user?.lastName}
      </DialogHeader>

      <div className="grid gap-3 grid-cols-1 lg:grid-cols-3">
        <Card className="shadow-md">
          <CardBody className="flex flex-col gap-y-5">
            <small className="font-bold">
              Koliko si puta ucestvovao u akcijama - hc
            </small>
            <span className="text-4xl font-bold">
              {user?.participationCount ?? 0}
            </span>
          </CardBody>
        </Card>
        <Card className="shadow-md">
          <CardBody className="flex flex-col gap-y-5">
            <small className="font-bold">
              Poslednji put si ucestvovao u akcijama - hc
            </small>
            <span className="text-4xl font-bold">
              {user?.events?.length === 0
                ? nullValueText
                : moment(latestEvent).format('D.MM.YYYY')}
            </span>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

BasicInfo.displayName = 'BasicInfo';
