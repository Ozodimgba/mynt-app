const MyFileInput = ({ field, form, ...props }) => {
    const [preview, setPreview] = React.useState(null); // State for image preview
  
    const handleChange = (event) => {
      const file = event.target.files[0];
      field.onChange(file); // Update formik field value
  
      // Preview image (optional)
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target.result);
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    };
  
    return (
      <div>
        <input {...field} {...props} type="file" onChange={handleChange} />
        {preview && <img src={preview} alt="Preview" />}
      </div>
    );
  };
  