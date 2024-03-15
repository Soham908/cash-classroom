import { useEffect, useState } from "react";
import { ProtectRoutes } from "../manageRoutes/protectRoutes";
import { createGoal, fetchGoalsById, updateGoal } from "../actions/goalActions";
import { useAuthStore } from "../store/store";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import { CardActions, Grid, Input, LinearProgress, Snackbar } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import { Box, TextField } from "@mui/material";

const FinanceGoals = () => {
  const user = useAuthStore.getState().user;
  const [goalFormData, setGoalFormData] = useState({
    name: "",
    target: null,
    currentAmount: null,
  });
  const [refresh, setRefresh] = useState(false);
  const [goals, setGoals] = useState([]);
  const [amountUpdate, setAmountUpdate] = useState(null);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [goalCompleted, setGoalCompleted] = useState(false)

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

  const handleSavedValue = async (data) => {
    const check = checkGoalCompleted({
      goalTarget: data.goalTarget,
      goalCurrentAmt: data.goalCurrentAmt,
    });
    if (!check) {
      var sendData = { id: data.id, updatedAmount: 0 };
      if (
        parseInt(data.goalCurrentAmt) + parseInt(data.updateAmount) >=
        data.goalTarget
      ) {
        sendData.updatedAmount = data.goalTarget;
      } else {
        sendData.updatedAmount =
          parseInt(data.goalCurrentAmt) + parseInt(data.updateAmount);
        console.log(sendData.updatedAmount);
      }
      const response = await updateGoal({
        id: sendData.id,
        updatedAmount: sendData.updatedAmount,
      });
      console.log(response);
      setRefresh((prev) => !prev);
    }
  };

  const checkGoalCompleted = ({ goalTarget, goalCurrentAmt }) => {
    if (goalTarget === goalCurrentAmt) {
      console.log("goal complete");
      setSnackBarOpen(true);
      setGoalCompleted(true)
      return true;
    }
  };

  return (
    <ProtectRoutes>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={goalFormData.name}
            onChange={(e) => handleGoalsFormChange(e)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Target"
            name="target"
            type="number"
            value={goalFormData.target}
            onChange={(e) => handleGoalsFormChange(e)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Current Amount"
            name="currentAmount"
            type="number"
            value={goalFormData.currentAmount}
            onChange={(e) => handleGoalsFormChange(e)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="solid" color="primary" onClick={handleCreateGoal}>
            Create Goal
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {/* {goals.map((goalData, index) => {
          return (
            <Card sx={{ margin: 2 }}>
              <AspectRatio ratio={2}>
                <img
                  src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
                  srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
                  loading="lazy"
                  alt=""
                />
              </AspectRatio>
              <CardContent>
                <div>
                  <Typography level="body-xs"> Target Savings </Typography>
                  <Typography fontSize="lg" fontWeight="lg">
                    {goalData?.target}
                  </Typography>
                </div>
                <div>
                  <Typography level="body-xs"> Current Amount </Typography>
                  <Typography fontSize="lg" fontWeight="lg">
                    {goalData?.currentAmount}
                  </Typography>
                </div>
                <LinearProgress
                  determinate
                  variant="outlined"
                  size="sm"
                  thickness={24}
                  value={Number(
                    (goalData.currentAmount / goalData.target) * 100
                  )}
                  sx={{
                    "--LinearProgress-radius": "20px",
                    "--LinearProgress-thickness": "24px",
                  }}
                >
                  <Typography
                    level="body-xs"
                    fontWeight="xl"
                    textColor="common.white"
                    sx={{ mixBlendMode: "difference", textAlign: "start" }}
                  >
                    {`${goalData.currentAmount} / ${goalData.target}`}
                  </Typography>
                </LinearProgress>
              </CardContent>
              <CardActions>
                <Input
                  placeholder="Enter your Saved Amount"
                  type="Number"
                  onChange={(e) => setAmountUpdate(e.target.value)}
                  value={amountUpdate}
                  endDecorator={
                    <Button
                      variant="soft"
                      size="sm"
                      onClick={() =>
                        handleSavedValue({
                          id: goalData._id,
                          updateAmount: amountUpdate,
                          goalTarget: goalData.target,
                          goalCurrentAmt: goalData.currentAmount,
                        })
                      }
                      disabled={goalCompleted}
                    >
                      Add to Saved value
                    </Button>
                  }
                />
              </CardActions>
            </Card>
          );
        })} */}
        {goals.map((goalData, index) => (
        <GoalComponent
          key={index}
          goalData={goalData}
          handleSavedValue={handleSavedValue}
        />
      ))}
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackBarOpen}
        autoHideDuration={1500}
        onClose={() => setSnackBarOpen(false)}
      >
        Goals is completed
      </Snackbar>
    </ProtectRoutes>
  );
};

export default FinanceGoals;
