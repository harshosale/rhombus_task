export const UploadIcon = ({ setShowUploader }) => {
  return (
    <img
      onClick={() => setShowUploader(true)}
      className="Uploader"
      src="upload_icon.jpeg"
      alt="upload_icon"
    />
  );
};
