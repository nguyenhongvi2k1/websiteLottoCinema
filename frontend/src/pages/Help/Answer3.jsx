import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";

function Answer3() {
  return (
    <div className="w-full mb-3">
      <div className="flex rounded-2xl bg-gray-50 w-auto overflow-hidden align-items-center">
        <span className="m-2 text-center font-bold md:text-xl text-lg uppercase text-black">
          Trả lời
        </span>
        <div className="flex-1 m-2 answer-detail text-black">
          <p>
            Bạn chỉ cần mua 02 vé xem phim bất kỳ tại rạp Lottocinema là đã có
            thể tạo thẻ L'Friend và thẻ chỉ có giá trị sử dụng từ lần giao dịch
            sau.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Answer3;
