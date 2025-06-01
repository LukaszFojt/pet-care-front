import { useLocation } from "react-router-dom";
import { Filters, Posts } from "../components";

const PostsPage = () => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const initialFilters = {
    DataStart: searchParams.get("DataStart") || "",
    DataEnd: searchParams.get("DataEnd") || "",
    Service: searchParams.get("Service") || "",
    Animal: searchParams.get("Animal") || "",
    City: searchParams.get("City") || "",
  };

  return (
    <div>
      <Filters initialFilters={initialFilters} />
    </div>
  );
};

export default PostsPage;
