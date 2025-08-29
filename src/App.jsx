import NewProject from "./compoments/NewProject";
import NoProjectSelected from "./compoments/NoProjectSelected";
import ProjectSidebar from "./compoments/ProjectsSidebar";
import { useState } from "react";
import SelectedProject from "./compoments/SelectedProject";
import Tasks from "./compoments/Tasks";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });

  function handleAddTask(text) {
    setProjectState((prevState) => {
      const taskid = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskid,
      }

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      }
    })
  }

  function handleDeleteTask(id) {
    setProjectState((prevstate) => {
      return {
        ...prevstate,
        tasks: prevstate.tasks.filter((task) => task.id !== id)
      }
    });
  }

  function handleSelectProject(id) {
    setProjectState(prevstate => {
      return {
        ...prevstate,
        selectedProjectId: id,
      }
    });
  }

  function handleStartAddProject() {
    setProjectState(prevstate => {
      return {
        ...prevstate,
        selectedProjectId: null,
      }
    });
  }
  
  function handleCanelAddProject() {
      setProjectState((prevstate) => {
      return {
        ...prevstate,
        selectedProjectId: undefined,
      }
    });
  }

  function handleAddProject(projectData) {
    setProjectState((prevState) => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
      }

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      }
    })
  }

  function handleDeleteProject() {
    setProjectState((prevstate) => {
      return {
        ...prevstate,
        selectedProjectId: undefined,
        projects: prevstate.projects.filter((project) => project.id !== prevstate.selectedProjectId)
      }
    });
  }

  const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectId);

  let content = <SelectedProject project={selectedProject} onDelete={handleDeleteProject} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} tasks={projectState.tasks}/>;

  if (projectState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCanelAddProject}/>
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>
  }

  return (
    <>
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar onStartAddProject={handleStartAddProject} projects={projectState.projects} onSelectProject={handleSelectProject} selectedProjectId={projectState.selectedProjectId}/>
      {content}
    </main>
    </>
  );
}

export default App;
