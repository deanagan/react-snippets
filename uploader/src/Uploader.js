import React, { useState } from 'react'
import { FilePond, registerPlugin } from 'react-filepond'

import 'filepond/dist/filepond.min.css'

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)


export const Uploader = () => {
    const [files, setFiles] = useState([]);
    const loadExisting = () => {
      console.log("Load existing images from the server");
    }
    const onDeleteImage = (err, file) => {
      console.log("Deleting image", err, file)
    }
    const onRevert = (uniqueFileId, load, error) => {
      console.log(uniqueFileId, load, error)
      console.log("on");
      load();
    }

    const onLoad = (res) => {
      console.log(res);
    }

    return (
      <div className="Uploader">
        <FilePond
          files={files}
          allowReorder={true}
          allowMultiple={false}
          server = {{
            process: {
              url: "http://localhost:1337/upload",
              onload:onLoad
            }
          }}
          // TODO: Set to false and allow button click to submit
          instantUpload={true}
          maxFiles={1}
          onupdatefiles={(setFiles)}
          onload={onLoad}
          revert={onDeleteImage}
          oninit={ () => loadExisting() }
          // server="http://localhost:1337/upload"
          remove={onRevert}
          name="files"
          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        />
      </div>
    );
}