import { nullValueText } from '@/constants';
import { useUser } from '@/lib/auth';
import { Card, CardBody, DialogHeader } from '@material-tailwind/react';
import { useMemo } from 'react';
import { CenteredLoadingSpinner, Spinner } from '../ui/spinner';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

export const BasicInfo = () => {
  const { data: user, isLoading, isFetching } = useUser();

  const { t: tBI } = useTranslation('BasicInfo');

  const latestEvent = useMemo(
    () =>
      user?.events?.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      )[0]?.date,
    [user],
  );

  if (isLoading) {
    return <CenteredLoadingSpinner />;
  }

  return (
    <div className="my-4">
      <DialogHeader>
        {tBI('welcomeBack')} {user?.firstName} {user?.lastName}
      </DialogHeader>

      {user?.role?.type !== 'admin' && (
        <div className="grid gap-3 grid-cols-1 xl:grid-cols-3">
          <Card className="shadow-md md:h-32">
            <CardBody className="flex flex-col justify-between gap-y-5 h-full">
              <small className="font-bold">
                {tBI('participationInAction')}
              </small>
              <span className="text-4xl font-bold">
                {isFetching ? <Spinner /> : user?.events?.length ?? 0}
              </span>
            </CardBody>
          </Card>

          <Card className="shadow-md md:h-32">
            <CardBody className="flex flex-col justify-between gap-y-5 h-full">
              <small className="font-bold">{tBI('lastTimeParticipated')}</small>
              <span className="text-4xl font-bold">
                {isFetching ? (
                  <Spinner />
                ) : user?.events?.length === 0 ? (
                  nullValueText
                ) : (
                  moment(latestEvent).format('D.MM.YYYY')
                )}
              </span>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};

BasicInfo.displayName = 'BasicInfo';
