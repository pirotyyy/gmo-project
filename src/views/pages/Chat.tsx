import { useDispatch, useSelector } from 'react-redux';
import { useState, ChangeEvent, FormEvent } from 'react';
import { chat } from '../../chatgpt';
import { setResponseText } from '../../responseTextSlice';
import { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const defaultMessage =
    '以下の要件定義を、目的、期限、アプリ概要に分けて全てtext項目としてJSON形式で出力して下さい。オブジェクトは一つにして入れ子構造にはしないでください。項目がない場合は空欄として出力して下さい。';
  const [message, setMessage] = useState<string>('');
  const handleMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const useSelectorResponseText = (state: RootState) => state.responseText.value;
  const responseText = useSelector(useSelectorResponseText);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const responseText = await chat(defaultMessage + message);
    dispatch(setResponseText(responseText));
    console.log(responseText);
    navigate("/confirm")
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <textarea
            rows={5}
            cols={50}
            value={message}
            onChange={handleMessageChange}
          />
        </label>
        <div>
          <button type="submit">質問する</button>
        </div>
      </form>
      {responseText && (
        <div>
          <h2>回答:</h2>
          <p>{responseText}</p>
        </div>
      )}
    </div>
  );
};

export default Chat;
