import React, { useState } from "react";
import { Button, Popper, Paper, Typography, Box, IconButton } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import screenshotImage from "./ui_screenshot.png";

const UI_Explanation = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentButtonId, setCurrentButtonId] = useState(0);
  const [open, setOpen] = useState(false);
  const [contentStep, setContentStep] = useState()

  const handleNext = () => {
    if (currentButtonId < 4) {
      setCurrentButtonId(currentButtonId + 1);
      setContentStep(currentButtonId + 1)
      setAnchorEl(document.getElementById(`button-${currentButtonId + 1}`));
      setOpen(true);
    }
  };

  const content = [
    {
      "id": 1,
      "explanation": "The watchlist allows you to monitor a customized list of stocks or securities."
    },
    {
      "id": 2,
      "explanation": "In the watchlist, you can view the prices and percentage changes of stocks and indices."
    },
    {
      "id": 3,
      "explanation": "The chart view provides a graphical representation of the price movement."
    },
    {
      "id": 4,
      "explanation": "The timeframe option allows you to choose the time duration for which you want to view the price data, such as 1 day, 5 days, or 1 month."
    }
  ]
  

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ position: 'relative', maxWidth: '100%', maxHeight: '100%', overflow: 'auto' }}>
      <img
        src={screenshotImage}
        alt="Screenshot of Zerodha UI"
        style={{ maxWidth: '80%', maxHeight: '80%', display: 'block', margin: 'auto', padding: 20 }}
      />
      <IconButton id="button-1" sx={{ position: 'absolute', bottom: '10%', left: '12.5%', color:'white' }} onClick={(event) => { setAnchorEl(event.currentTarget); setCurrentButtonId(1); setOpen(true); }}>
        <InfoIcon />
      </IconButton>
      <IconButton id="button-2" sx={{ position: 'absolute', top: '20%', left: '21%', color:'white' }} onClick={(event) => { setAnchorEl(event.currentTarget); setCurrentButtonId(2); setOpen(true); }}>
        <InfoIcon />
      </IconButton>
      <IconButton id="button-3" sx={{ position: 'absolute', top: '20%', left: '55%', color:'white' }} onClick={(event) => { setAnchorEl(event.currentTarget); setCurrentButtonId(3); setOpen(true); }}>
        <InfoIcon />
      </IconButton>
      <IconButton id="button-4" sx={{ position: 'absolute', bottom: '10%', right: '25%', color:'white' }} onClick={(event) => { setAnchorEl(event.currentTarget); setCurrentButtonId(4); setOpen(true); }}>
        <InfoIcon />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="right"
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 10],
            },
          },
        ]}
      >
        <Paper elevation={3} sx={{ p: 2, position: 'relative' }}>
          <IconButton onClick={handleClose} style={{ position: 'absolute', top: '8px', right: '8px' }} size="small">
            <CloseIcon />
          </IconButton>
          <Typography variant="subtitle1" style={{ marginTop: '36px' }}>
            {content[currentButtonId-1].explanation}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 1 }}>
            <Button onClick={handleNext} disabled={currentButtonId === 4}>Next</Button>
          </Box>
        </Paper>
      </Popper>
    </div>
  );
};

export default UI_Explanation;
