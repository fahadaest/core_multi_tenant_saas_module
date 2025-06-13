import UsersTable from "../../components/ecommerce/UsersTable";
import { useAppSelector } from "../../redux/hooks";

export default function Home() {
  const tenantDomain = useAppSelector((state) => state.auth.tenantDomain);
  console.log(tenantDomain)

  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6">

        <div className="col-span-12 xl:col-span-7">
          <UsersTable />
        </div>
      </div>
    </>
  );
}