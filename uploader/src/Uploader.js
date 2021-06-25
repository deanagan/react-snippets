import React, { useEffect, useState, useRef } from 'react'
import { FilePond, registerPlugin } from 'react-filepond'

import 'filepond/dist/filepond.min.css'

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)


export const Uploader = () => {
    const [files, setFiles] = useState([]);
    const [ids, setId] = useState([]);
    const filePondRef = useRef(null);

    const loadExisting = () => {
      console.log("Load existing images from the server");
    }

    useEffect(()=> console.log(ids), [ids]);
    const onLoad = (res) => {
      const newId = JSON.parse(res)[0].id;
      setId(currentIds => [...currentIds, newId]);
      return newId;
    }

    return (
      <div className="Uploader">
        <FilePond
          files={files}
          ref={filePondRef}
          allowReorder={true}
          allowMultiple={true}
          server = {{
            process: {
              url: "http://localhost:1337/upload",
              onload:onLoad,
              allowRevert: true
            },
            revert: (fileId, revertFn, file) => {
                // TODO: Use axios to delete file ourselves with the supplied fileId.
                console.log(fileId);
                revertFn(); // Remove from filepond
              }
            }}

          // TODO: Set to false and allow button click to submit
          instantUpload={true}
          allowRevert={true}
          maxFiles={3}
          onupdatefiles={setFiles}
          onload={onLoad}
          oninit={ () => loadExisting() }
          name="files"
          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        />
      </div>
    );
}