import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";

import galleryList from "./data";
import "./gallery.css";
import { useAuth0 } from "@auth0/auth0-react";
import LoadingSpinner from "../loading-spinner/LoadingSpinner.js";
import LogoutButton from "../auth/Logout.js";

const Card = ({ src, title, text, id, index, moveImage }) => {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: "image",
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveImage(dragIndex, hoverIndex);

      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: "image",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging()
      };
    }
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity }} className="card m-auto rounded-md w-52 flex flex-col justify-center items-center">
      <img src={src} alt={title} className="rounded-full" />
      <p>{text}</p>
    </div>
  );
};

const Gallery = () => {
  const [images, setImages] = useState(galleryList);
  const [ searchInput, setSearchInput ] = useState("");

  function handleSearch() {
    console.log(searchInput);
		const result = images.filter((image) => image.tag.toLowerCase().includes(searchInput.toLowerCase()));

		if (result) {
      setImages(result);
    }  else {
      setImages(images)
    };
	}

  const moveImage = React.useCallback((dragIndex, hoverIndex) => {
    setImages((prevCards) => {
      const clonedCards = [...prevCards];
      const removedItem = clonedCards.splice(dragIndex, 1)[0];

      clonedCards.splice(hoverIndex, 0, removedItem);
      return clonedCards;
    });
  }, []);

  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    isAuthenticated && (
    <div className="m-auto bg-[#faecf8] text-black py-[5%] px-[5%] md:py-[10%]">
      <div className="flex flex-col gap-y-4 m-auto md:flex-row md:justify-between">
      <div>
        <input 
          type="text" 
          placeholder="Search images by tags"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="py-2 px-4 mr-2 bg-white text-black rounded-lg"
        />
        <button onClick={handleSearch} className="py-2 px-8 ml-2 bg-[#912483] border-2 rounded-lg">Search</button>
      </div>
      <LogoutButton />
      </div>
      <main>
        {React.Children.toArray(
          images.map((image, index) => (
            <Card
              src={image.img}
              title={image.title}
              id={image.id}
              index={index}
              moveImage={moveImage}
              text={image.tag}
            />
          ))
        )}
      </main>
    </div>
    )  
  );
};
export default Gallery