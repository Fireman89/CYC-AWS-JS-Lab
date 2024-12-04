import { useState } from "react";
import axios from "axios";
import "./App.css"; // Add styling for centering

function App() {
  const [matchString, setMatchString] = useState("");
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state
    setLoading(true); // Start loading

    try {
      // Make a GET request with matchString as a query parameter
      const response = await axios.get(
        "https://z7fchi7nff.execute-api.us-east-2.amazonaws.com/js-lab-1",
        {
          params: { matchString }, // Send matchString as query param
        }
      );

      const { imageUrl } = response.data; // Extract imageUrl from response

      setImageUrl(imageUrl); // Update state with the image URL
      setName(imageUrl.substring(imageUrl.lastIndexOf('/') + 1));
    } catch {
      setError("Failed to fetch the image. Please try again.");
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="app-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <h1>Image Finder</h1>
        <input
          type="text"
          value={matchString}
          onChange={(e) => {
            setMatchString(e.target.value);
          }}
          placeholder="Enter match string"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {loading && <p>Loading image...</p>} {/* Show loading text */}

      {imageUrl && !loading && (
        <div className="image-container">
          <img src={imageUrl} alt="Result" height={200} />
          <p className="image-name">{name}</p>
        </div>      
      )}
    </div>
  );
}

export default App;
