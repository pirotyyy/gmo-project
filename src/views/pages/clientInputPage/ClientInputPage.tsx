import { useDispatch } from 'react-redux';
import { useState, ChangeEvent, FormEvent } from 'react';
import { chat } from '../../../chatgpt';
import { setResponseText } from '../../../responseTextSlice';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Grid, Paper, Button } from '@mui/material';
import ResponsiveAppBar from '../../molecules/Hedder/Hedder';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import './clientInputPage.css';

const ClientInputPage = () => {
  const defaultMessage =
    '以上の文章から、目的、期限、アプリ概要だけを抜き出して、JSON形式で出力してください。keyとvalueは文字列で出力してください。他の説明は必要ありません。項目がない場合は空欄で出力して下さい。';
  const [message, setMessage] = useState<string>('');
  const handleMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const responseText = await chat(message + defaultMessage);
    dispatch(setResponseText(responseText));
    console.log(responseText);
    navigate('/confirm');
  };

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
        <Box
        className='input-area'
          component='form'
          onSubmit={handleSubmit}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={8} md={6}>
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
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  style={{ marginTop: '10px' }}
                >
                  送信する
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default ClientInputPage;
