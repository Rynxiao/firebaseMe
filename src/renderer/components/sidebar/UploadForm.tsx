/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Link from '@mui/material/Link';
import axios from 'axios';

export interface UploadFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Input = styled('input')({
  display: 'none',
});

const UploadForm = (props: UploadFormProps) => {
  const { open, setOpen } = props;

  const handleClick = () => {
    const accountFile = document.querySelector('#UploadButton') as any;

    if (accountFile) {
      accountFile.click();
    }
  };

  const handleUpload = async (event: any) => {
    const accountFile = event.target.files[0];

    // trigger onchange when choose same file
    event.target.value = '';

    if (accountFile) {
      const formData = new FormData();
      formData.append('account', accountFile);

      await axios({
        method: 'post',
        url: 'http://localhost:3000/api/upload',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>With Service Account Key</DialogTitle>
        <DialogContent>
          <Stepper orientation="vertical">
            <Step expanded>
              <StepLabel>Open Firebase Console</StepLabel>
              <StepContent>
                <Typography>
                  Sign in if prompted & choose your project
                </Typography>
              </StepContent>
            </Step>
            <Step expanded>
              <StepLabel>Download Key</StepLabel>
              <StepContent>
                <Typography>
                  Click the blue button to generate & download the service
                  account key file. You might need to create a service account
                  before
                </Typography>
              </StepContent>
            </Step>
            <Step expanded>
              <StepLabel>Import Key</StepLabel>
              <StepContent>
                <label htmlFor="UploadButton">
                  <Input
                    id="UploadButton"
                    multiple
                    type="file"
                    name="account"
                    onChange={handleUpload}
                  />
                  <Link
                    component="button"
                    variant="body2"
                    sx={{ mr: 1 }}
                    onClick={handleClick}
                  >
                    Upload
                  </Link>
                  the downloaded file into FirebaseMe
                </label>
              </StepContent>
            </Step>
          </Stepper>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UploadForm;
