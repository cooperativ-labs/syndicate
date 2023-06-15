import React from 'react';
import toast from 'react-hot-toast';

export const toastExperiment = ({ title, message }: { title: string; message: string }) => {
  toast(
    (t) => (
      <div className="flex w-64 pl-3 items-center ">
        👏
        <div className="flex flex-grow p-3">
          <div className="text-gray-900 font-medium text-sm">{title}</div>
          <div className="text-gray-900 text-sm">{message}</div>
        </div>
        <button className="border-l-2 p-0  border-gray-500 px-4 text-green-800" onClick={() => toast.dismiss(t.id)}>
          Dismiss
        </button>
      </div>
    ),
    {
      position: 'top-center',
      style: { borderRadius: '10px', padding: '0px' },
      duration: 50000,
      // style: { borderRadius: '0px', background: '#333', color: '#fff' },
    }
  );
};
