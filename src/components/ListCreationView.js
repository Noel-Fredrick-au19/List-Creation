
import React, { useState } from 'react';
import ListColumn from './ListColumn';
import { createNewList, updateListsData, getTotalItems, listsData } from '../utils/listsData';
import '../../src/index.css';
import { useCreateListStore } from '../stores/CreateListStore';
import { toast } from 'react-toastify';

const ListCreationView = () => {
  const [selectedLists, setSelectedLists] = useState([]);
  const [lists, setLists] = useState(listsData);
  const { stFnSetArrowFlag } = useCreateListStore();

  const handleCheckboxChange = (listNumber) => {
    setSelectedLists((prevSelectedLists) => {
      if (prevSelectedLists.includes(listNumber)) {
        return prevSelectedLists.filter((selectedList) => selectedList !== listNumber);
      } else {
        return [...prevSelectedLists, listNumber];
      }
    });
  };

  const handleCreateNewList = () => {
    if (selectedLists.length === 2) {
      const newList = createNewList(lists);
      setLists(newList);
      setSelectedLists([]);
      stFnSetArrowFlag(true)
      toast.success('New list created successfully!');
    } else {
      toast.error('You should select exactly 2 lists to create a new list.');
    }
  };

  const handleArrowClick = (listNumber, itemIndex, direction) => {
    console.log('Clicked on arrow:', listNumber, itemIndex, direction);
    const sourceList = lists[listNumber];
    let destinationListNumber = listNumber;
    if (direction === 'right') {
      destinationListNumber = getNextListNumber();
    } else if (direction === 'left') {
      destinationListNumber = getPreviousListNumber();
    }
    const movedItem = sourceList[itemIndex];
    const updatedLists = {
      ...lists,
      [listNumber]: sourceList.filter((_, index) => index !== itemIndex),
      [destinationListNumber]: [...(lists[destinationListNumber] || []), movedItem],
    };
    console.log('Updated lists:', updatedLists);
    setLists(updatedLists);
  };

  let lastCreatedListNumber = 2;

  const getNextListNumber = () => {
    lastCreatedListNumber += 1;
    return lastCreatedListNumber.toString();
  };

  const getPreviousListNumber = () => {
    if (lastCreatedListNumber > 3) {
      lastCreatedListNumber -= 1;
    }
    return lastCreatedListNumber.toString();
  };


  const handleCancel = () => {
    setLists({ ...listsData });
    setSelectedLists([]);
    // setLists(listsData);
    stFnSetArrowFlag(false);
    lastCreatedListNumber = 2;
  };

  const handleUpdate = () => {
    updateListsData(lists);
    toast.success('Lists updated successfully!');
  };

  return (
    <div className="flex flex-col items-center p-8 bg-white">
      <h1 className="text-3xl font-bold mb-4">List Creation</h1>
      <button className="mb-4" onClick={handleCreateNewList} style={{ backgroundColor: '#4575BE', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Create a new list
      </button>
      <div className="flex w-full h-[75vh]">
        {Object.entries(lists).map(([listNumber, items]) => (
          <ListColumn
            key={listNumber}
            title={`List ${listNumber} (${getTotalItems(lists)[listNumber]})`}
            items={items}
            onArrowClick={(itemIndex) => handleArrowClick(listNumber, itemIndex, 'right')}
            onCheckboxChange={() => handleCheckboxChange(listNumber)}
            isChecked={selectedLists.includes(listNumber)}
          />
        ))}
      </div>
      <div className="mt-4">
        <button onClick={handleCancel} style={{ backgroundColor: 'grey', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '25px' }}>
          Cancel
        </button>
        <button onClick={handleUpdate} style={{ backgroundColor: '#4575BE', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Update</button>
      </div>
    </div>
  );
};

export default ListCreationView;
