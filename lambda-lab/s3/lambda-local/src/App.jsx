import { useState } from "react";
import axios from "axios";
import "./App.css"; // Add styling for centering

function App() {
  const [matchString, setMatchString] = useState("");
  const [limit, setLimit] = useState(1); // New state for the limit
  const [imageUrlResult, setImageUrlResult] = useState([]); // Store multiple image URLs
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state
    setLoading(true); // Start loading

    try {
      // Log the parameters we're sending to the API
      console.log("Requesting with params:", { matchString, limit });

      // Make a GET request with matchString and limit as query parameters
      const response = await axios.get(
        "https://z7fchi7nff.execute-api.us-east-2.amazonaws.com/js-lab-1",
        {
          params: { matchString, limit }, // Send matchString and limit as query params
        }
      );

      // Extract multiple image URLs from response
      const imageUrls = response.data.imageUrlResult; // Assuming API returns an array of URLs

      setImageUrlResult(imageUrls || []); // Update state with the image URLs
    } catch (err) {
      console.error("Error fetching images:", err);
      setError("Failed to fetch the images. Please try again.");
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
          onChange={(e) => setMatchString(e.target.value)}
          placeholder="Enter match string"
          required
        />
        <input
          type="number"
          id="limit"
          value={limit}
          onChange={(e) => setLimit(Math.max(1, e.target.value))} // Ensure limit is at least 1
          min="1"
          max="10"
        />        
        <br/>
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {loading && <p>Loading images...</p>} {/* Show loading text */}

      <div className="image-container">
        {imageUrlResult.length > 0 && !loading && imageUrlResult.map((imageUrl, index) => {
          console.log("Rendering image:", imageUrl); // Log each image URL when rendering
          return (
            <div key={index} className="image-item">
              <img src={imageUrl} alt={`Result ${index + 1}`} height={200} />
              <p className="image-name">{imageUrl.substring(imageUrl.lastIndexOf('/') + 1)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
