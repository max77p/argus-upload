import React from 'react';
import "./portalStyle.css";

function portalInput({ ...props }) {

  return (
      <div class="portal-div-input">
        <label class="btn btn-primary portal-input-file" for="my-file-selector">
          <input id="my-file-selector" type="file" style={{ display: "none" }} onChange={props.change} encType="multipart/form-data" accept=".csv"/><i class="fas fa-folder-open" /> Browse</label>
        <span class='label label-info' id="upload-file-info">{props.fileName}</span>
      </div>
  )
};


export default portalInput;
