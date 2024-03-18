import { valuePreProcessors } from "./valuePreProcessors";

export const DataTypeViewer = ({ data_types, setCsv }) => {
  return (
    <>
      <div className="Row">
        <div className="Item Spacing">FIELD</div>
        <div className="Item Spacing">DEFAULT TYPE</div>
        <div className="Item Spacing">PROCESSED TYPE</div>
      </div>
      {data_types.map((d, ind) => {
        return (
          <div key={d[0]} className="Row Border">
            <div className="Item Spacing">{d[0]}</div>
            <div className="Item Spacing">{valuePreProcessors(d[1])}</div>
            <div className="Item Spacing">
              <select
                name="cars"
                id="cars"
                onChange={(e) => {
                  let selected_field = data_types.slice(ind, ind + 1)[0];
                  selected_field[2] = e.target.value;
                  setCsv((p) => {
                    return {
                      ...p,
                      data_type: data_types
                        .slice(0, ind)
                        .concat([selected_field])
                        .concat(data_types.slice(ind + 1, data_types.length)),
                    };
                  });
                }}
                defaultValue={d[2]}
              >
                {["category", "float64", "datetime64[ns]"].map((type) => (
                  <option value={type}>{valuePreProcessors(type)}</option>
                ))}
              </select>
            </div>
          </div>
        );
      })}
    </>
  );
};
