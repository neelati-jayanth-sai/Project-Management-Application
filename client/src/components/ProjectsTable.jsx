import Spinner from "./Spinner";
import { useQuery } from "@apollo/client";
import ProjectCard from "./ProjectCard"; // Assuming this is your card component
import { GET_PROJECTS } from "../queries/projectQueries";

export default function Projects({ limit, offset, orderBy }) {
  const { loading, error, data } = useQuery(GET_PROJECTS, {
    variables: { limit, offset, orderBy },
  });

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  // Group projects by status
  const groupedProjects = data.projects.reduce((acc, project) => {
    const status = project.status || "Unknown"; // Fallback for projects without a status
    acc[status] = acc[status] || [];
    acc[status].push(project);
    return acc;
  }, {});

  const statuses = ["Not Started", "In Progress", "Completed"]; // Define your statuses here

  const renderProjects = (status) => {
    const projects = groupedProjects[status];
    if (!projects?.length) return <p>No projects found</p>;

    return projects.map((project) => (
      <div className="col-12 col-md-6 col-lg-4 mb-3 d-flex justify-content-center" style={{width:"600px"}} key={project.id}>
        <ProjectCard project={project} />
      </div>
    ));
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {statuses.map((status) => (
          <div key={status} className="col-md-4">
            <h3 className="text-center">{status}</h3>
            <div className="row">
              {renderProjects(status)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
