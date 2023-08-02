import React, { useState, ChangeEvent, FormEvent } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Box, TextField, Grid, Paper, Button } from "@mui/material";
import { chat } from "../../chatgpt"; // 必要に応じてパスを調整

type FormProps = {
  name: string;
  message: string;
  text: string;
};

const TextArea: React.FC = () => {
  const defaultMessage =
    "以下の要件定義を、目的、期限、アプリ概要に分けて項目としてJSON形式で出力して下さい。項目がない場合は空欄として出力して下さい。";
  const [message, setMessage] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

  const { handleSubmit, control } = useForm<FormProps>({
    mode: "onBlur",
    criteriaMode: "all",
    shouldFocusError: false,
    defaultValues: {
      name: "",
      message: "",
      text: ""
    }
  });

  const onSubmit: SubmitHandler<FormProps> = async (data) => {
    console.log(data);
    const responseText = await chat(defaultMessage + data.message);
    setAnswer(responseText);
    console.log(responseText);
  };

  return (
    <Box
      component="form"
      marginTop="50px"
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Controller
            name="name"
            control={control}
            rules={{
              required: "入力必須ですよ！"
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                label="お名前"
                placeholder="田中太郎"
                required
                fullWidth
                value={field.value}
                variant="outlined"
                margin="dense"
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={Boolean(error)}
                helperText={error?.message}
              />
            )}
          />
          {/* ここにChatコンポーネントの内容を追加 */}
          <label>
            <textarea
              rows={5}
              cols={50}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>
          <Button type="submit">質問する</Button>
          {answer && (
            <div>
              <h2>回答:</h2>
              <p>{answer}</p>
            </div>
          )}
          {/* MyButtonコンポーネント */}
        </Paper>
      </Grid>
    </Box>
  );
};

export default TextArea;
