import TextArea from "../components/TextArea";
import ResponsiveAppBar from "../molecules/Hedder";

const ClientInputPage = () => {
  // クライアントが要件定義（原本）を入力するページ
  return (
    <>
      <ResponsiveAppBar />
      <TextArea />
    </>
  );
};

export default ClientInputPage;
