import ResponsiveAppBar from '../../molecules/Hedder/Hedder.tsx';
import Paper from '@mui/material/Paper';
import './ClientConfirmPage.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useEffect } from 'react';
import { useState, ChangeEvent } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
//import {useState} from "react";

const ClientConfirmPage = () => {
  //const [text,setText]=useState("");

  const responseText = useSelector(
    (state: RootState) => state.responseText.value
  );
  useEffect(() => {
    console.log(responseText);
  }, [responseText]);

  const jsonString = responseText;

  const [json, setJson] = useState<{ [key: string]: string }>(
    JSON.parse(jsonString)
  );
  const keys = Object.keys(json); // keys(目的、アプリ概要)

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>, key: string) => {
    const value = e.target.value;

    // Update the json object with the modified value for the corresponding key
    setJson((prevJson) => ({
      ...prevJson,
      [key]: value,
    }));

    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  function getSteps() {
    return ['要件定義', '要件抽出', '結果'];
  }
  // activeStep:現在のステップ番号(このページでは要件抽出なので“1”)
  const activeStep = 1;
  const steps = getSteps();

  // ChatGptから分割された値を入れる
  return (
    <>
      <ResponsiveAppBar />
      <div className='stepper'>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      <Paper elevation={5} sx={{ padding: 4, marginX: 24, marginY: 6 }}>
        <h1 className='h1-confirm'>要件抽出</h1>
        <hr />
        <div className='container'>
          {keys.map((key) => {
            return (
              <div>
                <h2 className='h2-confirm'>{key} </h2>
                <textarea
                  placeholder={`${key}が抽出されませんでした。`}
                  required
                  rows={1}
                  value={json[key]}
                  onChange={(e) => handleChange(e, key)}
                ></textarea>
              </div>
            );
          })}
        </div>
        <br />
        <button className='button-confirm'>出力</button>
      </Paper>
    </>
  );
};

export default ClientConfirmPage;
