import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useGetTenantUsersQuery } from "../../redux/slices/appApis";
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  authProvider: string;
  tenantId: string;
  createdAt: string;
}

export default function UsersTable() {
  const { data: users, isLoading } = useGetTenantUsersQuery() as {
    data?: User[];
    error?: unknown;
    isLoading: boolean;
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Users for Company
        </h3>
        <div className="flex items-center gap-3">
          <button className="...">Filter</button>
          <button className="...">See all</button>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell isHeader className=" text-left py-3 text-theme-xs text-gray-500 dark:text-gray-400">
                Name
              </TableCell>
              <TableCell isHeader className="text-left py-3 text-theme-xs text-gray-500 dark:text-gray-400">
                Email
              </TableCell>
              <TableCell isHeader className="text-left py-3 text-theme-xs text-gray-500 dark:text-gray-400">
                Role
              </TableCell>
              <TableCell isHeader className="text-left py-3 text-theme-xs text-gray-500 dark:text-gray-400">
                Auth Provider
              </TableCell>
              <TableCell isHeader className="text-left py-3 text-theme-xs text-gray-500 dark:text-gray-400">
                Created At
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {isLoading && (
              <TableRow>
                <TableCell className="py-3 text-center text-gray-500">
                  Loading...
                </TableCell>
              </TableRow>
            )}

            {!isLoading &&
              users?.length &&
              users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell className="py-3 text-theme-sm text-gray-800 dark:text-white/90">
                    {user.name}
                  </TableCell>
                  <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                    {user.email}
                  </TableCell>
                  <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                    {user.role}
                  </TableCell>
                  <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                    {user.authProvider}
                  </TableCell>
                  <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
