import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";

function Answer1() {
  return (
    <div className="w-full mb-3">
      <div className="flex rounded-2xl bg-gray-50 w-auto overflow-hidden align-items-center">
        <span className="m-2 text-center font-bold text-xl uppercase text-black">
          Trả lời
        </span>
        <div className="flex-1 m-2 answer-detail text-black">
          <p>HƯỚNG DẪN MUA VÉ ONLINE</p>
          <p>
            <b>
              <u>Điều kiện</u>
            </b>
          </p>
          <p>- Bạn phải là thành viên Lotocinema</p>
          <p>
            - Nếu không là thành viên vui lòng đăng ký trên website để được mua
            vé.{" "}
          </p>
          <p>
            <b>
              <u>Bước 1</u>
            </b>
          </p>
          <p>Đăng nhập</p>
          <p>
            <b>
              <u>Bước 2:</u>
            </b>
          </p>
          <p>- Chọn loại vé và số lượng:</p>
          <p>
            <b>
              <u>Bước 3:</u>
            </b>
          </p>
          <p>Chọn ghế:</p>
          <p>Chọn thức ăn:</p>
          <p>
            <b>
              <u>Bước 4:</u>
            </b>
          </p>
          <p>- Đồng ý</p>
          <p>- Đồng ý các điều khoản</p>
          <p>- Chọn loại thẻ thanh toán.</p>
          <p>- Thanh toán.</p>
          <p>
            <b>
              <u>Bước 5:</u>
            </b>{" "}
            Nhập thông tin tài khoản để thanh toán việc mua online.
          </p>
          <p>
            <b>HOÀN TẤT</b>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Answer1;
