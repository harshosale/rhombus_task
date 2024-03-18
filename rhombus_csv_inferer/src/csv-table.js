import { deleteCsv, processCsv } from "./apis";

export const CsvTable = ({ data, setCsv, setShowDataTypes, dataUpdater }) => {
  return (
    <>
      <div className="Row">
        <div className="Item Spacing">ID</div>
        <div className="Item Spacing">NAME</div>
        <div className="Item Spacing">STATUS</div>
        <div className="Item Spacing">ACTIONS</div>
      </div>
      {data.map((d) => {
        return (
          <div key={d.id} className="Row Border">
            <div className="Item Spacing">{d.id}</div>
            <div className="Item Spacing">{d.name}</div>
            <div className="Item Spacing">{d.status}</div>
            <div className="Item Spacing">
              <button
                className="Spacing"
                onClick={() => {
                  setShowDataTypes(true);
                  setCsv(d);
                }}
              >
                View
              </button>
              <button
                className="Spacing"
                onClick={() => {
                  processCsv({ id: d.id }).then((r) =>
                    r ? dataUpdater() : null
                  );
                }}
              >
                Process
              </button>
              <button
                className="Spacing"
                onClick={() => {
                  deleteCsv({ id: d.id }).then((r) =>
                    r ? dataUpdater() : null
                  );
                }}
              >
                delete
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};
