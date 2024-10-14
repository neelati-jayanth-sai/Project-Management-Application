import { useQuery } from "@apollo/client";
import ClientCard from "../components/ClientCard";
import { GET_CLIENTS } from "../queries/clientQueries";
import Spinner from "../components/Spinner";

export const ClientsPage = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;
  return (
    <>
      <div>
        <h2 className="text-center p-2 text-uppercase italic">Clients</h2>
      </div>
      <div className="border border-2 p-2 rounded">
        {data.clients.length > 0 ? (
          <div className="row">
            {data.clients.map((client) => (
              <ClientCard key={client.id} client={client}/>
            ))}
          </div>
        ) : (
          <p>No Clients</p>
        )}
      </div>
    </>
  );
};

export default ClientsPage;
