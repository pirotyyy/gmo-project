import { useDispatch } from 'react-redux';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { chat } from '../../../chatgpt';
import { setResponseText } from '../../../redux/slice/responseTextSlice';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Paper } from '@mui/material';
import ResponsiveAppBar from '../../molecules/Hedder/Hedder';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import './clientInputPage.css';
import SelectTemplate from './SelectTempleteBar/SelectTemplate';
import { setResponseTemplate } from '../../../redux/slice/responseTemplateSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import LoadingButton from '@mui/lab/LoadingButton';
import { setProjectId } from '../../../redux/slice/projectIdSlice';
import { setClientMessage } from '../../../redux/slice/clientMessageSlice';
import { apiClient } from '../../../libs/apiClient';

const ClientInputPage = () => {
  const API_URL =
    'https://wadq9bmi23.execute-api.ap-northeast-1.amazonaws.com/dev/template/all';

  const selectedTemplate = useSelector(
    (state: RootState) => state.selectedTemplate.value
  );

  const userInfo = useSelector((state: RootState) => state.userInfo.value);

  const defaultMessage = selectedTemplate
    ? `以上の文章から、${selectedTemplate.format} だけを抜き出して、JSON形式で出力してください。keyとvalueは文字列で出力してください。抜き出せないときは“”で出力してください。`
    : '';


  const [message, setMessage] = useState<string>('');
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const handleMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoad(true);
    const res = await apiClient.post(
      'https://wadq9bmi23.execute-api.ap-northeast-1.amazonaws.com/dev/project',
      {
        // userId: localStorage.getItem('userId'),
        userId: userInfo.userId,
        templateId: selectedTemplate.templateId,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
    );

    dispatch(setProjectId(res.data.projectId));

    const clientMessage = message + defaultMessage;
    dispatch(setClientMessage(clientMessage));

    const responseText = await chat(clientMessage);
    dispatch(setResponseText(responseText));
    console.log(selectedTemplate);
    navigate('/confirm');
    setIsLoad(false);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await apiClient.get(API_URL, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        dispatch(setResponseTemplate(response.data));
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
        <Box
          className='input-area'
          component='form'
          onSubmit={handleSubmit}
          marginRight={15}
          marginLeft={15}
        >
          <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
            <TextField
              label='要件定義'
              placeholder='要件定義を記入してください'
              required
              fullWidth
              multiline
              rows={8}
              variant='outlined'
              margin='dense'
              value={message}
              onChange={handleMessageChange}
              style={{ marginBottom: '20px' }}
            />
            <SelectTemplate />
            <TextField
              label='項目一覧'
              disabled
              fullWidth
              multiline
              rows={1}
              variant='outlined'
              margin='dense'
              value={selectedTemplate ? selectedTemplate.format : ''}
              style={{ marginBottom: '20px' }}
              sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "#000000",
                },
              }}
            />
            <LoadingButton
              loading={isLoad}
              variant='contained'
              type='submit'
              color='primary'
              style={{ marginTop: '10px' }}
            >
              送信する
            </LoadingButton>
          </Paper>
        </Box>
      </div>
    </div>
  );
};

export default ClientInputPage;
