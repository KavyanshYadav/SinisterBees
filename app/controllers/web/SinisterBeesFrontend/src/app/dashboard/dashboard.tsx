import MainDashBoard from '../../components/layouts/maindashboardcolunm';
import Navbar from '../../components/layouts/Navbar/Navbar';
import UserWidget from '../../components/layouts/widget/UserWidget';
import useUserStore from '../../state/user-store';

const Dashboard = () => {
  const user = useUserStore((state) => state.user);
  console.log(user);
  return (
    <div className="h-full flex w-full ">
      <Navbar />
      {/* <Button icon={<LucideAArrowDown/>}>

        </Button> */}
      <div className=" w-full flex-col flex items-center">
        <div>
          <h1 className="text-4xl font-bold">Welcome , {user?.displayName}</h1>
        </div>
        <div className=" p-4  flex w-full h-full max-sm:flex-col">
          <div className="flex-[9] p-2  ">
            <MainDashBoard />
          </div>
          <div className="max-md:flex-[6]  flex-[4] p-2 ">
            <UserWidget />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
