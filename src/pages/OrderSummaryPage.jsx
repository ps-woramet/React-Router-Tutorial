import { useNavigate } from "react-router-dom";

const OrderSummaryPage = () => {
    const navigate = useNavigate()
    return <>
    <div>this is order summary page</div>
    <button onClick={() => navigate(-1)}>Go back</button>
    </>;
}
 
export default OrderSummaryPage;