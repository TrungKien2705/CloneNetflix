import { isEmpty } from "lodash";
import React from "react";
import MovieCard from "./MovieCard";

interface MovieListProps {
  data: Record<string, any>[];
  title: string;
}
const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
  if (isEmpty(data)) {
    return null;
  }
  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div className="">
        <p className="text-white text-md md:text-4xl lg:text-2xl mb-4">
          {title}
        </p>
        <div className="grid grid-cols-4 gap-2">
          {data.map((item) => {
            return <MovieCard key={item.id} data={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
