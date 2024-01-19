import {useParams} from 'react-router-dom'

const UserDetails = () => {
    const params = useParams()
    const userId = params.userId
    return <div>details about user {userId}</div>;
}
 
export default UserDetails;