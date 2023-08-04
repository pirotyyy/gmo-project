import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { setSelectedTemplate } from '../../../../redux/slice/selectedTemplateSlice';

interface TemplateItem {
  format: string;
  name: string;
  templateId: string;
  type: string;
}

const SelectTemplate: React.FC = (): JSX.Element => {

  const dispatch = useDispatch();

  const [selectedId, setSelectedId] = useState<string>('');
  const responseTemplate = useSelector<RootState, TemplateItem[]>(
    (state) => state.responseTemplate.value
  );

  useEffect(() => {
    // オブジェクトIDが選択されたら該当するオブジェクトを取得する
    const selectedObject = responseTemplate ? responseTemplate.find((template) => template.templateId === selectedId) : "";
    dispatch(setSelectedTemplate(selectedObject))
    console.log(selectedObject);
  }, [selectedId, responseTemplate]);
  
  const handleChange = (e: SelectChangeEvent) => {
    setSelectedId(e.target.value);
  };

  return (
    <>
      {responseTemplate ? (
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>テンプレート</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={selectedId}
            label='テンプレート'
            onChange={handleChange}
            MenuProps={{
              style: {
                maxHeight: 300, // スクロールの最大高さを指定
              },
            }}
          >
            {responseTemplate.map((template) => {
              return (
                <MenuItem key={template.templateId} value={template.templateId}>{template.name}</MenuItem>
              );
            })}
          </Select>
        </FormControl>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default SelectTemplate;
