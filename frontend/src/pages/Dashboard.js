import { useEffect, useState } from "react";
import { ProtectRoutes } from "../manageRoutes/protectRoutes";
import { createGoal, fetchGoalsById } from "./../actions/goalActions";
import { useAuthStore } from "../store/store";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";
import { Box } from "@mui/material";

const Dashboard = () => {
  const user = useAuthStore.getState().user;
  const [goalFormData, setGoalFormData] = useState({
    name: "",
    target: 0,
    currentAmount: 0,
  });
  const [refresh, setRefresh] = useState(false);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchGoals = async () => {
      const response = await fetchGoalsById(user?.data?._id);
      setGoals(response.goals);
    };
    fetchGoals();
  }, [refresh]);

  const handleGoalsFormChange = (e) => {
    setGoalFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleCreateGoal = async () => {
    const data = { ...goalFormData, userId: user?.data?._id };
    const response = await createGoal(data);
    if (response.success) {
      setRefresh((p) => !p);
    }
  };
  return (
    <ProtectRoutes>
      <div className="cards">
        <br />
        <input
          type="text"
          name="name"
          value={goalFormData.name}
          onChange={(e) => handleGoalsFormChange(e)}
        />
        <br />
        <input
          type="number"
          name="target"
          value={goalFormData.target}
          onChange={(e) => handleGoalsFormChange(e)}
        />
        <br />
        <input
          type="number"
          name="currentAmount"
          value={goalFormData.currentAmount}
          onChange={(e) => handleGoalsFormChange(e)}
        />
        <br />
        <button onClick={handleCreateGoal}>Create Goal</button>
        <br />
        {/* {JSON.stringify(goals)} */}
      </div>

	  <Box sx={{ width: 320, display: "flex" }}>
      {goals.map((goalData, index) => {

		return(
        <Card sx={{margin:2}}>
          <AspectRatio ratio={2}>
            <img
              src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
              srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
              loading="lazy"
              alt=""
            />
          </AspectRatio>
          <CardContent orientation="horizontal">
            <div>
              <Typography level="body-xs"> Target Savings </Typography>
              <Typography fontSize="lg" fontWeight="lg">
                {goalData?.target}
              </Typography>
            </div>
            <div>
              <Typography level="body-xs"> Target Savings </Typography>
              <Typography fontSize="lg" fontWeight="lg">
                {goalData?.currentAmount}
              </Typography>
            </div>
            <Button
              variant="solid"
              size="md"
              color="primary"
              aria-label="Explore Bahamas Islands"
              sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
            >
              Explore
            </Button>
          </CardContent>
        </Card>
		)
	})}
	</Box>
    </ProtectRoutes>
  );
};

export default Dashboard;
