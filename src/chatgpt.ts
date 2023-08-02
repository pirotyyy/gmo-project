import axios from "axios";

export const chat = async (message: string) => {
  const API_URL = "https://api.openai.com/v1/";
  const MODEL = "gpt-3.5-turbo";
  const API_KEY = import.meta.env.VITE_GPT_TOKEN;

  try {
    const response = await axios.post(
      `${API_URL}chat/completions`,
      {
        // モデル ID の指定
        model: MODEL,
        // 質問内容
        messages: [
          {
            role: "user",
            content: message
          }
        ]
      },
      {
        // 送信する HTTP ヘッダー(認証情報)
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`
        }
      }
    );
    // 回答の取得
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(error);
    return null;
  }
};
