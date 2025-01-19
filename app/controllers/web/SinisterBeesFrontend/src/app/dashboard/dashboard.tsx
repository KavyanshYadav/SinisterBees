import Navbar from '../../components/layouts/Navbar/Navbar';
import useUserStore from '../../state/user-store';

const Dashboard = () => {
  const user = useUserStore((state) => state.user);
  console.log(user)
  return (
    <div className='h-full flex w-full '>
      <Navbar/>
        {/* <Button icon={<LucideAArrowDown/>}>

        </Button> */}
        <div className=' w-full flex-col flex items-center'>
          <div>
            <h1 className='text-4xl font-bold'>
              Welcome , {user?.displayName}
            </h1>
          </div>
          <div className=' p-4  flex w-full h-full'>
              <div className='flex-[9] bg-red-500'>
                  main area , create  a router inside it 
              </div>
              <div className='flex-[4] bg-slate-50'>
                <h1 className='text-black'>Wiget Column ex:setting,user details, user steak, etc </h1>
              </div>
          </div>
        </div>
    </div>
  )
};

export default Dashboard;
