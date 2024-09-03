import { Button, InputGroup, Table } from '@/components';

import { Spinner } from '@/components/ui/spinner';
import { FormProps, SingleRole } from '@/types';
import { groupItems } from '@/utils/groupItems';
import { useCallback, useMemo, useState } from 'react';

type Props = FormProps & {
  role?: SingleRole;
};

export const RoleForm = ({ status, role }: Props) => {
  const transformPermissions = useCallback((permissions) => {
    if (!permissions) return null;
    return Object.entries(permissions).flatMap(([key, value]) =>
      Object.entries(value.controllers).flatMap(
        ([controllerKey, controllerValue]) =>
          Object.entries(controllerValue).map(([actionKey, actionValue]) => ({
            controllerName: controllerKey,
            actionName: actionKey,
            enabled: actionValue.enabled,
          })),
      ),
    );
  }, []);

  const a = transformPermissions(role?.permissions);

  const b = groupItems(a ?? []);

  // const [permissions, setPermissions] = useState(a);

  return (
    <div className="flex flex-wrap gap-4">
      <div className="max-w-[820px] w-full grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="col-span-12">
          <InputGroup name="name" placeholder="Role Name" label="Role name" />
        </div>
        <div className="col-span-12 flex flex-wrap flex-row gap-4">
          {Object.entries(b).map(([controllerName, values]) => {
            return (
              <div className="flex flex-col gap-2">
                <h1 className="uppercase h-max font-bold">{controllerName}</h1>
                <table className="border-separate border-spacing-x-1">
                  {values?.map((value) => (
                    <tr>
                      <td>
                        <label>{value.actionName} </label>
                      </td>
                      <td>
                        <InputGroup
                          name={value.actionName}
                          type="checkbox"
                          checked={value.enabled}
                        />
                      </td>
                    </tr>
                  ))}
                </table>
              </div>
            );
          })}
        </div>

        <div className="col-start-1 mt-4">
          <Button
            type="submit"
            variant="primary"
            disabled={status === 'pending'}
          >
            {status === 'pending' ? (
              <Spinner variant="light" size="md" />
            ) : role ? (
              'Update'
            ) : (
              'Submit'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

RoleForm.displayName = 'RoleForm';
