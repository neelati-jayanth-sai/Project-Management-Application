import DeleteProjectButton from "./DeleteProjectButton";

export default function ProjectCard({ project, showDeleteButton = true }) { // Added showDeleteButton prop
  return (
    <div className='col-md-6'>
      <div className='card mb-2' style={{ width: '100%' }}>
        {/* Ensure the card uses full width of its container */}
        <div className='card-body'>
          <div className='d-flex justify-content-between align-items-center'>
            <h5 className='card-title'>{project.name}</h5>
            <a className='btn btn-light btn-sm' href={`/project/${project.id}`}>
              View
            </a>
          </div>
          <p className='small'>
            Status: <strong>{project.status}</strong>
          </p>
        </div>
        {/* Conditionally render the DeleteProjectButton based on showDeleteButton */}
        {showDeleteButton && (
          <DeleteProjectButton
            projectId={project.id}
            redirectPath={'/projects'}
            size="sm"
            alignment="center"
          />
        )}
      </div>
    </div>
  );
}
