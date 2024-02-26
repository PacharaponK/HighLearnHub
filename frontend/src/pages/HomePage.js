import React, { useState, useEffect, useContext } from "react";
import { AuthContext, ContextProvider } from "../context/Auth.context";
import { Outlet } from "react-router-dom";
import "../App.css";
import Navbar from "../components/Navbar";
import Course from "../components/HomePage/Course";
import Announcements from "../components/HomePage/Announcement";
import OnlineBestSeller from "../components/HomePage/OnlineBestSeller";
import OnlineLatest from "../components/HomePage/OnlineLatest";
import LiveCourse from "../components/HomePage/LiveCourse";
import CircularProgress from "@mui/material/CircularProgress";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";
import ax from "../conf/ax";
import conf from "../conf/main";
export default function HomePage() {
  const [course, setCourse] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const { state: ContextState } = useContext(AuthContext);
  const { userRole } = ContextState;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const courseResponse = await ax.get(`${conf.apiUrlPrefix}/courses?populate=image&populate=videos`
        );

        console.log("courseResponse",courseResponse)

        const announcementResponse = await ax.get(
          `${conf.apiUrlPrefix}/announcements?populate=image`
        );

        const courseData = courseResponse?.data?.data?.map((course) => {
          const totalDurationSeconds = course.attributes.videos.data.reduce(
            (totalDuration, video) => totalDuration + video.attributes.duration,
            0
          );

          const minutes = Math.floor(totalDurationSeconds / 60);
          const seconds = Math.floor(totalDurationSeconds % 60);

          return {
            id: course.id,
            title: course.attributes.title,
            price: course.attributes.price,
            amount: course.attributes.amount,
            maxamount: course.attributes.maxamount,
            description: course.attributes.description,
            image:`${conf.urlPrefix}`+course.attributes.image.data.attributes.url,
            type: course.attributes.study_type,
            duration: { minutes, seconds },
            date: course.attributes.schedule_text,
          };
        });

        const announcementData = announcementResponse.data.data.map((item) => ({
          id: item.id,
          title: item.attributes.title,
          image:
            `${conf.urlPrefix}` + item.attributes.image.data.attributes.url,
        }));

        setCourse(courseData);
        setAnnouncements(announcementData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (userRole === "admin") {
    return (
      <>
        {loading ? <div className="h-screen flex justify-center items-center">
          <CircularProgress />
        </div> :
          <>
            <Navbar data={course} />
            <Announcements data={announcements} />
            <Course data={course} userRole={ContextState.userRole} />
            <Footer />
          </>}
      </>
    );
  }

  return (
    <>
      <ContextProvider>
        <Helmet>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>HighLearnHub</title>
        </Helmet>
        {loading ? (
          <div className="h-screen flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : (
          <>
            <Navbar data={course} />
            <Announcements data={announcements} />
            <OnlineBestSeller />
            <OnlineLatest />
            <LiveCourse />
            <Course data={course} />
            <Footer></Footer>
            <Outlet />
          </>
        )}
      </ContextProvider>
    </>
  );
}
