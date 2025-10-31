import React from "react";

function getCoverUrl(cover_i) {
  return cover_i
    ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`
    : null;
}

export default function BookCard({ book }) {
  const { title, author_name, first_publish_year, cover_i } = book;
  const authors = author_name?.join(", ");
  const cover = getCoverUrl(cover_i);

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm bg-white">
      <div className="h-56 flex items-center justify-center bg-gray-100">
        {cover ? (
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
          <img alt={`Cover image for ${title}`} src={cover} className="h-full w-full object-cover" />
        ) : (
          <div className="text-gray-400 text-center px-4">
            <div className="font-medium">{title}</div>
            <div className="text-sm mt-2">No cover available</div>
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className="font-semibold text-sm line-clamp-2">{title}</h3>
        <p className="text-xs text-gray-500 mt-1">{authors || "Unknown author"}</p>
        <div className="mt-3 text-xs text-gray-600">First published: {first_publish_year || "N/A"}</div>
      </div>
    </div>
  );
}
