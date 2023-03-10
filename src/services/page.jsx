import { BuilderComponent, builder, useIsPreviewing } from '@builder.io/react';
import React, { useEffect, useState } from "react";

// Put your API key here
builder.init('9b86be576e034c97a70d1e3466dd4eb1')

// set whether you're using the Visual Editor,
// whether there are changes,
// and render the content if found
export default function CatchAllRoute() {
  const isPreviewingInBuilder = useIsPreviewing();
  const [notFound, setNotFound] = useState(false);
  const [content, setContent] = useState(null);

  // get the page content from Builder
  useEffect( () => {
    async function fetchContent() {
      const content = await builder.get('page', {
        url: window.location.pathname
      }).promise();

      setContent(content);
      setNotFound(!content);
    }
    fetchContent();
  }, []);
  // if no page is found, return a 404 page
  if (notFound && !isPreviewingInBuilder) {
    return <div>Not Found 404 Error</div>
  }

  // return the page when found
  return (
    <>
      {/* Render the Builder page */}
      <BuilderComponent model="page" content={content} />
    </>
  );
}