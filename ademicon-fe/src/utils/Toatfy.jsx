import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Toastify({ text, type }) {
  if (type === "success") {
    toast.success(text, {
      position: toast.POSITION.TOP_CENTER
    });
  } else if (type === "error") {
    toast.error(text, {
      position: toast.POSITION.TOP_CENTER
    });
  }

  return (
    <div>
      <ToastContainer />
    </div>
  );
}

export default Toastify;
