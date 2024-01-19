import { useNavigate } from "react-router-dom";

const HomePage = () => {

    const navigate = useNavigate()

    return <>
    <div>Home Page</div>
    <button onClick={() => navigate('order-summary', {replace: true})}>Place Order</button>
    </>
}
 
export default HomePage;