import { Paper } from "@mui/material";
import ResponsiveAppBar from "../../molecules/Hedder/Hedder";
import { useState, useRef } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import "./Resultpage.css";

const ResultPage = () => {
  const [isEditable, setIsEditable] = useState(false);
  const textAreaRef = useRef(null);

  const EditForm = () => {
    setIsEditable((prev: boolean) => !prev);
  };

  const handleCopyClick = () => {
    const textArea = textAreaRef.current;
    textArea.select();
    document.execCommand("copy");
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
            placeholder=""
            required
            rows={10}
            value=""
            readOnly={!isEditable}
            onClick={EditForm}
          ></textarea>
        </div>
        <button onClick={handleCopyClick}>コピペ</button>
      </Paper>

      {/* 以下要件中質 */}
    </>
  );
};

export default ResultPage;
