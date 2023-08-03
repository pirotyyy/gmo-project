import LoginHedder from "../../molecules/LoginHedder/LoginHedder.tsx"
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useEffect } from "react";
import Switch from '@mui/material/Switch';
import "./RegistUser.css"
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, Snackbar, Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

interface RegistForm {
  userId: string
  name:string
  isAdmin: boolean
  password: string
}

const RegistUser = () => {
  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  const [registForm, setRegistForm] = useState<RegistForm>({
    userId: "",
    name: "",
    isAdmin: false,
    password: "",
  })
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState<boolean>(false)
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const navigate = useNavigate()

  const responseText = useSelector((state: RootState) => state.responseText.value);
  useEffect(() => {
    console.log(responseText);
  }, [responseText]);

  const handleSwitchChange = (event) => {
    setIsSwitchOn(event.target.checked);
    setRegistForm({
    ...registForm,
    isAdmin: event.target.checked ? true : false,
    })
  };

  const handleSubmit = async () => {
    setIsLoad(true)
    console.log(registForm)
    try {
      await axios.post(
        "https://wadq9bmi23.execute-api.ap-northeast-1.amazonaws.com/dev/user",
        registForm
      )
      navigate('/')
      setIsLoad(false)
    } catch (error) {
      setError(error.response.data.message)
      setOpen(true)
      setIsLoad(false)
      console.log(error)
    }
  }

  return (
    <>
      <LoginHedder/>

        <Paper elevation={5} sx={{ padding: 4, marginX: 24, marginY:6 }}>
          <h1 className="h1-confirm">新規登録</h1>
          <hr/>
          <div className="container">
            <h2 className="h2-confirm">ユーザID</h2>
            <textarea placeholder="ID" required rows={1}
            onChange={(e) => setRegistForm({ ...registForm, userId: e.target.value })}>
            </textarea>
            <h2 className="h2-confirm">ユーザネーム</h2>
            <textarea placeholder="name" required rows={1}
            onChange={(e) => setRegistForm({ ...registForm, name: e.target.value })}>
            </textarea>
            <h2 className="h2-confirm">クライアントですかぁ？</h2>
            <Switch {...label} checked={isSwitchOn} onChange={handleSwitchChange}/>
            <h2 className="h2-confirm">パスワード</h2>
            <input className="input-regist" placeholder="pass" required type="password"
            onChange={(e) => setRegistForm({ ...registForm, password: e.target.value })}/>
            <h2 className="h2-confirm">パスワード再入力</h2>
            <input className="input-regist" placeholder="pass" required type="password"/>
          </div>
          <br/>
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
  )
}

export default RegistUser
