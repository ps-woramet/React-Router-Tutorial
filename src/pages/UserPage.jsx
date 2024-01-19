import { Outlet, useSearchParams } from "react-router-dom";

const UserPage = () => {
    // hook สำหรับ params ใน url
    const [searchParams, setSearchParams] = useSearchParams()
    
    // check condition ของ searchParams
    const showActiveUsers = searchParams.get('filter') === 'active'

    return (<div>
        this is userPage show user1, user2, user3
        <Outlet/>
        {/* set parameter */}
        <div>
            <button onClick={() => setSearchParams({filter: 'active'})}>Active User</button>
            <button onClick={() => setSearchParams({})}>Reset User</button>
        </div>
        {showActiveUsers ?(<h2>Showing active users</h2>):(<h2>Showing all users</h2>)}
        </div>);
}
 
export default UserPage;
