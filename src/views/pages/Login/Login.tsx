import LoginHedder from "../../molecules/LoginHedder/LoginHedder.tsx"
import Paper from '@mui/material/Paper';
import {useState} from "react";
import "./Login.css"
import axios from "axios";
import { Alert, Box, Snackbar, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
// import CircularProgress from "@mui/material/CircularProgress";

interface LoginForm {
  userId: string
  password: string
}

const Login = () => {
  const [loginForm, setLoginForm] = useState<LoginForm>({
    userId: "",
    password: "",
  })
  const [isLoad, setIsLoad] = useState<boolean>(false)
  const [error, setError] = useState(null)
  const [open, setOpen] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    setIsLoad(true)
    try {
      await axios.post(
        'https://wadq9bmi23.execute-api.ap-northeast-1.amazonaws.com/dev/auth/login',
        loginForm
      ) 
      // 一覧画面が用意できたらパスを変更
      navigate('/input')
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

        <Paper elevation={5} sx={{ padding: 4, marginX: 50, marginY:6 }}>
          <h1 className="h1-confirm">ログイン</h1>
          <hr/>
          <Box marginTop={5} marginBottom={5}>
            <TextField
              id="outlined-basic"
              label="ユーザーID"
              variant="outlined"
              value={loginForm.userId}
              onChange={(e) => setLoginForm({ ...loginForm, userId: e.target.value })}
              fullWidth
            />
          </Box>
          <Box>
            <TextField
              id="outlined-basic"
              label="パスワード"
              variant="outlined"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              fullWidth
            />
          </Box>
          <br/>
          <Box display="flex" justifyContent="flex-end"> 
            <LoadingButton loading={isLoad} variant="contained" onClick={handleSubmit}>ログイン</LoadingButton>
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

export default Login
