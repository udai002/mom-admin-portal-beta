import React from 'react';

const UserFeedbackTable = () => {
  const feedbackData = [
    {
      id: 1,
      orderId: 'ORD123',
      name: 'Ramesh Kumar',
      email: 'ramesh.kumar@gmail.com',
      date: '2025-06-07',
      type: 'Technical',
      feedback: 'App crashes when placing an order after selecting an address.',
    },
    {
      id: 2,
      orderId: 'ORD456',
      name: 'Neha Verma',
      email: 'neha.verma21@outlook.com',
      date: '2025-06-08',
      type: 'Non-Technical',
      feedback: 'The UI is clean but the navigation is slightly confusing.',
    },
    {
      id: 3,
      orderId: 'ORD234',
      name: 'Varun Kumar',
      email: 'varun@gmail.com',
      date: '2024-06-08',
      type: 'Technical',
      feedback: 'While entering the correct OTP, it is saying invalid OTP.',
    },
    {
      id: 4,
      orderId: 'ORD134',
      name: 'Varun Kumar',
      email: 'varun@gmail.com',
      date: '2024-06-08',
      type: 'Technical',
      feedback: 'While entering the correct OTP, it is saying invalid OTP.',
    },
    {
      id: 5,
      orderId: 'ORD224',
      name: 'Varun Kumar',
      email: 'varun@gmail.com',
      date: '2024-06-08',
      type: 'Non-Technical',
      feedback: 'While entering the correct OTP, it is saying invalid OTP.',
    },
  ];

  return (
    <div className="p-6 bg-[#fff] min-h-screen">
      <div className="bg-[#00A99D] text-white text-center rounded-md py-6 text-xl font-semibold shadow-md">
        See What Our Users Are Saying
      </div>
      <div className="mt-8 pl-60">
        <table className="min-w-1/2 border-2 border-[#00A99D] rounded-3xl overflow-hidden bg-[#00A99D]">
          <thead className="bg-[#C2ECE8] text-[#333]">
            <tr>
              <th className="border px-4 py-2 text-left">S.No</th>
              <th className="border px-4 py-2 text-left">Order-ID</th>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Email</th>
              <th className="border px-4 py-2 text-left">Date</th>
              <th className="border px-4 py-2 text-left">Issue / Feedback</th>
            </tr>
          </thead>
          <tbody className="bg-[#E0F5F3] text-sm">
            {feedbackData.map((item, index) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{item.orderId}</td>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.email}</td>
                <td className="border px-4 py-2">{item.date}</td>
                <td className="border px-4 py-2">{item.feedback}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserFeedbackTable;
