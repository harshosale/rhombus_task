export const Uploader = ({
  setUploaderData,
  uploadCsv,
  loading,
  setShowUploader,
  uploaderData,
  setLoading,
}) => {
  return (
    <div className="Column">
      <input
        className="Spacing"
        type="text"
        placeholder="Enter File Name..."
        name="name"
        required
        onChange={(e) =>
          setUploaderData((p) => {
            return { ...p, name: e.target.value };
          })
        }
      />
      <input
        className="Spacing"
        type="file"
        name="data"
        required
        onChange={(e) =>
          setUploaderData((p) => {
            return { ...p, data: e.target.files[0] };
          })
        }
      />
      <button
        className="Spacing"
        disabled={loading}
        onClick={async () => {
          await uploadCsv({
            uploadData: uploaderData,
            setLoading,
          }).then((r) => setShowUploader(false));
        }}
      >
        Submit
      </button>
    </div>
  );
};
