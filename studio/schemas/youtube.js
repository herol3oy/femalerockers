import React from "react";
import getYoutubeID from "get-youtube-id";
import YouTube from "react-youtube";

const YouTubePreview = ({ value }) => {
  const id = getYoutubeID(value.url);
  const url = `https://www.youtube.com/embed/${id}`;

  if (!id) {
    return <div>Missing Youtube URL</div>;
  }

  return <YouTube videoId={id} />;
};

export default {
  name: "youtube",
  type: "object",
  title: "Youtube Embed",
  fields: [
    {
      name: "url",
      type: "url",
      title: "URL",
    },
  ],
  preview: {
    select: {
      url: "url",
    },
    component: YouTubePreview,
  },
};
