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
import axios from "axios";
import Grid from '@mui/material/Grid';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Paper from '@mui/material/Paper';
import { ListSubheader } from '@mui/material';

const drawerWidth = 240;

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

  useEffect(()=>{
    //promise状態（データ取得中）を回避
    const fetchPosts= async ()=>{
      const result= await axios.get(`https://wadq9bmi23.execute-api.ap-northeast-1.amazonaws.com/dev/project/${localStorage.getItem('userId')}`)
      console.log(result)
      setProjects(result.data)
    }
    fetchPosts();
  },[])

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

        <Grid item xs={8}>
          <Box component="main"sx={{flexGrow:1, p:2, width:{ sm:`calc(100%-${drawerWidth}px)`}}}>
            <Typography paragraph>
              {selectedProject && (
              <Paper elevation={5} sx={{ padding: 8, marginX: 6, marginY:6 }} >
                <h1>~要件定義~</h1>
                <h3 style={{ whiteSpace: 'pre-line'}}>{selectedProject}</h3>
              </Paper>
              )}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
