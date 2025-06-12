import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import DefaultInputs from "../../components/form/form-elements/DefaultInputs";
import { useAppSelector } from "../../redux/hooks";

export default function Home() {
  const user = useAppSelector((state) => state.auth.user);
  console.log(user)

  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <DefaultInputs />
        </div>
      </div>
    </>
  );
}