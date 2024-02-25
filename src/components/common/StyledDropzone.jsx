import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

function StyledDropzone({ onDrop, preview }) {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  
  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    marginTop: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#F4F4F4",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
  };

  // const focusedStyle = {
  //   borderColor: "#2196f3",
  // };

  // const acceptStyle = {
  //   borderColor: "#00e676",
  // };

  // const rejectStyle = {
  //   borderColor: "#ff1744",
  // };

  const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  };
  
  const thumb = {
    display: 'flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
  };
  
  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  };
  
  const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
  };
  
  useEffect(() => {
    if (preview) {
      setPreviewImage(preview);
    } else {
      setPreviewImage(null);
    }
  }, [preview]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: acceptedFiles => {
      if (acceptedFiles.length > 1) {
        setError('Solo puedes subir una imagen a la vez');
        setTimeout(() => setError(''), 5000);
        return;
      }
      handleOnDrop(acceptedFiles);
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file), // Add preview URLs
      })));
    },
  });

  function handleOnDrop(acceptedFiles) {
    const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result;
        onDrop(base64Image);
      };
      reader.readAsDataURL(file);
  }

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          alt={file.preview}
          style={img}
          onLoad={() => URL.revokeObjectURL(file.preview)}
        />
      </div>
    </div>
  ));

  const thumbPreview = (
    <div className="d-flex flex-column align-items-center">
      <div style={thumb} key="previewImage">
        <div style={thumbInner}>
          <img
            src={previewImage}
            alt={previewImage}
            style={img}
            onLoad={() => URL.revokeObjectURL(previewImage)}
          />
        </div>
      </div>
      <div>
        <p>Foto Actual</p>
      </div>
    </div>
  );

  useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div className="container" style={baseStyle}>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        {isDragActive && <p>Arrastra y suelta tu imagen aquí</p>}
        {!isDragActive && <p>Haz clic para seleccionar una imagen</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      <aside style={thumbsContainer}>
        {preview && thumbPreview}
        {thumbs}
      </aside>
    </div>
  );
}

export default StyledDropzone;