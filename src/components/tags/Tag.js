import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tagRemoved, tagSelected } from "../../features/filter/filterSlice";

export default function Tag({ tag }) {
  const dispatch = useDispatch();
  const { tags: selectedTags } = useSelector((state) => state.filter);

  const title = tag.title;
  const isSelected = selectedTags.includes(title);
  const handleTagSelection = () => {
    if (isSelected) {
      dispatch(tagRemoved(title));
    } else dispatch(tagSelected(title));
  };
  return (
    <div
      className={`${
        isSelected ? "bg-blue-600 text-white" : "bg-blue-100"
      } text-blue-600 px-4 py-1 rounded-full cursor-pointer`}
      onClick={() => handleTagSelection()}
    >
      {title}
    </div>
  );
}
