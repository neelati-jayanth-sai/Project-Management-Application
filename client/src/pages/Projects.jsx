import ProjectsTable from "../components/ProjectsTable";

export const ProjectsPage = () => {
  return (
    <>
      <div>
        <h2 className="text-center p-2 text-uppercase italic">Projects</h2>
      </div>
      <div className="border border-2 p-4 rounded overflow-auto">
        
      <ProjectsTable orderBy={"status"} />
      </div>
    </>
  );
};

export default ProjectsPage;
