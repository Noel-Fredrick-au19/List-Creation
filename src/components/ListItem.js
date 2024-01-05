
import React from 'react';
import { useCreateListStore } from '../stores/CreateListStore';

const ListItem = ({ header, items, onArrowClick }) => {
  const { stArrowFlag } = useCreateListStore();
  return (
    <div className="admin-module-box font-CircularTTBookRegular text-sm mt-4">
      <div className="group mr-2 min-h-[5.875rem] cursor-pointer overflow-hidden rounded-lg bg-white pb-4 pr-4 hover:bg-[#fdf8f8]">
        <div className="flex items-center justify-between p-4 -mr-4">
          <div className="flex items-center">
            <p className="text-sm font-bold text-black transition-colors duration-300 group-hover:text-[#757575]">{header}</p>
          </div>
        </div>

        <div className="pl-4">
          <p className="text-xs text-black transition-colors duration-300 group-hover:text-[#757575] font-CircularTTBookRegular">{items}
            {stArrowFlag === true && (
              <button className="cursor-pointer ml-5" onClick={onArrowClick}>{'➔'}</button>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
