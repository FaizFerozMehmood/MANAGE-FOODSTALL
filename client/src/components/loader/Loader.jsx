import React from "react";
import { SyncLoader} from "react-spinners";

const Loader = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <SyncLoader color="black" size={15} />
    </div>
  );
};

export default Loader;