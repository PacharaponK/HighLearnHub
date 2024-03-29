import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import backgroundImage from "../assets/background.png";
import conf from "../conf/main";
import ax from "../conf/ax";
import { ContextProvider } from "../context/Auth.context";
import { FaPhoneSquareAlt } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";
import { FaRegEyeSlash } from "react-icons/fa";
import { HiOutlineEye } from "react-icons/hi";

export default function RegisterAccountPage() {
  const [loading, setLoading] = useState(false);
  const [submitEnabled, setSubmitEnabled] = useState(true);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phonenum: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = (e) => { 
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility1 = (e) => { 
    e.preventDefault();
    setShowPassword1(!showPassword1);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitEnabled(false);
    setLoading(true);

    try {
      if (formData.password === formData.confirmPassword) {
        const postData = {
          username: formData.username,
          email: formData.email,
          first_name: formData.first_name,
          last_name: formData.last_name,
          password: formData.password,
          phonenum: formData.phonenum,
        };

        const result = await ax.post(
          `${conf.apiUrlPrefix}${conf.registerEndpoint}`,
          postData
        );
        console.log("สมัครข้อมูล:", result.data);
        toast.success("สมัครสมาชิกสำเร็จ!");
        setTimeout(() => {
          navigate("/login");
        });
      } else {
        console.error("รหัสผ่านไม่ตรงกัน กรุณากรอกรหัสผ่านใหม่ให้ตรงกัน");
        toast.error("รหัสผ่านไม่ตรงกัน กรุณากรอกรหัสผ่านใหม่ให้ตรงกัน");
        setPasswordError(true);
      }
    } catch (error) {
      console.error("ข้อมูลสมัครไม่สำเร็จ:", error.response.data);
      toast.error("การสมัครไม่สำเร็จ กรุณาติดต่อเจ้าหน้าที่");
    } finally {
      setLoading(false);
      setSubmitEnabled(true);
    }
  };

  return (
    <ContextProvider>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>ลงทะเบียน</title>
      </Helmet>
      <Toaster position="top-right" reverseOrder={false} />
      <div
        className="flex items-center justify-center h-screen w-screen"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl bg-white border-2 rounded-lg shadow-2xl p-6 mx-auto">
          <p className="text-lg font-bold mb-4 text-center">
            สมัครบัญชีผู้ใช้ด้วยอีเมล
          </p>
          <p className="text-sm mb-5 text-center">กรุณากรอกข้อมูลให้ครบถ้วน</p>
          <form onSubmit={handleSubmit} className="flex flex-wrap gap-1">
            <div className="w-full">
              <Label htmlFor="email" value="อีเมล" />
              <TextInput
                id="email"
                type="email"
                icon={HiMail}
                placeholder="name@highlearnhub.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex-1 md:flex-2">
              <Label htmlFor="first_name" value="ชื่อจริง" />
              <TextInput
                id="first_name"
                type="text"
                placeholder="John"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                size={17}
              />
            </div>

            <div className="flex-1 md:flex-2">
              <Label htmlFor="last_name" value="นามสกุล" />
              <TextInput
                id="last_name"
                type="text"
                placeholder="Doe"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                size={17}
              />
            </div>

            <div className="flex-2 w-full">
              <Label htmlFor="username" value="ชื่อผู้ใช้" />
              <TextInput
                id="username3"
                type="text"
                placeholder="johndoe"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                addon="@"
              />
            </div>

            <div className="w-full">
              <Label htmlFor="phone" value="เบอร์โทรศัพท์" />
              <TextInput
                id="phone"
                type="text"
                placeholder="191"
                name="phonenum"
                value={formData.phonenum}
                icon={FaPhoneSquareAlt}
                onChange={handleChange}
                required
              />
            </div>

            <div className="w-full relative">
              <Label htmlFor="password" value="รหัสผ่าน" />
              <TextInput
                id="password"
                type={showPassword ? "text" : "password"}
                icon={RiLockPasswordFill}
                placeholder="123456"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                className="absolute top-[2.85rem] right-2 transform -translate-y-1/2 focus:outline-none"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaRegEyeSlash /> : <HiOutlineEye />}
              </button>
            </div>
            <div className="w-full relative">
              <Label htmlFor="confirmPassword" value="ยืนยันรหัสผ่าน" />
              <TextInput
                id="confirmPassword"
                type={showPassword1 ? "text" : "password"}
                icon={RiLockPasswordFill}
                placeholder="123456"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button
                className="absolute top-[2.85rem] right-2 transform -translate-y-1/2 focus:outline-none"
                onClick={togglePasswordVisibility1}
              >
                {showPassword1 ? <FaRegEyeSlash /> : <HiOutlineEye />}
              </button>
              
            </div>

            {passwordError && (
              <div className="text-red-500 text-sm font-semibold">
                รหัสผ่านไม่ตรงกัน กรุณากรอกรหัสผ่านใหม่ให้ตรงกัน
              </div>
            )}

            <Button
              type="submit"
              className="flex-1 mt-4 mb-6 px-6 mx-auto"
              gradientDuoTone="purpleToPink"
              size="md"
              disabled={!submitEnabled || loading}
            >
              สมัครบัญชีผู้ใช้
            </Button>
          </form>

          <p className="text-sm text-center cursor-pointer font-medium mb-4">
            หากคุณมีบัญชีผู้ใช้งานแล้ว{" "}
            <span className="text-blue-700 underline" onClick={handleLogin}>
              เข้าสู่ระบบ
            </span>
          </p>
        </div>
      </div>
    </ContextProvider>
  );
}
