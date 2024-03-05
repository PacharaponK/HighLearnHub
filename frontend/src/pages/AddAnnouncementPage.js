import { Label, Select, TextInput, Textarea } from "flowbite-react";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ax from "../conf/ax";
import conf from "../conf/main";
import { Box, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ContextProvider } from "../context/Auth.context";

export default function AddAnnouncementPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [onChangeImg, setOnChangeImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({
    title: "",
    description: "", // Fixed typo in description key
    expiry_date: "",
  });
  const [dataofcourses, setDataofcourses] = useState([]); // Ensure it's initialized as an empty array

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ax.get(`${conf.apiUrlPrefix}/courses`);
        console.log("response =", response.data);
        setDataofcourses(response.data);
        if (selectedImage) {
          setImageUrl(URL.createObjectURL(selectedImage[0]));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedImage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'subject') {
      setCourseData((prevState) => ({ ...prevState, courseIds: [value] }));
    } else {
      setCourseData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const uploadImg = async (e) => {
    const formData = new FormData();

    formData.append("field", "image");
    formData.append("ref", "api::course.course");
    formData.append("refId", e);
    formData.append("files", selectedImage[0]);

    try {
      const response = await ax.post(conf.apiUrlPrefix + `/upload`, formData);
      setOnChangeImg(response.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!courseData.title || !courseData.description || !courseData.expiry_date) {
        alert("โปรดกรอกข้อมูลให้ครบทุกช่อง");
        return; 
      }
  
      setLoading(true);
      const response = await ax.post(`${conf.apiUrlPrefix}/courses`, {
        data: courseData,
      });
      console.log(courseData);
      uploadImg(response.data.data.id);
      setTimeout(() => {
        navigate("/admin");
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  return (
    <>
      <ContextProvider>
        {loading ? (
          <div className="background-image">
            <div className="h-screen flex justify-center items-center">
              <CircularProgress />
            </div>
          </div>
        ) : (
          <>
            <Navbar />
            <div className="pt-24 h-screen md:h-screen background-image">
              <div className="mx-10 lg:mx-auto flex flex-col items-center justify-items-center w-auto sm:w-full">
                <div className="mt-4 w-full xl:w-2/3 2xl:w-1/2 p-8 sm:p-16 2xl:p-12 bg-white shadow-lg rounded-lg ">
                  <h3 className="text-2xl text-center font-medium text-gray-900 dark:text-white mb-6">
                    เพิ่มประกาศ
                  </h3>
                  <div className="grid lg:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title" value="หัวข้อประกาศ" />
                      <TextInput
                        id="title"
                        name="title"
                        placeholder="หัวข้อประกาศ"
                        value={courseData.title}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
  <Label htmlFor="subject" value="วิชา" />
  <Select
    id="subject"
    name="subject"
    value={courseData.courseIds}
    onChange={handleChange}
    multiple={true} // Enable multiple selection
    required
  >
    <option value="" disabled hidden>
      เลือกวิชา
    </option>
    {console.log(dataofcourses)}
    {Array.isArray(dataofcourses) && dataofcourses.map(course => (
      <option key={course.id} value={course.id}>
        {course.data.attributes?.title} {/* Assuming 'name' is the property that holds the course name */}
      </option>
    ))}
  </Select>
</div>

                    <div className="lg:col-span-2">
                      <Label htmlFor="description" value="คำอธิบาย" />
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="คำอธิบาย"
                        value={courseData.description}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div>
                      <div>
                        <label
                          htmlFor="imageInput"
                          className="font-medium text-sm block mb-1 cursor-pointer"
                        >
                          รูปประกาศ
                        </label>
                        <input
                          id="imageInput"
                          type="file"
                          accept="image/*"
                          onChange={(e) => setSelectedImage(e.target.files)}
                          className="rounded-lg"
                        />
                      </div>
                      {imageUrl && selectedImage && (
                        <Box mt={2} textAlign="center">
                          <img
                            src={imageUrl}
                            alt={selectedImage.name}
                            height="50px"
                          />
                        </Box>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-center mt-8">
                    <button
                      onClick={handleSubmit}
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      เพิ่มคอร์ส
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </ContextProvider>
    </>
  );
}
