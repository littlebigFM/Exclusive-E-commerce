import React from "react";

const StarRating = ({ rating, reviews }) => {
  return (
    <div className="flex items-center gap-[8px]">
      {/* Stars */}
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = rating >= star;
          const halfFilled = !filled && rating >= star - 0.5;

          return (
            <span
              key={star}
              className={`text-[20px] ${
                filled || halfFilled ? "text-[#FFAD33]" : "text-[#FFAD33]/30"
              }`}
            >
              {filled ? "★" : halfFilled ? "⯨" : "★"}
            </span>
          );
        })}
      </div>

      {/* Review count */}
      {reviews !== undefined && (
        <span className="text-[14px] font-semibold text-black/50 leading-[21px]">
          ({reviews})
        </span>
      )}
    </div>
  );
};

export default StarRating;
