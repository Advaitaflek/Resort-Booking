import { useState, useEffect } from "react";
import Axios from "axios";
import NavBar from "../components/login_page/NavBar";
import BookedItem from "../components/profilepage/BookedItem";
import Hotel from "../components/profilepage/assets/hotel_book.png";
import Review from "../components/profilepage/review";
import { Tabs } from "antd";
import FoodImgBg from "../components/FoodService/foodimagebg";
import Profile_IMG from "../components/profilepage/profile_img";
import cab_book from "../components/profilepage/assets/cab_book.png";
import food_book from "../components/profilepage/assets/food_book.png";
import { useNavigate, useLocation } from "react-router-dom";
import Foodbelowpage from "../components/FoodService/foodpagebelow";

const Profile = () => {
  const navigate = useNavigate();

  const location = useLocation();

  var { guest_id } = location.state || {};
  if (location.state === undefined) {
    guest_id = 0;
  }
  console.log(location.state);
  // remove this in future

  const [bookingDetails, setBookingDetails] = useState([]);
  const [cabbook, setcabbook] = useState([]);
  const [foodbook, setfoodbook] = useState([]);
  const [guestname, setguestname] = useState([]);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (guest_id != 0) {
        try {
          const response = await Axios.post(
            "http://localhost:5000/bookingdetails",
            {
              Guestid: guest_id, // Assuming Guestid is hardcoded here
            }
          );
          setBookingDetails(response.data);
        } catch (error) {
          console.error("Error fetching booking details:", error);
        }
      }

      fetchBookingDetails();
    };
  }, []);

  useEffect(() => {
    if (guest_id != 0) {
      const fetchBookingDetails = async () => {
        try {
          const response = await Axios.post("http://localhost:5000/cabbook", {
            Guestid: guest_id, // Assuming Guestid is hardcoded here
          });
          setcabbook(response.data);
        } catch (error) {
          console.error("Error fetching booking details:", error);
        }
      };

      fetchBookingDetails();
    }
  }, []);

  useEffect(() => {
    if (guest_id != 0) {
      const fetchBookingDetails = async () => {
        try {
          const response = await Axios.post("http://localhost:5000/foodbook", {
            Guestid: guest_id, // Assuming Guestid is hardcoded here
          });
          setfoodbook(response.data);
        } catch (error) {
          console.error("Error fetching booking details:", error);
        }
      };

      fetchBookingDetails();
    }
  }, []);

  useEffect(() => {
    if (guest_id != 0) {
      const fetchBookingDetails = async () => {
        try {
          const response = await Axios.post("http://localhost:5000/getuser", {
            Guestid: guest_id, // Assuming Guestid is hardcoded here
          });
          setguestname(response.data[0]);
          // Log the response data here
        } catch (error) {
          console.error("Error fetching booking details:", error);
        }
      };

      fetchBookingDetails();
    } else {
      setguestname({ name: "Please Login" });
    }
  }, []);

  const pageStyle = {
    backgroundColor: "white", // Set your desired background color here
    minHeight: "100vh", // Ensure the background covers the entire viewport height
  };
  const mstyle = {
    margin: "20px", // Set your desired background color here
    // Ensure the background covers the entire viewport height
  };

  return (
    <>
      <NavBar />
      <FoodImgBg />
      <div style={pageStyle}>
        <Profile_IMG name={guestname ? guestname.name : ""} />
        <div className="tab">
          <Tabs>
            <Tabs.TabPane tab="Rooms" key="Rooms" style={mstyle}>
              <div>
                <div className="book_page">
                  <div className="bookings_page">
                    {bookingDetails.map((booking) => (
                      <BookedItem
                        key={booking.reservation_id}
                        title={"Hotel Room"}
                        desc={"Room No:     " + booking.room_number}
                        img={Hotel}
                        price={"$" + booking.total_price}
                        indate={
                          "Check In	" +
                          new Date(booking.check_in_date)
                            .toISOString()
                            .split("T")[0]
                        }
                        outdate={
                          "Check Out	 " +
                          new Date(booking.check_out_date)
                            .toISOString()
                            .split("T")[0]
                        }
                      />
                    ))}
                  </div>
                  <Review guest={guest_id} />
                </div>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Cab" key="Cab">
              <div>
                <div className="book_page">
                  <div className="bookings_page">
                    {cabbook.map((cab) => (
                      <BookedItem
                        title="Cab Service"
                        desc={
                          cab.destination_from + " To " + cab.destination_to
                        }
                        img={cab_book}
                        price={"$" + cab.price}
                      ></BookedItem>
                    ))}
                  </div>
                  <Review guest={guest_id} />
                </div>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Food" key="Food">
              <div>
                <div className="book_page">
                  <div className="bookings_page">
                    {foodbook.map((food) => (
                      <BookedItem
                        title={"" + food.type}
                        desc={"You Ordered " + food.count}
                        img={food_book}
                        price={"$" + food.price}
                      ></BookedItem>
                    ))}
                  </div>
                  <Review guest={guest_id} />
                </div>
              </div>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Profile;
