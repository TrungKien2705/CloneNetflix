import { getSession, signOut } from "next-auth/react";
import { NextPageContext } from "next";
import Navbar from "@/components/Navbar";
import Billboad from "@/components/Billboad";
import MovieList from "@/components/MovieList";
import useMovies from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";
import InfoModal from "@/components/InfoModal";
import useInforModal from "@/hooks/useInfoModalStore";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

export default function Home() {
  const { data: movie = [] } = useMovies();
  const { data: favotites = [] } = useFavorites();
  const { isOpen, closeModal } = useInforModal();

  return (
    <>
      <InfoModal visbile={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboad />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movie} />
        <MovieList title="My List" data={favotites} />
      </div>
    </>
  );
}
