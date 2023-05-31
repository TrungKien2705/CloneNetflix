import React, { useCallback, useMemo } from "react";
import axios from "axios";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import useFavorites from "@/hooks/useFavorites";
import useCurrentUser from "@/hooks/useCurrentUser";
interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorites = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    let resopnse;
    if (isFavorites) {
      resopnse = await axios.delete("/api/favorite", { data: { movieId } });
    } else {
      resopnse = await axios.post("/api/favorite", { movieId });
    }
    const updateFavoriteIds = resopnse?.data?.favoriteIds;
    mutate({
      ...currentUser,
      favoriteIds: updateFavoriteIds,
    });
    mutateFavorites();
  }, [movieId, isFavorites, currentUser, mutate, mutateFavorites]);

  const Icon = isFavorites ? AiOutlineCheck : AiOutlinePlus;
  return (
    <div
      onClick={toggleFavorites}
      className="
            cursor-pointer
            group/item
            w-6 h-6
            lg:w-10 lg:h-10
            border-white
            border-2
            rounded-full
            flex
            justify-center
            items-center
            transition
            hover:border-neutral-300
        "
    >
      <Icon
        className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6"
        size={25}
      />
    </div>
  );
};

export default FavoriteButton;
