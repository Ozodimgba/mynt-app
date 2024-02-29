import React from 'react';
import { useFormik } from 'formik';
import ReceiptDesigner from '../components/Layout';
import { useEdgeStore } from '../../lib/edgestore';
import * as Yup from 'yup';
import axios from 'axios';

const MyFormComponent = () => {
  // Define the form validation schema using Yup
  const [file, setFile] = React.useState<File>();

  const { edgestore } = useEdgeStore();

  const validationSchema = Yup.object({
    // Define your form fields and their validation rules
    name: Yup.string().required('Name is required'),
    symbol: Yup.string().required('Symbol is required'),
    description: Yup.string()
    // Add more fields as needed
  });

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      name: '',
      symbol: '',
      description: '',
      image: ''
      // Initialize other fields here
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      //setLoading state
      
      if (file) {
        const res = await edgestore.publicFiles.upload({
          file,
          // onProgressChange: (progress) => {
          //   // you can use this to show a progress bar
          //   console.log(progress);
          // },
        });
        // you can run some server action or api here
        // to add the necessary data to your database
        await formik.setFieldValue("image", res.url)
        //  console.log('Form values:', values);

        if(res.url) {
          axios.post('/api/createCollection', values)
            .then(response => {
            // Handle successful response
            //set toast
            console.log(response.data); 
          })
          .catch(error => {
           // Handle error
           console.error(error);
           });
        }
      }
    },
  });

  const handleImageChange = (event: any) => {
    //convert to url code goes here
    setFile(event.currentTarget.files[0])
    // formik.setFieldValue("image", event.currentTarget.files[0]);
  };

  return (
    <main className=' py-[10%] w-full overflow-hidden flex justify-center bg-white'>

    <form onSubmit={formik.handleSubmit}>
    <h2 className="text-2xl text-[#4642f0] font-main font-semibold leading-7">Create an Invoice</h2>
      <p className="mt-1 font-main text-md leading-6 text-gray-600">Invoice collections allow you the compartmentalize all the types of <br/> collections you manage </p>
      
      <div className='font-main mt-5 flex flex-col'>
      <label htmlFor="firstName" className='font-semibold text-[#4642f0]'>Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className='border-[2px] rounded-xl border-[#4642f0]'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <div>{formik.errors.name}</div>
        ) : null}
      </div>

      <div className='font-main mt-5 flex flex-col'>
        <label htmlFor="symbol" className='font-semibold text-[#4642f0]'>Symbol</label>
        <input
          type="text"
          id="symbol"
          name="symbol"
          className='border-[2px] rounded-xl border-[#4642f0]'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.symbol}
        />
        {formik.touched.symbol && formik.errors.symbol ? (
          <div>{formik.errors.symbol}</div>
        ) : null}
      </div>

           <div className='h-[50%] font-main mt-5'>
       <h3 className='font-semibold text-[#4642f0] py-3'>Designing your receipt</h3>       
       <div className='border-[2px] h-full border-[#4642f0]'>
       <ReceiptDesigner />
        </div>
     </div>

      
      <div className='font-main mt-16 flex flex-col'>
        <label htmlFor="image" className='font-semibold text-[#4642f0]'>Image</label>
        <div className='border-[2px] rounded-xl p-2 border-[#4642f0]'>
          
        <input
        id="image"
        name="image"
        type="file"
        onChange={handleImageChange}
      />
      {formik.errors.image && <div className="error">{formik.errors.image}</div>}
        </div>
        {formik.touched.image && formik.errors.image && (
          <div className="error text-red-600">{formik.errors.image}</div>
        )}
      </div>

      <div className='font-main mt-5 flex flex-col'>
        <label htmlFor="description" className='font-semibold text-[#4642f0]'>Description</label>
        <input
          type="text"
          id="description"
          name="description"
          className='border-[2px] rounded-xl border-[#4642f0]'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
        {formik.touched.description && formik.errors.description ? (
          <div>{formik.errors.description}</div>
        ) : null}
      </div>

      {/* Submit button */}
      <div>
      <button type="submit" className='bg-[#4642f0] mt-6 text-[#fbd0ff] font-main font-medium px-4 rounded-2xl py-3'>Mint your collection</button>
      </div>
    </form>
    </main>
  );
};

export default MyFormComponent;








// import React from 'react';
// import { useFormik } from 'formik';
// import InvoiceDesigner from '../components/InvoiceDesigner';
// import ReceiptDesigner from '../components/Layout';
// import * as Yup from 'yup';

// const CreateCollection = () => {
//   const formik = useFormik({
//     initialValues: {
//       firstName: '',
//       symbol: '',
//       address: '',
//       image: null,
//       password: '',
//       description: ''
//     },
//     validationSchema: Yup.object({
//       firstName: Yup.string().required('Invoice name is required'),
//       symbol: Yup.string().required('Symbols are required because these receipts can be traded'),
//       password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
//       image: Yup.mixed().required('Image is required'),
//     }),
//     onSubmit: (values) => {
//       // Handle form submission logic here
//       console.log('Form values:', values); // Log the form values
//     console.log('Form errors:', formik.errors); // Log any formik errors
//     console.log('Form touched:', formik.touched); // Log the touched fields
//     },
//   });

//   // Function to display image preview (optional)
  // const handleImageChange = (event: any) => {
  //   formik.setFieldValue("image", event.currentTarget.files[0]);
  // };

  
  

//   return (
//     <main className=' py-[10%] w-full overflow-hidden flex justify-center bg-white'>
//     <form onSubmit={formik.handleSubmit}>

    // <h2 className="text-2xl text-[#4642f0] font-main font-semibold leading-7">Create an Invoice</h2>
    //   <p className="mt-1 font-main text-md leading-6 text-gray-600">Invoice collections allow you the compartmentalize all the types of <br/> collections you manage </p>

//       <div className='font-main mt-5 flex flex-col'>
//         <label htmlFor="firstName" className='font-semibold text-[#4642f0]'>Name</label>
//         <input
//           type="text"
//           id="firstName"
//           name="firstName"
//           className='border-[2px] rounded-xl border-[#4642f0]'
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.firstName}
//         />
//         {formik.touched.firstName && formik.errors.firstName && (
//           <div className="error text-red-600">{formik.errors.firstName}</div>
//         )}
//       </div>

//       <div className='font-main mt-5 flex flex-col'>
//         <label htmlFor="symbol" className='font-semibold text-[#4642f0]'>Symbol</label>
//         <input
//           type="text"
//           id="symbol"
//           name="symbol"
//           className='border-[2px] rounded-xl border-[#4642f0]'
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.symbol}
//         />
//         {formik.touched.symbol && formik.errors.symbol && (
//           <div className="error text-red-600">{formik.errors.symbol}</div>
//         )}
//       </div>

//       <div className='h-[50%] font-main mt-5'>
//        <h3 className='font-semibold text-[#4642f0] py-3'>Designing your receipt</h3>
//        <div className='border-[2px] h-full border-[#4642f0]'>
//        <ReceiptDesigner />
//        </div>
//       </div>

      //  <div className='font-main mt-16 flex flex-col'>
      //   <label htmlFor="image" className='font-semibold text-[#4642f0]'>Image</label>
      //   <div className='border-[2px] rounded-xl p-2 border-[#4642f0]'>
          
      //   <input
      //   id="image"
      //   name="image"
      //   type="file"
      //   onChange={handleImageChange}
      // />
      // {formik.errors.image && <div className="error">{formik.errors.image}</div>}
      //   </div>
      //   {formik.touched.image && formik.errors.image && (
      //     <div className="error text-red-600">{formik.errors.image}</div>
      //   )}
      // </div>

//       <div className='font-main mt-5 flex flex-col'>
//         <label htmlFor="address" className='font-semibold text-[#4642f0]'>Description</label>
//         <textarea
//           id="address"
//           name="address"
//           className='border-[2px] rounded-xl border-[#4642f0]'
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.address}
//         />
//         {formik.touched.address && formik.errors.address && (
//           <div className="error">{formik.errors.address}</div>
//         )}
//       </div>
//       <button type="submit" className='bg-[#4642f0] mt-6 text-[#fbd0ff] font-main font-medium px-4 rounded-2xl py-3'>Mint your collection</button>
//     </form>
//     </main>
//   );
// };

// export default CreateCollection;
