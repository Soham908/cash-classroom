import { Typography } from "@mui/material";
import { useAuthStore } from "../store/store";

const Certificate = () => {

    const userAuthStateData = useAuthStore.getState().user

    console.log(userAuthStateData);
  return (
    <>
      <img src="/courseCompletionCertificate.png" height={600} />
      <Typography
        variant="h4"
        sx={{
          position: "absolute",
          bottom: "7%",
          left: "22%",
        }}
      >
        {userAuthStateData.data.name}
      </Typography>
      <Typography
        variant="h6"
        sx={{
          position: "absolute",
          bottom: "-5.5%",
          left: "12.5%",
        }}
      >
        Technical Analysis
      </Typography>
    </>
  );
};

export default Certificate