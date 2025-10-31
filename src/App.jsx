import React from "react";
import BookSearch from "./components/BookSearch";

export default function App() {
  return (
    <div className="min-h-screen flex items-start justify-center p-6">
      <div className="w-full max-w-4xl">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold">Book Finder</h1>
          <p className="text-sm text-gray-600 mt-1">Search books from Open Library</p>
        </header>

        <main className="bg-white shadow-md rounded-lg p-6">
          <BookSearch />
        </main>

        <footer className="text-xs text-gray-500 mt-4">Data from Open Library · Covers via covers.openlibrary.org</footer>
      </div>
    </div>
  );
}
