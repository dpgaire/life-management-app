import { useState } from "react";

const token = localStorage.getItem("token"); // Get the token from local storage
const url = "http://localhost:3002";

const usePostHook = ({ endpoint, bodyData, refetch }) => {
  //   const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [validationerrors, setValidationErrors] = useState([]);
  const [errorMessage, setErrorMessage] = useState();
  const [responseData, setResponseData] = useState({});

  const postData = async () => {
    setLoading(true);
    setValidationErrors([]);
    setErrorMessage(null);
    try {
      const response = await fetch(`${url}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();

      if (response.status === 201) {
        refetch();
      } else {
        setValidationErrors(data?.errors);
        setErrorMessage(data?.error_message);
        setResponseData(data);
      }
    } catch (error) {
      console.log(error);
      //   setError('Error adding category: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    postData,
    responseData,
    loading,
    validationerrors,
    setValidationErrors,
    errorMessage,
  };
};

export default usePostHook;
