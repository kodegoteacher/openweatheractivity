// Import Axios library
import axios from "axios";

// Make a GET request
axios
  .get("https://api.example.com/data")
  .then((response) => {
    // Handle the response data
    console.log(response.data);
  })
  .catch((error) => {
    // Handle errors
    console.error("An error occurred:", error);
  });
