import { Box, Paper, Snackbar, TextField } from "@mui/material";
import ResponsiveAppBar from "../molecules/Hedder/Hedder";
import { useState, ChangeEvent } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingButton from '@mui/lab/LoadingButton'
import { useSelector } from 'react-redux';
import { RootState } from "../../redux/store";
import { apiClient } from "../../libs/apiClient";

interface saveDto {
  projectId: string
  userId: string | null
  name: string
  text: string
}

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate()

  const projectId = useSelector(
    (state: RootState) => state.projectId.value
  );

  const [saveForm, setSaveForm] = useState<saveDto>({
    projectId: projectId,
    userId: localStorage.getItem("userId") ? localStorage.getItem("userId") : "",
    name: "",
    text: Object.entries(location.state?.result || {})
    .map(([key, value]) => `${key}:\n${value}`)
    .join("\n")
  })

  const [isLoad, setIsLoad] = useState<boolean>(false)
  const [isSnack, setIsSnack] = useState<boolean>(false)

  const copyTextToClipboard = () => {
    navigator.clipboard.writeText(saveForm.text)
    .then(function() {
      setIsSnack(true)
      console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
    });
  }
  

  const handleOnSubmit = async () => {
    try {
      setIsLoad(true)
      await apiClient.put('https://wadq9bmi23.execute-api.ap-northeast-1.amazonaws.com/dev/project', saveForm)      
      setIsLoad(false)
      navigate('/allProjects')
    } catch (error: any) {
      console.log(error)
    }
  }

  function getSteps() {
    return ["要件定義", "要件抽出", "結果"];
  }
  // activeStep:現在のステップ番号(このページでは要件抽出なので“1”)
  const activeStep = 2;
  const steps = getSteps();

  return (
    <>
      <ResponsiveAppBar />
      <div className="stepper">
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      <Paper elevation={5} sx={{ padding: 4, marginX: 24, marginY: 6 }}>
        <h1 className="h1">生成結果</h1>
        <hr />
        <div className="container">
          <TextField 
            placeholder="プロジェクト名" 
            required 
            fullWidth
            style={{ marginBottom: "10px", marginTop: '15px'}}
            value={saveForm.name} 
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSaveForm({...saveForm, name: e.target.value})}></TextField>
          <TextField
            placeholder=""
            required
            fullWidth
            multiline
            value={saveForm.text}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSaveForm({...saveForm, text: e.target.value})}
          ></TextField>
        </div>
        <Box display="flex" justifyContent="flex-end" marginTop={5}>
            <LoadingButton loading={isLoad} variant='contained' onClick={handleOnSubmit} style={{marginRight: "5px"}}>保存</LoadingButton>
            <Tooltip title="Copy to Clipboard" placement="top" arrow>
              <IconButton
                color="primary"
                size="small"
                onClick={() => copyTextToClipboard()}
              >
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
        </Box>
      </Paper>
      {
        isSnack ? (
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={isSnack}
            onClose={() => setIsSnack(false)}
            message="Copied Text!!"
            autoHideDuration={2000}
            key={"topright"}
          />
        ) : (
          <></>
        )
      }
    </>
  );
};
export default ResultPage;
