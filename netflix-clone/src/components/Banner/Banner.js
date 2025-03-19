import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import requests from "../../utils/requests";
import "./banner.css";
import movieTrailer from "movie-trailer";

const Banner = () => {
  const [movie, setMovie] = useState({});
  const [trailerUrl, setTrailerUrl] = useState("");
  const base_url = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    (async () => {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);
        console.log(request.data);
        setMovie(
          request.data.results[
            Math.floor(Math.random() * request.data.results.length)
          ]
        );
      } catch (error) {
        console.error("Error:", error.message);
      }
    })();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name)
        .then((url) => {
          if (!url) {
            console.log("Trailer not found.");
            return;
          }
          try {
            const urlParams = new URLSearchParams(new URL(url).search);
            const videoId = urlParams.get("v");
            if (videoId) {
              setTrailerUrl(videoId);
            } else {
              console.log("No valid video ID found.");
            }
          } catch (error) {
            console.error("Error extracting video ID:", error);
          }
        })
        .catch((error) => console.error("Error fetching trailer:", error));
    }
  };

  return (
    <div
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${base_url}${movie?.backdrop_path})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="banner_content">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
        <div className="banner_buttons">
          <button
            onClick={() => handleClick(movie)}
            className="banner_button play"
          >
            Play
          </button>
          {/* <button className="banner_button">My List</button> */}
        </div>
      </div>

      {trailerUrl && (
        <div className="video_container">
          <iframe
            width="100%"
            height="390"
            src={`https://www.youtube.com/embed/${trailerUrl}?autoplay=1`}
            title="Movie Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      <div className="banner_fadeBottom" />
    </div>
  );
};

export default Banner;
