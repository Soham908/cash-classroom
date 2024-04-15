import React, { useState } from "react";
import {
  Button,
  Popper,
  Paper,
  Typography,
  Box,
  IconButton,
  Select,
  MenuItem,
  Tooltip,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import contentJson from "./ui_content_data.json";

const UI_Explanation = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentButtonId, setCurrentButtonId] = useState(0);
  const [open, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("ui-exp-dashboard.png");
  const [contentStep, setContentStep] = useState();
  const [currentUI, setCurrentUI] = useState(
    contentJson.Dashboard.buttonDetails
  );

  const handleChangePopperPosition = (changeValue) => {
      setCurrentButtonId(currentButtonId + changeValue);
      setContentStep(currentButtonId + changeValue);
      setAnchorEl(document.getElementById(`button-${currentButtonId + changeValue}`));
      setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const uiOptions = ["Dashboard", "Buy Shares", "OrderBook"];
  const [selectedUIExplain, setSeletedUIExplain] = useState("Dashboard");

  return (
    <>
      <div>
        <label htmlFor="combo-box-demo">Select UI to explain : </label>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedUIExplain}
          onChange={(e) => {
            setSeletedUIExplain(e.target.value);
            setCurrentUI(contentJson[e.target.value].buttonDetails);
            setCurrentImage(contentJson[e.target.value].image);
            console.log(contentJson[e.target.value]);
          }}
          sx={{ width: "350px" }}
        >
          {uiOptions.map((el) => (
            <MenuItem value={el}>{el}</MenuItem>
          ))}
        </Select>
      </div>
      <div
        style={{
          position: "relative",
          maxWidth: "80%",
          maxHeight: "80%",
          overflow: "auto",
        }}
      >
        <img
          src={currentImage}
          alt="Screenshot of Zerodha UI"
          style={{
            maxWidth: "90%",
            maxHeight: "80%",
            display: "block",
            margin: "auto",
            padding: 20,
          }}
        />

        {currentUI?.map((value, index) => (
          <Tooltip title={value.title} arrow>
            <IconButton
              key={`button-${index + 1}`}
              id={`button-${index + 1}`}
              sx={value?.buttonPosition}
              onClick={(event) => {
                setAnchorEl(event.currentTarget);
                setCurrentButtonId(index + 1);
                setOpen(true);
              }}
            >
              <InfoIcon />
            </IconButton>
          </Tooltip>
        ))}
        {/* <IconButton
          sx={
            { position: 'absolute', top: '20%', right: '23%', color:'blue' } 

          }
          onClick={(event) => {
            setAnchorEl(event.currentTarget);
            setCurrentButtonId(4);
            setOpen(true);
          }}
        >
          <InfoIcon />
        </IconButton> */}

        <Popper
          open={open}
          anchorEl={anchorEl}
          placement="right"
          modifiers={[
            {
              name: "offset",
              options: {
                offset: [0, 10],
              },
            },
          ]}
        >
          <Paper
            elevation={3}
            sx={{
              p: 2,
              position: "relative",
              width: "270px",
              maxHeight: "350px",
              overflowY: "auto",
            }}
          >
            <IconButton
              onClick={handleClose}
              style={{ position: "absolute", top: "8px", right: "8px" }}
              size="small"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h5" > { currentUI[currentButtonId - 1]?.title } </Typography>
            <Typography variant="subtitle1" style={{ marginTop: "16px" }}>
              {currentUI[currentButtonId - 1]?.explanation}
            </Typography>
            <Box
              sx={{ display: "flex", justifyContent: "flex-end", marginTop: 1 }}
            >
              <Button onClick={() => handleChangePopperPosition(-1)} disabled={currentButtonId === 1}>
                Previous
              </Button>
              <Button onClick={() => handleChangePopperPosition(1)} disabled={currentButtonId === currentUI.length}>
                Next
              </Button>
            </Box>
          </Paper>
        </Popper>
      </div>
      <Button onClick={() => {}}>Take a guide tour</Button>
    </>
  );
};

export default UI_Explanation;
