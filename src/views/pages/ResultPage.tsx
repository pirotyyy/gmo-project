import { Button, Paper } from "@mui/material";
import ResponsiveAppBar from "../molecules/Hedder/Hedder";
import { useState, useRef } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useLocation } from "react-router-dom";

const ResultPage = () => {
  const location = useLocation();

  const [isEditable, setIsEditable] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState(
    Object.entries(location.state?.result || {})
      .map(([key, value]) => `${key}:${value}`)
      .join("\n")
  );

  const textAreaRef = useRef(null);
  // const [resultText, setResultText] = useState();

  // コピペの機能

  const copyToClipboard = () => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.select();
      document.execCommand("copy");
    }
  };

  const handleTextAreaChange = (e) => {
    setTextAreaValue(e.target.value);
  };

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
          <textarea
            ref={textAreaRef}
            placeholder=""
            required
            rows={10}
            value={textAreaValue}
            readOnly={!isEditable}
            onChange={isEditable ? handleTextAreaChange : null}
          ></textarea>
        </div>
        <Button>保存</Button>
        {/* <Button variant="contained" color="primary" onClick={EditForm}>
          {isEditable ? "編集終了" : "編集する"}
        </Button> */}
        <Tooltip title="Copy to Clipboard" placement="top" arrow>
          <IconButton
            color="primary"
            size="small"
            onClick={() => copyToClipboard()}
          >
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Paper>
    </>
  );
};
export default ResultPage;
