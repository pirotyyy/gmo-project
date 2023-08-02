import LoginHedder from "../../molecules/LoginHedder/LoginHedder.tsx"
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useEffect } from "react";
import {useState} from "react";
import "./Login.css"
// import CircularProgress from "@mui/material/CircularProgress";

const Login = () => {
  //const [text,setText]=useState("");
  const responseText = useSelector((state: RootState) => state.responseText.value);
  useEffect(() => {
    console.log(responseText);
  }, [responseText]);
  const [text,setText]=useState("");
  const [text2,setText2]=useState("");

  // ChatGptから分割された値を入れる
  return (
    <>
      <LoginHedder/>

        <Paper elevation={5} sx={{ padding: 4, marginX: 24, marginY:6 }}>
          <h1 className="h1-confirm">ログイン</h1>
          <hr/>
          <div className="container">
            <h2 className="h2-confirm">ユーザID</h2>
            <textarea placeholder="ID" required rows={1}
              value={text} >
            </textarea>
            <h2 className="h2-confirm">パスワード</h2>
            <input className="input-login" placeholder="pass" required type="password"/>
          </div>
          <br/>
          <button className="button-confirm">ログイン</button>
        </Paper>
        {/* <CircularProgress className="loading" style={{width:"150px", height:"150px"}}/> */}
    </>
  )
}

export default Login
