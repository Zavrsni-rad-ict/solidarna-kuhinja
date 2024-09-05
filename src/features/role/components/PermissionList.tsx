import { InputGroup } from '@/components';
import { useCallback } from 'react';
import { ControllerObj, ControllerKey, Permissions } from '../types';
import { SingleRole } from '@/types';

export const PermissionList = ({ role }: { role: SingleRole | undefined }) => {
  const transformPermissions = useCallback(
    (permissions: Permissions): ControllerObj[] => {
      if (!permissions) return [];

      return Object.entries(permissions).flatMap(([_, value]) =>
        Object.entries(value.controllers).flatMap(
          ([controllerKey, controllerValue]) =>
            Object.entries(controllerValue).map(([actionKey, actionValue]) => ({
              controllerName: controllerKey as ControllerKey,
              actionName: actionKey,
              enabled: actionValue.enabled,
            })),
        ),
      );
    },
    [],
  );

  const transformedPermissions: ControllerObj[] = transformPermissions(
    role?.permissions,
  );

  const groupByControllerName: Record<PropertyKey, ControllerObj[]> =
    Object.groupBy(transformedPermissions, (item) => item.controllerName);

  return (
    <div className="col-span-12 flex flex-wrap flex-row gap-4">
      {Object.entries(groupByControllerName).map(([controllerName, values]) => {
        return (
          <div className="flex flex-col gap-2">
            <h1 className="uppercase h-max font-bold">{controllerName}</h1>
            <table className="border-separate border-spacing-x-1">
              {values.map((value) => (
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
  );
};
