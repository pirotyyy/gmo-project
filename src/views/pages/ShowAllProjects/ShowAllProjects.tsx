import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Hedder from "./../../molecules/Hedder/Hedder";
import "./ShowAllProjects.css"
import { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Paper from '@mui/material/Paper';
import { ListSubheader } from '@mui/material';
import { apiClient } from '../../../libs/apiClient';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

// const drawerWidth = 240;

interface Project {
  name: string
  projectId: string
  templateId: string
  text: string
  userId: string
}

export default function ShowAllProjects() {
  //const [mobileOpen, setMobileOpen] = React.useState(false);
  const [projects, setProjects] = React.useState<Project[]>([])
  const [selectedProject, setSelectedProject] = React.useState<string>("");
  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  const userInfo = useSelector((state: RootState) => state.userInfo.value);

  useEffect(()=>{
    //promise状態（データ取得中）を回避
    const fetchPosts= async ()=>{
      const result= await apiClient.get(`https://wadq9bmi23.execute-api.ap-northeast-1.amazonaws.com/dev/project/${userInfo.userId}`)
      console.log(result)
      setProjects(result.data)
    }
    fetchPosts();
  },[userInfo])

  return (
    <>
      <Hedder/>
      <Grid container>
        <Grid item xs={3} sx={{height: '100%'}}>
          <List style={{ maxHeight: '90vh', overflow: 'auto'}} subheader={<ListSubheader>プロジェクト一覧</ListSubheader>}>
            {projects.map((project, index) => (
              <ListItem 
                key={project.projectId} 
                onClick={() => {
                  setSelectedIndex(index)
                  setSelectedProject(project.text)
                }} 
                disablePadding>
                <ListItemButton selected={selectedIndex === index}>
                  <ListItemIcon>
                    <AssignmentIcon/>
                  </ListItemIcon>
                  <ListItemText primary={<Typography variant="body1"><strong>{project.name}</strong></Typography>} />
                </ListItemButton>
                <Divider/>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Divider orientation="vertical" flexItem/>

        <Grid item xs={8} style={{ maxHeight: '90vh', overflow: 'auto'}}>
          <Box component="main">
            <Typography paragraph>
              {selectedProject && (
              <Paper elevation={5} sx={{ padding: 8, marginX: 6, marginY:6 }} >
                <b>~要件定義~</b>
                <b style={{ whiteSpace: 'pre-line'}}>{selectedProject}</b>
              </Paper>
              )}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
