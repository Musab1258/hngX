import "./gallery.css";
import React from "react";
import { useDrag, useDrop } from "react-dnd";

import galleryList from "./data.js";
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
    <div ref={ref} style={{ opacity }} className="card">
      <img src={src} alt={title} />
      <p>{text}</p>
    </div>
  );
};

const Gallery = () => {
  const [images, setImages] = React.useState(galleryList);

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

  const [ searchInput, setSearchInput ] = useState("");
  let search = searchInput

  const filter = () => {
    if (search) {
      window.location.reload();
      let filteredImages = images.filter((image) => images.includes(search.toLowerCase()));
      {filteredImages ? setImages(filteredImages) : setImages(images);
    }
  }

  return (
    isAuthenticated && (
    <div>
      <header>
        <div className="flex gap-x-4">
          <input 
            type="text" 
            placeholder="Search images by tags"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            />
          <button className="py-4 px-8" onClick={filter}>Search</button>
        </div>
        <div>
          <LogoutButton />
        </div>
      </header>
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
}};

export default Gallery;
