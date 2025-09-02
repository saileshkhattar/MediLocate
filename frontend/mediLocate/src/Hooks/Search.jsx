import { useState, useEffect, useMemo } from "react";
import debounce from "../utils/debounce";
import axios from "axios";

export default function useSearch() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Debounce only the API call
  const fetchSuggestions = async (value) => {
    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:5000/pharmacy/suggestions?q=${value}`,
        { withCredentials: true }
      );
      setSuggestions(res.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  // Create a stable debounced version ONCE
  const debouncedFetch = useMemo(
    () => debounce(fetchSuggestions, 400),
    []
  );

  useEffect(() => {
    debouncedFetch(query); // ✅ only debounces API, not typing
  }, [query, debouncedFetch]);

  return { query, setQuery, suggestions };
}