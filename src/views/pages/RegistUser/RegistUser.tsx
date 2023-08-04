import LoginHedder from '../../molecules/LoginHedder/LoginHedder.tsx';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';

import { RootState } from '../../../redux/store';
import { useEffect } from "react";
import "./RegistUser.css"
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Snackbar, Box, TextField, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent, Grid, Link } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { apiClient } from '../../../libs/apiClient.ts';

interface RegistForm {
  userId: string
  name:string
  isAdmin: boolean
  password: string
}

const RegistUser = () => {
  // const label = { inputProps: { 'aria-label': 'Switch demo' } };

  const [registForm, setRegistForm] = useState<RegistForm>({
    userId: "",
    name: "",
    isAdmin: false,
    password: "",
  })
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [open, setOpen] = useState<boolean>(false)
  // const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [office, setOffice] = useState("")
  const [pass, setPass] = useState<string>("");

  const navigate = useNavigate()

  const responseText = useSelector((state: RootState) => state.responseText.value);
  useEffect(() => {
    setRegistForm({
      ...registForm, isAdmin: office === 'engineer' ? true : false
    })
    console.log(registForm)
    console.log(responseText);
  }, [responseText, office]);

  const handleSelectChange = (e: SelectChangeEvent) => {
    setOffice(e.target.value)
    setRegistForm({
    ...registForm,
    isAdmin: e.target.value === "engineer" ? true : false,
    })
  };

  const handleReInputPass = (event:any)=>{
    setPass(event.target.value)
  }

  const handleSubmit = async () => {
    setIsLoad(true)
    if(pass!=registForm.password){
      setError("パスワードが一致しません");
      setOpen(true);
      setIsLoad(false)
      return;
    }
    console.log(registForm)
    try {
      await apiClient.post(
        "https://wadq9bmi23.execute-api.ap-northeast-1.amazonaws.com/dev/user",
        registForm
      )
      navigate('/')
      setIsLoad(false)
    } catch (error: any) {
      setError(error.response.data.message)
      setOpen(true)
      setIsLoad(false)
      console.log(error)
    }
  }

  return (
    <>
      <LoginHedder />
        <Paper elevation={5} sx={{ padding: 4, marginX: 24, marginY:6 }}>
          <h1 className="h1-confirm">新規登録</h1>
          <hr/>
          <div className="container">
            <TextField 
              fullWidth 
              variant='outlined' 
              required 
              label='ユーザーID'
              style={{marginTop: "15px"}}
              onChange={(e) => setRegistForm({ ...registForm, userId: e.target.value })}>
            </TextField>
            <TextField 
              fullWidth 
              required
              label='ユーザー名'
              style={{marginTop: "15px"}}
              onChange={(e) => setRegistForm({ ...registForm, name: e.target.value })}>
            </TextField>
            <FormControl fullWidth style={{marginTop: '15px'}}>
              <InputLabel id='demo-simple-select-label'>部署</InputLabel>
              <Select 
                fullWidth 
                label="部署" 
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                onChange={handleSelectChange}
              >
                <MenuItem value={"client"}>事業部</MenuItem>
                <MenuItem value={"engineer"}>開発部</MenuItem>
              </Select>
            </FormControl>
            <TextField 
              fullWidth 
              className="input-regist" 
              required 
              label='パスワード'
              type="password"
              style={{marginTop: "15px"}}
              onChange={(e) => setRegistForm({ ...registForm, password: e.target.value })}/>
            <TextField 
              fullWidth 
              className="input-regist" 
              required 
              label='確認用パスワード'
              type="password"
              style={{marginTop: "15px"}}
              onChange={handleReInputPass}/>
          </div>
          <br/>
          <Box display='flex' >
          <Grid container display={"flex"}>
            <Grid item xs={3} marginLeft={'15px'}>
              アカウントをお持ちですか？
            </Grid>
            <Grid item xs={7}>
              <Link href='/'>ログイン</Link>
            </Grid>
          </Grid>
        </Box>
          <Box display="flex" justifyContent="flex-end">
            <LoadingButton loading={isLoad} variant="contained" onClick={handleSubmit}>登録</LoadingButton>
          </Box>
        </Paper>
        {
          error ? (
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={open} autoHideDuration={6000} onClose={() => {setOpen(false)}}>
              <Alert onClose={() => {setOpen(false)}} severity="error" sx={{ width: '100%' }}>
                {error}
              </Alert>
            </Snackbar>
          ) : (
            <></>
          )
        }
    </>
  );
};

export default RegistUser;
