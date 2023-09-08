import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StepIcon from "@mui/material/StepIcon";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircleIcon from "@mui/icons-material/CheckCircle";
import { forwardRef, useImperativeHandle } from 'react';
const steps = [
  "ADD ORDER BASKET",
  "ORDER DETAILS",
  "DELIVERY DETAILS",
  "SUMMARY",
];

 export const HorizontalLinearStepper=React.forwardRef((props,ref)=> {
  const currentStep=localStorage.getItem("currentStep")
  const [activeStep, setActiveStep] = React.useState(currentStep>0?currentStep:0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  useImperativeHandle(ref, () => ({
    handleNext() {
      handleNext()
    }
  }))

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => {
      const newActiveStep = Number(prevActiveStep) + 1;
      localStorage.setItem("currentStep", newActiveStep);
  
      return newActiveStep;
    });
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  console.log('activeStepp',activeStep);

  return (
    <Box sx={{ width: "100%" }} className="mt-7">
      <Stepper
        activeStep={activeStep}
        
      >
        {Object.keys(steps).map((stepNumber) => {
          console.log("stepNumber", steps[stepNumber]);
          return (
            <Step
              key={stepNumber}
              sx={{
                "& .MuiStepLabel-root .Mui-completed": {
                  color: "green",
                },
                "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                  {
                    color: "grey.500",
                  },
                "& .MuiStepLabel-root .Mui-active": {
                  color: "#5E88AC",
                },
                "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                  {
                    color: "common.white",
                  },
                "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                  fill: "black",
                },
              }}
            >
              <StepLabel
                icon={
                  activeStep === stepNumber ? (
                    <CheckCircleIcon color="primary" />
                  ) : (
                    ""
                  )
                }
              >
                <p className="font-semibold">{steps[stepNumber]}</p>
              </StepLabel>
            </Step>
          );
        })}
        <p onClick={handleBack}>Previous</p>
        <p onClick={handleNext}>Next</p>
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </Box>
  );
})

export default HorizontalLinearStepper
