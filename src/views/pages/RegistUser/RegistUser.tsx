import LoginHedder from "../../molecules/LoginHedder/LoginHedder.tsx"
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useEffect } from "react";
import {ChangeEvent} from "react";
import Switch from '@mui/material/Switch';
import "./RegistUser.css"
// import CircularProgress from "@mui/material/CircularProgress";

const RegistUser = () => {
  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  //const [text,setText]=useState("");
  const responseText = useSelector((state: RootState) => state.responseText.value);
  useEffect(() => {
    console.log(responseText);
  }, [responseText]);

  const handleChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  // ChatGptから分割された値を入れる
  return (
    <>
      <LoginHedder/>

        <Paper elevation={5} sx={{ padding: 4, marginX: 24, marginY:6 }}>
          <h1 className="h1-confirm">新規登録</h1>
          <hr/>
          <div className="container">
            <h2 className="h2-confirm">ユーザID</h2>
            <textarea placeholder="ID" required rows={1}>
            </textarea>
            <h2 className="h2-confirm">あなたはクライアント(文章考えて)</h2>
            <Switch {...label} />
            <h2 className="h2-confirm">パスワード</h2>
            <input className="input-regist" placeholder="pass" required type="password"/>
            <h2 className="h2-confirm">パスワード再入力</h2>
            <input className="input-regist" placeholder="pass" required type="password"/>
          </div>
          <br/>
          <button className="button-confirm">登録</button>
        </Paper>
        {/* <CircularProgress className="loading" style={{width:"150px", height:"150px"}}/> */}
    </>
  )
}

export default RegistUser
