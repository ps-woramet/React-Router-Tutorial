import { Link, Outlet } from "react-router-dom";

const ProductPage = () => {
    return (<>
    <div>
        <input type="search" placeholder="Search products"/>
    </div>
    <nav>
        <Link to='Featured'>Featured</Link>
        <Link to='new'>new</Link>
    </nav>
    {/* Outlet จะแสดงคอมโพเนนต์ที่เกี่ยวข้องกับเส้นทางนี้ */}
    <Outlet/>
    </>)
}
 
export default ProductPage;