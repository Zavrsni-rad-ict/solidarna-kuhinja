import { RoleName } from '@/types';
import { UserRoleMap } from '../api';

type Props = {
  userGroups: UserRoleMap;
  setCheckedRole: (roleName: Lowercase<RoleName> | null) => void;
  checkedRole: Lowercase<RoleName> | null;
  totalUsers: number;
};

export const RoleRadioGroup = ({
  userGroups,
  checkedRole,
  setCheckedRole,
  totalUsers,
}: Props) => {
  return (
    <div className="flex gap-2 flex-col sm:flex-row md:items-start lg:items-center">
      <div
        className="flex gap-2 items-center"
        onClick={() => setCheckedRole(null)}
      >
        <input
          id="all"
          type="radio"
          name="default-radio"
          value="All"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          onChange={() => setCheckedRole(null)}
          defaultChecked
        />
        <label
          htmlFor="all"
          className="capitalize text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          All ({totalUsers})
        </label>
      </div>

      {Object.entries(userGroups).map(([roleName, userList]) => {
        return (
          <div
            onClick={() => {
              setCheckedRole(roleName as Lowercase<RoleName>);
            }}
            key={roleName}
            className="flex gap-2 cursor-pointer items-center"
          >
            <input
              id={roleName}
              type="radio"
              name="default-radio"
              checked={roleName === checkedRole}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
            />
            <label
              htmlFor={roleName}
              className="capitalize text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
            >
              {roleName} ({userList.length})
            </label>
          </div>
        );
      })}
    </div>
  );
};

RoleRadioGroup.displayName = 'RoleRadioGroup';
