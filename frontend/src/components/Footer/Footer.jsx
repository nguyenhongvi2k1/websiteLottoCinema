import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
function Footer() {
  const onClickRemove = () => {
    window.localStorage.clear();
    window.location.href = "/";
  };
  return (
    <footer className="m-auto p-2 bg-zinc-900">
      <div className="container p-5">
        <div className="flex flex-row text-white  justify-content-center">
          <div className="basis-1/4 ">
            <h1 className="title text-7xl">
              <a href="/" className="flex flex-col text-center">
                <span>LOTTO</span>
                <span>CINEMA</span>
              </a>
            </h1>
          </div>
          <div className="basis-1/4 flex flex-col items-center ">
            <div className="text-white flex justify-content-center">
              <p className="border-2 rounded-lg p-2 bg-yellow-200 text-pink-800 font-bold">
                LottoCinema
              </p>
            </div>
            <a href="/" className="text-white hover:bg-amber-500">
              Phim Đang Chiếu
            </a>
            <a href="/" className="text-white hover:bg-amber-500">
              Phim Sắp Chiếu
            </a>
            <a href="/" className="text-white hover:bg-amber-500">
              Lịch Chiếu
            </a>
            <a href="/" className="text-white hover:bg-amber-500">
              Ưu Đãi
            </a>
          </div>
          <div className="basis-1/4 flex flex-col items-center ">
            <div className="text-white flex">
              <p className="border-2 rounded-lg p-2 bg-yellow-200 text-pink-800 font-bold">
                Thông Tin
              </p>
            </div>
            <a href="/" className="text-white hover:bg-amber-500">
              Giới Thiệu
            </a>
            <a href="/" className="text-white hover:bg-amber-500">
              Liên Hệ
            </a>
          </div>
          <div className="basis-1/4 flex flex-col items-center ">
            <div className="text-white flex">
              <p className="border-2 rounded-lg p-2 bg-yellow-200 text-pink-800 font-bold">
                Liên Kết
              </p>
            </div>
            <div className="flex flex-col item-center">
              <div className="flex flex-row item-center mb-2 justify-content-center">
                <a
                  href=" "
                  className="rounded-ms border p-2 item-center hover:bg-blue-800"
                >
                  <FaFacebook className="text-white" />
                </a>
                <a href=" " className="rounded-ms border p-2 hover:bg-red-800">
                  <FaInstagram className=" text-white" />
                </a>
                <a
                  href=" "
                  className="rounded-ms border p-2 hover:bg-sky-800 md:touch-pan-x"
                >
                  <FaLinkedin className="text-white" />
                </a>
              </div>
              <div className="flex flex-row item-center mt-2">
                <a
                  href=" "
                  type="button"
                  className="capitalize border-2 rounded-full bg-gray-900 text-white font-bold hover:bg-amber-500"
                  onClick={onClickRemove}
                >
                  đăng xuất
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
