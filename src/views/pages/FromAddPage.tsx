import React, { useState, ChangeEvent } from "react";
import ResponsiveAppBar from "../molecules/Hedder";
import {
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Container
} from "@mui/material";
import axios from "axios";

interface FormItem {
  name: string;
  type: "text" | "number";
}

interface CreateTemplateDto {
  OperationType: string;
  Keys: {
    name: string;
    format: string;
  };
}

const FormAddPage: React.FC = () => {
  const [formItems, setFormItems] = useState<FormItem[]>([
    { name: "", type: "text" }
  ]);
  const [projectID, setProjectID] = useState("");

  const handleInputChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    const updatedItems = [...formItems];
    updatedItems[index] = { ...updatedItems[index], [name]: value };
    setFormItems(updatedItems);
  };

  const handleSelectChange = (
    index: number,
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    const updatedItems = [...formItems];
    updatedItems[index] = { ...updatedItems[index], [name]: value };
    setFormItems(updatedItems);
  };

  const handleAddItem = () => {
    setFormItems([...formItems, { name: "", type: "text" }]);
    console.log(formItems);
  };

  const handleRemoveItem = (index: number) => {
    if (formItems.length > 1) {
      const updatedItems = [...formItems];
      updatedItems.splice(index, 1);
      setFormItems(updatedItems);
    }
  };

  const handleSave = async () => {
    const formItemNames = formItems.map((item) => item.name).join(",");
    const dto: CreateTemplateDto = {
      OperationType: "PUT",
      Keys: {
        name: projectID,
        format: formItemNames
      }
    };

    try {
      await axios.post(
        "https://gx8hli4rth.execute-api.ap-northeast-1.amazonaws.com/dev/template",
        dto
      );
    } catch (err) {
      console.log(err);
    }

    console.log(`Project ID: '${projectID}',Form Item Names: ${formItemNames}`);
  };

  return (
    <div>
      <ResponsiveAppBar />
      <Container
        sx={{
          height: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}
      >
        <Paper elevation={5} sx={{ padding: 4, marginX: 24, marginY: 6 }}>
          <h1>フォームを作成</h1>
          <TextField
            fullWidth
            label="プロジェクトID"
            variant="outlined"
            value={projectID}
            required
            style={{ marginBottom: "10px" }}
            onChange={(event) => setProjectID(event.target.value)}
          />
          {formItems.map((item, index) => (
            <Grid container spacing={3} key={index}>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="項目名"
                  variant="outlined"
                  name="name"
                  value={item.name}
                  required
                  style={{ marginBottom: "10px" }}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>タイプ</InputLabel>
                  <Select
                    label="タイプ"
                    name="type"
                    value={item.type}
                    onChange={(event) => handleSelectChange(index, event)}
                  >
                    <MenuItem value="text">文字</MenuItem>
                    <MenuItem value="number">数字</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                {formItems.length > 1 && (
                  <Button
                    variant="contained"
                    color="error"
                    style={{ paddingRight: "10px" }}
                    onClick={() => handleRemoveItem(index)}
                  >
                    ✖︎
                  </Button>
                )}
              </Grid>
            </Grid>
          ))}
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddItem}
            style={{ marginRight: "10px" }}
          >
            +
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            保存
          </Button>
        </Paper>
      </Container>
    </div>
  );
};

export default FormAddPage;
