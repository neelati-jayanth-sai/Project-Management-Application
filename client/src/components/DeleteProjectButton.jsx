import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { DELETE_PROJECT } from '../mutations/projectMutations';
import { GET_PROJECTS } from '../queries/projectQueries';
import { useMutation } from '@apollo/client';

export default function DeleteProjectButton({ projectId, redirectPath, size = 'md', alignment = 'end' }) { // Added alignment prop
  const navigate = useNavigate();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => navigate(redirectPath || '/'),
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      deleteProject();
    }
  };

  // Determine button size classes based on the size prop
  const sizeClass = size === 'lg' ? 'btn-lg' : size === 'sm' ? 'btn-sm' : '';

  // Determine alignment classes based on the alignment prop
  const alignmentClass = alignment === 'start' ? 'justify-content-start' : alignment === 'center' ? 'justify-content-center' : 'justify-content-end';

  return (
    <div className={`d-flex ${alignmentClass}`}>
      <button className={`btn btn-danger m-2 ${sizeClass}`} onClick={handleDelete}>
        <FaTrash className='icon' /> Delete Project
      </button>
    </div>
  );
}
