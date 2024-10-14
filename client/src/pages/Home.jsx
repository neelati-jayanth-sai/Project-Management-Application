import Clients from "../components/Clients";
import Projects from "../components/Projects";
import AddClientModal from "../components/AddClientModal";
import AddProjectModal from "../components/AddProjectModal";

export default function Home() {
  return (
    <>
      <div className="d-flex gap-3 mb-4">
        <AddClientModal />
        <AddProjectModal />
      </div>
      <div className="text-center p-2">
        <Projects limit={5} />
      </div>
      <hr />
      <div>
        <h2 className="text-center p-2">Clients</h2>
        <Clients limit={5}/>
      </div>
    </>
  );
}
