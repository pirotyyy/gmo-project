import ResponsiveAppBar from "../../molecules/Hedder/Hedder.tsx"
import Paper from '@mui/material/Paper';
import "./ClientConfirmPage.css"
import {useState,ChangeEvent} from "react";

const ClientConfirmPage = () => {
  const [text,setText]=useState("");
  const [text2,setText2]=useState("");
  const [text3,setText3]=useState("");

  const handleChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const handleChange2 = (e:ChangeEvent<HTMLTextAreaElement>) => {
    setText2(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const handleChange3 = (e:ChangeEvent<HTMLTextAreaElement>) => {
    setText3(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  // ChatGptから分割された値を入れる
  return (
    <>
      <ResponsiveAppBar/>

        <Paper elevation={5} sx={{ padding: 4, marginX: 24, marginY:6 }}>
          <h1 className="h1-confirm">要件抽出</h1>
          <hr/>
          <div className="container">
            <h2 className="h2-confirm">目的</h2>
            <textarea placeholder="目的が抽出されませんでした。" required rows={1}
              value={text} onChange={handleChange}>
            </textarea>
            <h2 className="h2-confirm">アプリ概要</h2>
            <textarea placeholder="アプリ概要が抽出されませんでした。" required rows={1}
              value={text2} onChange={handleChange2}>
            </textarea>
            <h2 className="h2-confirm">期限</h2>
            <textarea placeholder="期限が抽出されませんでした。" required rows={1}
              value={text3} onChange={handleChange3}>
            </textarea>
          </div>
          <br/>
          <button className="button-confirm">出力</button>
        </Paper>
    </>
  )
}

export default ClientConfirmPage
