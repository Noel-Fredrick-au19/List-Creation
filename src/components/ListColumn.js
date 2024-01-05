import React from 'react';
import ListItem from './ListItem';


const ListColumn = ({ title, items, onArrowClick, onCheckboxChange, isChecked }) => {
    return (
        <div className="w-[20%] border p-4 bg-blue-100 mr-2 overflow-y-auto">
            <h2 className="text-xl font-bold mb-2">
                <input
                    type="checkbox"
                    onChange={onCheckboxChange}
                    checked={isChecked}
                    className="mt-4"
                />
                <span className='ml-4'>
                    {title}
                </span>
            </h2>
            <div className="flex flex-col">
                {items.map((item, index) => (
                    <ListItem key={item.header} {...item} onArrowClick={() => onArrowClick(index)} />
                ))}
            </div>
        </div>
    );
};

export default ListColumn;
