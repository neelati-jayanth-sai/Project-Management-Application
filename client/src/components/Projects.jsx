import Spinner from "./Spinner";
import { useQuery } from "@apollo/client";
import ProjectCard from "./ProjectCard";
import { GET_PROJECTS } from "../queries/projectQueries";

export default function Projects({ limit, offset, orderBy }) {
  const { loading, error, data } = useQuery(GET_PROJECTS, {
    variables: { limit, offset, orderBy },
  });

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {data.projects.length > 0 ? (
        <div className="row mt-4">
          {data.projects.map((project) => (
            <ProjectCard key={project.id} project={project} showDeleteButton={false} />
          ))}
        </div>
      ) : (
        <p>No Projects</p>
      )}
    </>
  );
}
