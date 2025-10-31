import React, { useState } from "react";
import BookCard from "./BookCard";

export default function BookSearch() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSearch(e) {
    e?.preventDefault();
    if (!query.trim()) {
      setBooks([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(query)}&limit=20`);
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      setBooks(data.docs || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch results. Check your network.");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by book title (e.g., Dune, Thinking, React)"
          className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {loading && <div className="py-6 text-center text-gray-600">Loading…</div>}
      {error && <div className="py-3 text-red-600">{error}</div>}

      {!loading && !error && books.length === 0 && query.trim() !== "" && (
        <div className="py-6 text-center text-gray-600">No results found for “{query}”.</div>
      )}

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4">
        {books.map((b) => (
          <BookCard key={`${b.key}-${b.cover_i || ""}`} book={b} />
        ))}
      </div>
    </div>
  );
}
