import { useState, ChangeEvent, FormEvent } from 'react';
import { chat } from '../../chatgpt';

const Chat = () => {
  const defaultMessage =
    '以下の要件定義を、目的、期限、アプリ概要に分けて全てtext項目としてJSON形式で出力して下さい。オブジェクトは一つにして入れ子構造にはしないでください。項目がない場合は空欄として出力して下さい。';
  const [message, setMessage] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');

  const handleMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const responseText = await chat(defaultMessage + message);
    setAnswer(responseText);
    console.log(responseText);
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
          <button type='submit'>質問する</button>
        </div>
      </form>
      {answer && (
        <div>
          <h2>回答:</h2>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default Chat;
