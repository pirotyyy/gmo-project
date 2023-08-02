import ResponsiveAppBar from "../../molecules/Hedder.tsx"
import Paper from '@mui/material/Paper';
import "./ClientConfirmPage.css"
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useEffect } from "react";
//import {useState} from "react";

const ClientConfirmPage = () => {
  //const [text,setText]=useState("");
  const responseText = useSelector((state: RootState) => state.responseText.value);
  useEffect(() => {
    console.log(responseText);
  }, [responseText]);

  // ChatGptから分割された値を入れる
  return (
    <>
      <ResponsiveAppBar />

        <Paper elevation={5} sx={{ padding: 4, marginX: 24, marginY:6 }}>
          <h1 className="h1-confirm">要件抽出</h1>
          <hr/>
          <div className="container">
            <h2 className="h2-confirm">目的</h2>
            <textarea placeholder="目的が抽出されませんでした。" required rows={1}
              onChange={(e) =>{
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}>
            </textarea>
            <h2 className="h2-confirm">アプリ概要</h2>
            <textarea placeholder="アプリ概要が抽出されませんでした。" required rows={1}
              onChange={(e) =>{
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}>
            </textarea>
            <h2 className="h2-confirm">期限</h2>
            <textarea placeholder="期限が抽出されませんでした。" required rows={1}
            onChange={(e) =>{
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}>
            </textarea>
          </div>
          <br/>
          <button className="button-confirm">出力</button>
        </Paper>
    </>
  )
}

export default ClientConfirmPage
