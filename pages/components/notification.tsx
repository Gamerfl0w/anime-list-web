import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Notification({msg, isSuccess}: any){
    function show(){
        if(isSuccess){
            toast.success(msg)
        }else{
            toast.error(msg)
        }
        
    }

    useEffect(() => {
        show()
    }, [])

    return (
      <div>
        <ToastContainer position="top-right"
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark" />
      </div>
    );
}