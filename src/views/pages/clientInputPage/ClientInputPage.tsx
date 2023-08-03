import { useDispatch } from 'react-redux';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { chat } from '../../../chatgpt';
import { setResponseText } from '../../../redux/slice/responseTextSlice';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Grid, Paper, Button } from '@mui/material';
import ResponsiveAppBar from '../../molecules/Hedder/Hedder';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import './clientInputPage.css';
import SelectTemplate from './SelectTempleteBar/SelectTemplate';
import axios from 'axios';
import { setResponseTemplate } from '../../../redux/slice/responseTemplateSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

const ClientInputPage = () => {
  const API_URL =
    'https://wadq9bmi23.execute-api.ap-northeast-1.amazonaws.com/dev/template/all';
  const defaultMessage =
    '以上の文章から、目的、期限、アプリ概要だけを抜き出して、JSON形式で出力してください。keyとvalueは文字列で出力してください。他の説明は必要ありません。項目がない場合は空欄で出力して下さい。';
  const [message, setMessage] = useState<string>('');
  const handleMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };
  const selectedTemplate = useSelector(
    (state: RootState) => state.selectedTemplate.value
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await axios.post(
      'https://wadq9bmi23.execute-api.ap-northeast-1.amazonaws.com/dev/project',
      {
        userId: 'test_nest',
        templateId: selectedTemplate.templateId,
      }
    );

    const responseText = await chat(message + defaultMessage);
    dispatch(setResponseText(responseText));
    console.log(selectedTemplate);
    navigate('/confirm');
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(API_URL);
        dispatch(setResponseTemplate(response.data));
        // console.log(response)
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  function getSteps() {
    return ['要件定義', '要件抽出', '結果'];
  }
  // activeStep:現在のステップ番号(このページでは要件抽出なので“1”)
  const activeStep = 0;
  const steps = getSteps();

  return (
    <div>
      <div>
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
        <h1 className='title'>要件定義入力画面</h1>
        <Box className='input-area' component='form' onSubmit={handleSubmit} marginRight={15} marginLeft={15}>
          {/* <Grid container spacing={3}>
            <Grid item xs={12} sm={8} md={6}> */}
              <Paper
                elevation={3}
                style={{ padding: '20px', textAlign: 'center' }}
              >
                <TextField
                  label='要件定義'
                  placeholder='要件定義を記入してください'
                  required
                  fullWidth
                  multiline
                  rows={5}
                  variant='outlined'
                  margin='dense'
                  value={message}
                  onChange={handleMessageChange}
                />
                <SelectTemplate />
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  style={{ marginTop: '10px' }}
                >
                  送信する
                </Button>
              </Paper>
            {/* </Grid>
          </Grid> */}
        </Box>
      </div>
    </div>
  );
};

export default ClientInputPage;
