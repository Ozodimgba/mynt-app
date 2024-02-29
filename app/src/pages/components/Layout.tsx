import React, { useState, useRef } from 'react';
import { fabric } from 'fabric';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';

const ReceiptDesigner = () => {
  const { editor, onReady } = useFabricJSEditor({
    defaultFillColor: "#000000"
  });
  const dropRef = useRef(null);

  const handleDrop = (event: any) => {
    event.preventDefault();
    if (event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        fabric.Image.fromURL(e.target.result, (img) => {
          // Customize image properties (optional)
          img.scale(0.5); // Set scale to 50%
          img.set({ left: 100, top: 100 }); // Set initial position

          editor?.canvas.add(img);
        });
      };
    }

  };

  const handleDelete = () => {
    const selectedObjects = editor?.canvas.getActiveObjects();
    if (selectedObjects && selectedObjects.length > 0) {
      selectedObjects.forEach((object) => editor?.canvas.remove(object));
    } else {
      alert('Please select an object to delete');
    }
  };

  const handleAddText = () => {
    const text = 'This is sample text';
    const fontFamily = 'Open Sans'; // Replace with your desired Google Font family
    const fontOptions = {
      fontFamily: `url(https://fonts.googleapis.com/css2?family=${fontFamily}:wght@300;400;70&display=swap)`,
    };

    const textObject = new fabric.Text(text, fontOptions);
    editor?.canvas.add(textObject);
  };


  return (
    <div ref={dropRef}  onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
      
      <div style={{ height: '80vh' }}>
      <FabricJSCanvas className="sample-canvas"  onReady={onReady} />
      </div>

      <div className='flex justify-center gap-4'>
      <button onClick={handleAddText}>Add Text</button>
      <button onClick={handleDelete}>Delete Selected</button>
      </div>
    </div>
  );
};

export default ReceiptDesigner;




