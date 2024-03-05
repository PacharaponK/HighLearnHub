import React, { useEffect, useState } from "react";
import ax from "../conf/ax";
import conf from "../conf/main";
import Navbar from "../components/Navbar";
import { Modal, ModalBody } from "flowbite-react";
import toast, { Toaster } from "react-hot-toast";
import { ContextProvider } from "../context/Auth.context";
import { CircularProgress } from "@mui/material";


export default function ApprovePaymentPage() {
  const [coursebooked, setCoursebooked] = useState([]);
  const [paymentSlip, setPaymentSlip] = useState(null);
  const [showmodal, setShowmodal] = useState(false);
  const [confirmationUrl, setConfirmationUrl] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await ax.get(
        conf.apiUrlPrefix +
        "/orders?populate[confirmation][populate]=*&populate[bookings][filters][payment_status][$eq]=false&populate[bookings][populate][course][populate]=image&populate=user"
      );
      setCoursebooked(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Data:", error);
    }
  };

  const calculateTotalPrice = (price) => {
    let totalPrice = 0;

    price.data.forEach((pricebooking) => {
      const pricecourse = pricebooking.attributes.course.data.attributes.price
      const discountcourse = pricebooking.attributes.course.data.attributes.discount
      if (pricebooking.attributes.course.data.attributes.discount === 1){
        totalPrice += pricecourse
      }
      else{
        totalPrice += Math.round(pricecourse*((100-discountcourse)/100))
      }
      });

    return totalPrice.toLocaleString();
  };

  const updateAmount = async (courseData) => {
    const courseIds = courseData.data.map(item => ({
      id: item.attributes.course.data?.id
    }))
    try {
      for (const chooseId of courseIds) {
        await ax.put(conf.apiUrlPrefix + `/amount/${chooseId.id}`);
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  }

  const approvePayment = async (bookingIds, orderIds) => {
    try {
      for (const booking of bookingIds.data) {
        await ax.put(conf.apiUrlPrefix + `/bookings/${booking.id}`, {
          data: {
            "payment_status": true,
            "status": "success"
          }
        });
      }
      await DeletePayment(orderIds)
      toast.success("ยืนยันการชำระเงินสำเร็จ!");


    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };


  const DeletePayment = async (ordersId, bookingIds) => {
    try {
      setLoading(true);
      await ax.delete(conf.apiUrlPrefix + `/orders/${ordersId}`
      );
      for (const booking of bookingIds.data) {
        await ax.put(conf.apiUrlPrefix + `/bookings/${booking.id}`, {
          data: {
            "status": "cart"
          }
        });
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
    } finally {
      fetchData();
    }
  };

  return (
    <>
      <ContextProvider>
        {loading ?
          <div className="background-image">
            <div className="h-screen flex justify-center items-center">
              <CircularProgress />
            </div>
          </div>
          :
          <div className="background-image">
            <Navbar />
            <div className="h-screen pt-24 relative overflow-x-auto shadow-md sm:rounded-lg px-6">
              <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        User name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Product name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Slip
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {coursebooked?.map((item) => (
                      <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <td className="px-6 py-4">{item.attributes.user.data.attributes.username}</td>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {item.attributes.bookings?.data.map((booking) => (
                            <div key={booking?.id}>{booking?.attributes.course?.data?.attributes?.title}</div>
                          ))}

                        </td>
                        <td className="px-6 py-4">
                          {new Date(item.attributes.payment_date).toLocaleString('en-US', {
                            timeZone: 'UTC',
                            day: 'numeric',
                            month: 'numeric',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: false
                          })}
                        </td>
                        <td className="px-6 py-4">{calculateTotalPrice(item.attributes.bookings)}</td>
                        <td className="px-6 py-4">
                          <button className="font-medium text-blue-600 dark:text-red-500 hover:underline"
                            onClick={() => [setShowmodal(true), setConfirmationUrl(item.attributes.confirmation.data.attributes.url)]}>
                            View Slip
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <button className="font-medium text-red-600 dark:text-red-500 hover:underline"
                            onClick={() => DeletePayment(item.id, item.attributes.bookings, item.id)}
                          >
                            delete
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          {console.log(item.attributes.bookings.data)}
                          <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            onClick={() => [approvePayment(item.attributes.bookings, item.id), updateAmount(item.attributes.bookings)]}>Approve</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {console.log(coursebooked)}
                {coursebooked.map(item => (
                  <Modal show={showmodal} onClose={() => setShowmodal(false)}>
                    <Modal.Header>Confirmation</Modal.Header>
                    <ModalBody><div>
                      <img
                        className=" w-full  "
                        src={"http://localhost:1337" + confirmationUrl}
                        alt=""
                      />
                    </div></ModalBody>
                  </Modal>))}
              </div>
            </div>
          </div>}
      </ContextProvider>
    </>
  );
}