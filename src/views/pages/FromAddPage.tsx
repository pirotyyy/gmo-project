import React, { useState, ChangeEvent } from 'react';

interface FormItem {
  name: string;
  type: 'text' | 'number';
}

const FormAddPage: React.FC = () => {
  const [formItems, setFormItems] = useState<FormItem[]>([
    { name: '', type: 'text' },
  ]);
  const [projectID, setProjectID] = useState('');

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
    setFormItems([...formItems, { name: '', type: 'text' }]);
  };

  const handleRemoveItem = (index: number) => {
    if (formItems.length > 1) {
      const updatedItems = [...formItems];
      updatedItems.splice(index, 1);
      setFormItems(updatedItems);
    }
  };

  const handleSave = () => {
    const formData = {
      projectID: projectID,
      formItems: formItems,
    };
    console.log(formData);
    // formItemsの内容を保存する処理を実装する
  };

  return (
    <div>
      <h1>フォームを作成</h1>
      <label>
        プロジェクトID:
        <input
          type='text'
          name='projectID'
          value={projectID}
          required
          onChange={(event) => setProjectID(event.target.value)}
        />
      </label>
      {formItems.map((item, index) => (
        <div key={index}>
          <label>
            項目名:
            <input
              type='text'
              name='name'
              value={item.name}
              required
              onChange={(event) => handleInputChange(index, event)}
            />
          </label>
          <label>
            タイプ:
            <select
              name='type'
              value={item.type}
              onChange={(event) => handleSelectChange(index, event)}
            >
              <option value='text'>文字</option>
              <option value='number'>数字</option>
            </select>
          </label>
          {formItems.length > 1 && (
            <button onClick={() => handleRemoveItem(index)}>✖︎</button>
          )}
        </div>
      ))}
      <button onClick={handleAddItem}>+</button>
      <button onClick={handleSave}>保存</button>
    </div>
  );
};

export default FormAddPage;
