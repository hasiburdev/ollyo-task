import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import "./App.css";

function App() {
  const [imageData, setImageData] = useState([
    { id: "0", src: "image-1.webp", alt: "Image 1", isFeatureImage: true },
    { id: "1", src: "image-2.webp", alt: "Image 2", isFeatureImage: false },
    { id: "2", src: "image-3.webp", alt: "Image 3", isFeatureImage: false },
    { id: "3", src: "image-4.webp", alt: "Image 4", isFeatureImage: false },
    { id: "4", src: "image-5.webp", alt: "Image 5", isFeatureImage: false },
    { id: "5", src: "image-6.webp", alt: "Image 6", isFeatureImage: false },
    { id: "6", src: "image-7.webp", alt: "Image 2", isFeatureImage: false },
    { id: "7", src: "image-8.webp", alt: "Image 3", isFeatureImage: false },
    { id: "8", src: "image-9.webp", alt: "Image 4", isFeatureImage: false },
    { id: "9", src: "image-10.jpeg", alt: "Image 5", isFeatureImage: false },
    { id: "10", src: "image-11.jpeg", alt: "Image 5", isFeatureImage: false },
  ]);
  const [selectedImages, setSelectedImages] = useState([]);

  const toggleImageSelection = (imageId) => {
    if (selectedImages.includes(imageId)) {
      setSelectedImages(selectedImages.filter((id) => id !== imageId));
    } else {
      setSelectedImages([...selectedImages, imageId]);
    }
  };

  const deleteSelectedImages = () => {
    const updatedImages = imageData.filter(
      (image) => !selectedImages.includes(image.id)
    );
    setSelectedImages([]);
    setImageData(updatedImages);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(imageData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setImageData(items);

  };



  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const uploadedImage = {
          id: Date.now().toString(), 
          src: event.target.result,
          alt: "Uploaded Image",
          isFeatureImage: false,
        };
        setImageData((prevImageData) => [...prevImageData, uploadedImage]);
      };
      reader.readAsDataURL(file);
    }
  };

  const selectedItemCount = selectedImages.length;

  return (
    <div className="bg-white ">
      <div className="flex justify-between p-6 border-b-[1px]">
        {selectedItemCount > 0 ? (
          <p className="text-gray-600 font-semibold">
            {" "}
            Selected items : {selectedItemCount}{" "}
          </p>
        ) : (
          <p className="text-gray-600 font-semibold"> Gallery</p>
        )}
        <button onClick={deleteSelectedImages} className="text-gray-600">Delete Selected Images</button>
      </div>

      <div className="p-10">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div
                className="image-gallery"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {imageData.map((image, index) => (
                  <Draggable
                    key={image.id}
                    draggableId={image.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className={`image ${
                          index === 0 ? "feature-image" : ""
                        }`}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <input
                          type="checkbox"
                          className="check"
                          checked={selectedImages.includes(image.id)}
                          onChange={() => toggleImageSelection(image.id)}
                        />
                        <img
                          onClick={() => toggleImageSelection(image.id)}
                          src={image.src}
                          alt={image.alt}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                 <input
                    type="file"
                    accept="image/*"
                    id="image-upload"
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                  />

                <label
                  htmlFor="image-upload"
                  className="upload-button text-black upload"
                >
                  Upload Image
                </label>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
