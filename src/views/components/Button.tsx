import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

type MyButtonProps = {
  text: string;
};

const MyButton: React.FC<MyButtonProps> = ({ text }) => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const buttonClick = () => {
    if (text) {
      setIsClicked(true);
      navigate("/confirm");
      console.log(text);
    } else {
      alert("テキストエリアに入力してください。");
    }
  };

  return (
    <Box className="container">
      <Button
        variant={"contained"}
        color="primary"
        onClick={buttonClick}
        style={{ borderRadius: "10px" }}
      >
        送信
      </Button>
      {isClicked && <p>クリックが押されました。ページを遷移します</p>}
    </Box>
  );
};

export default MyButton;
