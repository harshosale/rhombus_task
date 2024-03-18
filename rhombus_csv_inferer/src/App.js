import { useEffect, useState } from "react";
import "./App.css";
import { customizeCsv, getCsvs, uploadCsv } from "./apis";
import { Uploader } from "./uploader";
import { DataTypeViewer } from "./data-type-view";
import { CsvTable } from "./csv-table";
import { UploadIcon } from "./upload-icon";

function App() {
  const [data, setData] = useState([]);
  const [showUploader, setShowUploader] = useState(false);
  const [uploaderData, setUploaderData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showDataTypes, setShowDataTypes] = useState(false);
  const [csv, setCsv] = useState({});

  const dataUpdater = async () => {
    setData(await getCsvs());
  };

  useEffect(() => {
    dataUpdater();
  }, [showUploader]);

  return (
    <div className="Container">
      <div className="Row NavBar">
        <div>Rhombus CSV Inferer</div>

        <div>
          {showUploader || showDataTypes ? (
            <p>
              {showDataTypes && (
                <span className="Spacing">
                  <button
                    onClick={() => {
                      customizeCsv({
                        id: csv.id,
                        customizedTypes: csv.data_type,
                      }).then((r) => setShowDataTypes(false));
                    }}
                  >
                    Update
                  </button>
                </span>
              )}
              <span
                className="Uploader"
                onClick={() => {
                  setShowUploader(false);
                  setShowDataTypes(false);
                }}
              >
                X
              </span>
            </p>
          ) : (
            <UploadIcon setShowUploader={setShowUploader} />
          )}
        </div>
      </div>

      {showUploader || showDataTypes ? (
        showUploader ? (
          <Uploader
            setUploaderData={setUploaderData}
            uploadCsv={uploadCsv}
            loading={loading}
            setShowUploader={setShowUploader}
            uploaderData={uploaderData}
            setLoading={setLoading}
          />
        ) : (
          <DataTypeViewer
            data_types={
              Object.keys(csv.data_type).length == 0 ? [] : csv.data_type
            }
            setCsv={setCsv}
          />
        )
      ) : (
        <CsvTable
          data={data}
          setCsv={setCsv}
          setShowDataTypes={setShowDataTypes}
          dataUpdater={dataUpdater}
        />
      )}
    </div>
  );
}

export default App;
