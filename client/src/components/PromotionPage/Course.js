import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Badge, Dropdown, DropdownItem, Button } from "flowbite-react";
import { HiClock } from "react-icons/hi";
import ax from "../../conf/ax";
import { FaCalendarDays } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { AuthContext, ContextProvider } from "../../context/Auth.context";

export default function Course(props) {
  const [filterType, setFilterType] = useState("All");
  const [dropdownLabel, setDropdownLabel] = useState("ทั้งหมด");
  const [visibleCourses, setVisibleCourses] = useState(8);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const navigate = useNavigate();
  const { state: ContextState } = useContext(AuthContext);
  const { user } = ContextState || {};
  const handleFilter = (type, label) => {
    if (type === "Price") {
      if (label === "0 - 99999 บาท") {
        setVisibleCourses(8);
        setFilteredCourses(
          props.data.filter(
            (course) => course.price >= 0 && course.price <= 99999
          )
        );
      } else if (label === "0 - 2000 บาท") {
        setVisibleCourses(8);
        setFilteredCourses(
          props.data.filter(
            (course) => course.price >= 0 && course.price <= 2000
          )
        );
      } else if (label === "2000 - 4000 บาท") {
        setVisibleCourses(8);
        setFilteredCourses(
          props.data.filter(
            (course) => course.price >= 2000 && course.price <= 4000
          )
        );
      }
      // สามารถเพิ่มเงื่อนไขกรองราคาตามต้องการเพิ่มเติมได้ที่นี่
    } else {
      setFilterType(type);
      setDropdownLabel(label);
    }
  };

  useEffect(() => {
    handleFilter("Price", "0 - 99999 บาท");
  }, []);

  return (
    <ContextProvider>
      <>
        <div className="relative z-0 w-full md:w-5/6 2xl:w-4/5 mx-auto h-full flex flex-wrap items-center justify-between ">
          <p className="font-medium text-2xl md:text-3xl pl-3 md:pl-0">
            คอร์สโปรโมชั่นทั้งหมด
          </p>
          <div className="flex">
            <div className="flex my-10 mr-3 md:mr-0 z-0">
              <Dropdown
                label={dropdownLabel}
                class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none rounded-full"
              >
                <DropdownItem
                  onClick={() => handleFilter("All", "ทั้งหมด")}
                  active={filterType === "All"}
                  className="flex-1"
                >
                  ทั้งหมด
                </DropdownItem>
                <DropdownItem
                  onClick={() => handleFilter("Online", "ออนไลน์")}
                  active={filterType === "Online"}
                  className="flex-1"
                >
                  ออนไลน์
                </DropdownItem>
                <DropdownItem
                  onClick={() => handleFilter("Live", "สด")}
                  active={filterType === "Live"}
                  className="flex-1"
                >
                  สด
                </DropdownItem>
              </Dropdown>
            </div>
            <div className="flex my-10 mr-3 md:mr-0 ml-3 z-9999">
              <Dropdown
                label="ราคา"
                class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none rounded-full"
              >
                <DropdownItem
                  onClick={() => handleFilter("Price", "0 - 99999 บาท")}
                  className="flex-1"
                >
                  ทั้งหมด
                </DropdownItem>
                <DropdownItem
                  onClick={() => handleFilter("Price", "0 - 2000 บาท")}
                  className="flex-1"
                >
                  0 - 2000 บาท
                </DropdownItem>
                <DropdownItem
                  onClick={() => handleFilter("Price", "2000 - 4000 บาท")}
                  className="flex-1"
                >
                  2000 - 4000 บาท
                </DropdownItem>
              </Dropdown>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-4 gap-2 md:gap-6 mr-2 md:mx-0">
            {filteredCourses.length === 0 ? (
              <div className="text-center text-gray-600 py-8">
                ไม่มีคอร์สเรียน
              </div>
            ) : (
              filteredCourses?.slice(0, visibleCourses).map((item) => (
                <div
                  key={item.id}
                  className={`hover:translate-y-[-10px] transition-transform duration-300 w-full bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 m-1 md:m-2 ${
                    filterType === "All" || item.type === filterType
                      ? "block"
                      : "hidden"
                  }`}
                >
                  {console.log(item)}
                  <Link to={`/course/${item.id}`}>
                    <img
                      className="rounded-t-lg w-full h-30 md:h-40 object-cover"
                      src={item.image}
                      alt=""
                    />
                    <div className="p-3 md:p-4 flex flex-col justify-between">
                      <p
                        className={`text-${
                          item.type === "Live" ? "red-500" : "yellow-300"
                        } text-xs mb-1`}
                      >
                        {item.type === "Live" ? "LIVE COURSE" : "ONLINE COURSE"}
                      </p>
                      <div className="h-[30px] md:h-[120px]">
                        <p className="text-sm md:text-base font-medium max-w-md">
                          {item.title}
                        </p>
                        {window.innerWidth > 900 && (
                          <p className="font-light text-sm text-gray-500 overflow-hidden h-20 mt-1">
                            {item.description}
                          </p>
                        )}
                      </div>
                      {item.type === "Live" ? (
                        <p
                          className={`my-5 mb-1 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 text-xs md:text-base ${
                            item.amount >= item.maxamount ? "text-red-500" : ""
                          }`}
                        >
                          จำนวนผู้ลงสมัคร{" "}
                          <span
                            className={`hover:underline ${
                              item.amount >= item.maxamount
                                ? "text-red-500"
                                : ""
                            }`}
                          >
                            {item.amount}/{item.maxamount}
                          </span>{" "}
                          {item.amount >= item.maxamount ? (
                            <span className="text-md  text-red-700">
                              (เต็ม)
                            </span>
                          ) : (
                            "คน"
                          )}
                        </p>
                      ) : (
                        <p className="my-5 mb-1 bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-red-500 text-xs md:text-base">
                          {window.innerWidth < 900
                            ? "ยอดสั่งซื้อ"
                            : "จำนวนยอดสั่งซื้อ"}{" "}
                          <span className="hover:underline decoration-red-500/30 ">
                            {item.amount}
                          </span>{" "}
                          คอร์ส
                        </p>
                      )}
                      <div className="flex my-1 md:my-3">
                        {item?.type === "Live" ? (
                          <Badge color="failure">LIVE</Badge>
                        ) : (
                          <Badge color="warning">ONLINE</Badge>
                        )}
                      </div>
                      <hr className="mt-1" />
                      {item.type === "Online" ? (
                        <div className="md:flex md:flex-wrap gap-2 md:justify-between ">
                          <Badge
                            color="gray"
                            icon={HiClock}
                            className="mt-2 text-[10px] md:text-xs mx-3 md:mx-0 font-normal"
                          >
                            {item.duration.minutes >= 60 && (
                              <>
                                {Math.floor(item.duration.minutes / 60)} ชั่วโมง{" "}
                                {item.duration.minutes % 60 > 0 &&
                                  `${item.duration.minutes % 60} นาที`}{" "}
                                {item.duration.seconds} วินาที
                              </>
                            )}
                            {item.duration.minutes < 60 && (
                              <>
                                {item.duration.minutes} นาที{" "}
                                {item.duration.seconds} วินาที
                              </>
                            )}
                          </Badge>
                          {item.discount !== 1 ? (
                            <p className="text-md text-center font-semibold text-red-700 sm:text-l mb-1">
                              <p className="mt-1 text-gray-500 line-through">
                                {item.price} บาท
                              </p>
                              <p className="text-red-500 font-semibold">
                                {Math.round(
                                  item.price * ((100 - item.discount) / 100)
                                )}{" "}
                                บาท
                              </p>
                            </p>
                          ) : (
                            <p className="mt-3 text-md text-center font-bold text-grey-700 sm:text-l mb-4">
                              {item.price} บาท
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className="md:flex md:flex-wrap gap-2 md:justify-between ">
                          <Badge
                            color="gray"
                            icon={FaCalendarDays}
                            className="mt-2 text-[10px] md:text-xs mx-3 md:mx-0 font-normal item"
                          >
                            {item?.date ? (
                              <>
                                {item?.date && (
                                  <span className="items-center">
                                    {item.date}
                                  </span>
                                )}
                              </>
                            ) : (
                              "ไม่ระบุวันที่"
                            )}
                          </Badge>
                          {item?.discount !== 1 ? (
                            <p className="text-md text-center font-semibold text-red-700 sm:text-l mb-1">
                              <p className="mt-1 text-gray-500 line-through">
                                {item.price} บาท
                              </p>
                              <p className="text-red-500 font-semibold">
                                {Math.round(
                                  item.price * ((100 - item.discount) / 100)
                                )}{" "}
                                บาท
                              </p>
                            </p>
                          ) : (
                            <p className="mt-3 text-md text-center font-bold text-grey-700 sm:text-l mb-4">
                              {item.price} บาท
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </Link>
                </div>
              ))
            )}
          </div>
          <div className="mx-auto my-10 sm:mt-10">
            {visibleCourses < filteredCourses.length && (
              <Button
                gradientDuoTone="cyanToBlue"
                onClick={() => setVisibleCourses((prev) => prev * 2)}
                class="relative py-1 px-5 text-black text-base font-bold rounded-full overflow-hidden bg-white transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-gray-950 before:to-gray-900 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
                size="xl"
                pill
              >
                ดูคอร์สเพิ่มเติม
              </Button>
            )}
            {visibleCourses > 8 && (
              <Button
                gradientDuoTone="cyanToBlue"
                onClick={() => setVisibleCourses(8)}
                class="relative py-1 px-5 text-black text-base font-bold rounded-full overflow-hidden bg-white transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-gray-950 before:to-gray-900 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
                size="xl"
                pill
              >
                ดูคอร์สน้อยลง
              </Button>
            )}
          </div>
        </div>
      </>
    </ContextProvider>
  );
}
