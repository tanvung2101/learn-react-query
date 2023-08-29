import { useQuery } from "react-query";
import axios from "axios";
import { useState } from "react";

const fetchColors = (pageNumber) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`);
};

const PaginatedQueriesPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { isLoading, isError, error, data, isFetching } = useQuery(
    ["color", pageNumber],
    () => fetchColors(pageNumber),
    {
      keepPreviousData: true,
    }
  );
  if (isLoading) {
    return <h2>Loading</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }
  console.log(data.data);
  return (
    <>
      <div>
        {data.data.map((color) => (
          <div key={color.id}>
            <h2>
              {color.id}. {color.label}
            </h2>
          </div>
        ))}
      </div>
      <div>
        <button
          onClick={() => setPageNumber((page) => page - 1)}
          disabled={pageNumber === 1}
        >
          Prev page
        </button>
        <button
          onClick={() => setPageNumber((page) => page + 1)}
          disabled={pageNumber === 4}
        >
          Next page
        </button>
      </div>
      {isFetching && 'Loading'}
    </>
  );
};

export default PaginatedQueriesPage;
