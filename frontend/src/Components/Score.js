// This component renders musical notation using the VexFlow library, 

import React, { useRef, useEffect } from 'react';
import VexFlow from 'vexflow';


const VF = VexFlow.Flow;
const { Renderer, Stave, StaveNote, Formatter } = VF;

// Set constant width for clef and time signature
const clefAndTimeWidth = 60;

export function Score({ staves = [], clef = 'treble', timeSignature = '4/4', width = 1500, height = 150 }) {
  const container = useRef();// useRef to hold the container
  const rendererRef = useRef();// manages the VexFlow Renderer instance

 // useEffect hook to handles rendering logic

  useEffect(() => {
    const initializeRenderer = () => {
   // Initialises the VexFlow Renderer with the current container and SVG backend

      rendererRef.current = new Renderer(container.current, Renderer.Backends.SVG);
    };
// Conditionally initialises the renderer if it hasn't been initialised
    if (!rendererRef.current) {
      initializeRenderer();
    }

    const renderer = rendererRef.current;
    // Resise the renderer based on provided width and height
    renderer.resize(width, height);

    // Get the drawing context from the renderer
    const context = renderer.getContext();
    // Sets default font and background style
    context.setFont('Arial', 10, '').setBackgroundFillStyle('#eed');

   // Calculate the width for each stave
    const staveWidth = (width - clefAndTimeWidth) / staves.length;
    // Variable to keep track of the current horizontal position for staves
    let currX = 0;

    // Iterate over each stave configuration in the staves array

    staves.forEach((notes, i) => {
      // Create a new Stave instance
      const stave = new Stave(currX, 0, staveWidth);


     // Add clef and time signature to the first stave only
      if (i === 0) {
        stave.setWidth(staveWidth + clefAndTimeWidth);
        stave.addClef(clef).addTimeSignature(timeSignature);
      }

      currX += stave.getWidth();// Update currX to the end of the current stave
      stave.setContext(context).draw(); // Set the context for the stave and draw it

     // Process notes to ensure correct formatting before creating StaveNote instances

      const processedNotes = notes.map(note => (
        typeof note === 'string' ? { key: note } : (Array.isArray(note) ? { key: note[0], duration: note[1] } : note)
      )).map(({ key, ...rest }) => (
        typeof key === 'string' ? { key: key.includes('/') ? key : `${key[0]}/${key.slice(1)}`, ...rest } : rest
      )).map(({ key, keys, duration = 'q' }) => (
        new StaveNote({
          keys: key ? [key] : keys,
          duration: String(duration),
        })
      ));

      Formatter.FormatAndDraw(context, stave, processedNotes, { auto_beam: true });
    });
  }, [staves, clef, timeSignature, width, height]);

  return <div ref={container} style={{ marginLeft: '10px' }} />;
}

