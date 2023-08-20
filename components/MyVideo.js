const MyVideo = ({ videoURL }) => {
  return (
    <figure>
      <iframe
        src="PATH-TO-VIDEO"
        width="auto"
        frameborder="0"
        allowfullscreen></iframe>
      <figcaption>Caption Text</figcaption>
    </figure>
  );
};

export default MyVideo;
