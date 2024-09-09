import "./App.css";
import "@ag-grid-community/styles/ag-grid.css";
import { AgGridReact } from "@ag-grid-community/react";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { useState } from "react";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

function NewItemRowRenderer(props) {
  return <div>New {props.text}</div>;
}

function Grid() {
  const [text, setText] = useState("Item");
  const gridOptions = {
    columnDefs: [{field: "id"}],
    components: {
      fullWidthRowRenderer: NewItemRowRenderer,
    },
    fullWidthCellRenderer: "fullWidthRowRenderer",
    fullWidthCellRendererParams: {
      text,
    },
    isFullWidthRow:   (params) => params.rowNode.data.id == null,
    getRowHeight: () => 30,
  };
  return (
    <div>
      {text}s:
      <hr/>
      [Grid using gridOptions]
      <div
        className="ag-theme-quartz" // applying the Data Grid theme
        style={{ height: 200 }} // the Data Grid will fill the size of the parent container
      >
        <AgGridReact gridOptions={gridOptions} rowData={[{id: 1}, {id: 2}, {id: null}]} />
      </div>
      [Grid using gridOptions and fullWidthCellRendererParams prop]
      <div
        className="ag-theme-quartz" // applying the Data Grid theme
        style={{ height: 200 }} // the Data Grid will fill the size of the parent container
      >
        <AgGridReact gridOptions={gridOptions} rowData={[{id: 1}, {id: 2}, {id: null}]} fullWidthCellRendererParams={{text}} />
      </div>
      <button onClick={() => setText("Gadget")}>
        Change "Item" to "Gadget" in title and "New Item" row via grid
      </button>
    </div>
  );
}

const App = () => {
  return <Grid />;
};

export default App;
