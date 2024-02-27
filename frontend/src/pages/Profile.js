
import { ProtectRoutes } from "../manageRoutes/protectRoutes";
const Profile = () => {
    return (
        <ProtectRoutes>
            <h1>Profile</h1>
        </ProtectRoutes>
    )
}

export default Profile