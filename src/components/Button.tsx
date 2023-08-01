import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

type MyButtonProps = {
  text: string;
};

const MyButton: React.FC<MyButtonProps> = ({ text }) => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const buttonClick = () => {
    setIsClicked(true);
    navigate("/confirm");
    console.log(text);
  };

  //   ここでchatgptに送信するための関数をimportする。

  return (
    <>
      <Button variant="text" onClick={buttonClick}>
        送信
      </Button>
      {isClicked && <p>クリックが押されました。ページを遷移します</p>}
    </>
  );
};

export default MyButton;
