import UsersTable from "../../components/tables/UsersTable";
import TenantsTable from "../../components/tables/TenantsTable";
import MyTasks from "../../components/tables/MyTasks";
import { useAppSelector } from "../../redux/hooks";

export default function Home() {
  const user = useAppSelector((state) => state.auth.user)
  console.log(user?.role)

  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6">

        <div className="col-span-12 xl:col-span-7">
          {user?.role === "SuperAdmin" && (
            <>
              <TenantsTable />
              <UsersTable />
            </>
          )}

          {user?.role === "Admin" && (
            <>
              <UsersTable />
            </>
          )}

          {user?.role === "User" && (
            <>
              <MyTasks />
            </>
          )}
        </div>
      </div>
    </>
  );
}