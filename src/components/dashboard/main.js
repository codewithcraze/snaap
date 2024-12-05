import { DashboardTitles } from "../../utils/tool";
import { useSelector } from "react-redux";
import AgentDashboard from "./agentDashboard";
import AdminDashboard from "../admin/dashboard";

const MainDashboard = () => {
    const users = useSelector((state) => state.users.data);

    return(
        <div className="mt-5 container">
            <DashboardTitles title={""} />
            {users?.role === "agent" ? <AgentDashboard /> : <AdminDashboard />}
        </div>
    )
}


export default MainDashboard;