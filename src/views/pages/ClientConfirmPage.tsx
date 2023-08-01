import ResponsiveAppBar from "../molecules/Hedder.tsx"
import Paper from '@mui/material/Paper';

const ClientConfirmPage = () => {
  // ChatGptから分割された値を入れる
  return (
    <>
      <ResponsiveAppBar />

      <Paper evaluation="5">
        <h1>目的</h1>
          <input type="text" required></input>
          <h1>アプリ概要</h1>
          <input type="text" required></input>
          <h1>期限</h1>
          <input type="text" required></input>
      </Paper>
    </>
  )
}

export default ClientConfirmPage
