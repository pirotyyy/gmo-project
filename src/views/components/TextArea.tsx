import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Box, TextField, Grid, Paper } from "@mui/material";
import MyButton from "./Button";

type FormProps = {
  name: string;
  message: string;
  text: string;
};

const TextArea: React.FC = () => {
  const { handleSubmit, control, watch } = useForm<FormProps>({
    mode: "onBlur",
    criteriaMode: "all",
    shouldFocusError: false
  });

  const onSubmit: SubmitHandler<FormProps> = (data) => {
    console.log(data);
  };

  const text = watch("text");

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
          <Controller
            name="text"
            control={control}
            render={({ field }) => (
              <TextField
                label="要件定義"
                multiline
                fullWidth
                placeholder="要件定義を記入してください"
                value={field.value}
                onChange={field.onChange}
                style={{ marginBottom: "20px", height: "80px" }}
              />
            )}
          />
          <MyButton text={text} />
        </Paper>
      </Grid>
    </Box>
  );
};

export default TextArea;
