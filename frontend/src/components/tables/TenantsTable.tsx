import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useGetAllTenantsAndUsersQuery } from "../../redux/slices/appApis";

interface Tenant {
  _id: string;
  name: string;
  email: string;
  domain: string;
  industry: string;
  createdAt: string;
}

interface UsersAndTenantsResponse {
  tenants: Tenant[];
  users: any[];
}

export default function TenantsTable() {
  const { data, isLoading } = useGetAllTenantsAndUsersQuery() as {
    data?: UsersAndTenantsResponse;
    error?: unknown;
    isLoading: boolean;
  };

  const tenants = data?.tenants ?? [];

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Tenants
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
              <TableCell isHeader className="text-left py-3 text-theme-xs text-gray-500 dark:text-gray-400">
                Name
              </TableCell>
              <TableCell isHeader className="text-left py-3 text-theme-xs text-gray-500 dark:text-gray-400">
                Email
              </TableCell>
              <TableCell isHeader className="text-left py-3 text-theme-xs text-gray-500 dark:text-gray-400">
                Domain
              </TableCell>
              <TableCell isHeader className="text-left py-3 text-theme-xs text-gray-500 dark:text-gray-400">
                Industry
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
              tenants.length > 0 &&
              tenants.map((tenant) => (
                <TableRow key={tenant._id}>
                  <TableCell className="py-3 text-theme-sm text-gray-800 dark:text-white/90">
                    {tenant.name}
                  </TableCell>
                  <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                    {tenant.email}
                  </TableCell>
                  <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                    {tenant.domain}
                  </TableCell>
                  <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                    {tenant.industry}
                  </TableCell>
                  <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                    {new Date(tenant.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
