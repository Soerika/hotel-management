import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getAllPaymentByUserId } from "../../api";
import BookingItem from "../../components/customer/BookingItem";
import UserProfile from "../../components/customer/UserProfile";
import { RxAvatar } from "react-icons/rx";
import Loading from "../../components/customer/Loading";

function CustomersDetail() {
  const location = useLocation();
  const customer = location.state;
  const [index, setIndex] = useState(1);
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    getAllPaymentByUserId(customer._id)
      .then((response) => {
        setBookings(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!bookings) {
    return <Loading></Loading>;
  }
  const totalPayed = bookings.reduce(
    (currSum, booking) => currSum + booking.price.totalPrice,
    0
  );
  return (
    <div>
      <h1 className="font-bold text-xl mt-3 ml-6">Chi tiết khách hàng</h1>
      <hr className="mt-3"></hr>
      <div className="flex justify-start items-center mt-4 ml-6">
        <RxAvatar className="w-32 h-32 rounded-full"></RxAvatar>
        <div className="ml-8">
          <span className=" font-bold text-2xl">{customer.name}</span>
          <p className=" text-lg mt-2 font-medium">
            Total payment: ${totalPayed}
          </p>
        </div>
      </div>
      <hr className="mt-3"></hr>
      <div className=" mt-5 flex justify-center items-center">
        <button
          onClick={() => setIndex(1)}
          className={`px-6 py-3 rounded-xl ${
            index === 1 && "bg-blue1 text-white"
          }`}
        >
          Hồ sơ
        </button>
        <button
          onClick={() => setIndex(2)}
          className={`px-6 py-3 ml-3 rounded-xl ${
            index === 2 && "bg-blue1 text-white shadow-xl"
          }`}
        >
          Đơn mua
        </button>
      </div>

      {index === 1 && (
        <div className="w-2/3 mx-auto mt-16 pb-16">
          <UserProfile user={customer}></UserProfile>
        </div>
      )}
      {index === 2 && (
        <div className="w-2/3 mx-auto mt-16 pb-16">
          {bookings?.length === 0 && (
            <h2 className="text-3xl font-semibold text-center">No orders!</h2>
          )}
          {bookings?.length > 0 &&
            bookings.map((booking) => (
              <Link to={`/account/bookings/${booking._id}`}>
                <BookingItem booking={booking}></BookingItem>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}

export default CustomersDetail;
