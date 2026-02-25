import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import type { HotelStepperProps } from '../type';

const steps = [
  '',
  '',
  '',
];

export default function HotelStepper({num}:HotelStepperProps) {
  return (
    <Box sx={{ width: '100%' , marginBlock:"50px"}}>
      <Stepper activeStep={num} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel></StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
