import React, { useState } from "react";
import MyButton from "./Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";

const TextArea = () => {
  const [text, setText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <>
      <FormControl>
        <FormLabel>要件定義を記入</FormLabel>
        <TextField
          placeholder="内容は〜〜〜を入れてください"
          minRows={2}
          value={text}
          onChange={handleChange}
        />
        <FormHelperText>〜〜〜〜〜〜〜</FormHelperText>
      </FormControl>
      <MyButton text={text} />
    </>
  );
};

export default TextArea;
