
import React, { useState } from 'react';
import ListColumn from './ListColumn';
import { createNewList, updateListsData, getTotalItems, listsData } from '../utils/listsData';
import '../../src/index.css';
import { useCreateListStore } from '../stores/CreateListStore';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query';
import { GridLoader } from 'react-spinners';
import failureImage from '../images/list-creation-failure-lg-output.png';

const ListCreationView = () => {
  const [selectedLists, setSelectedLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
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

  useQuery({
    queryKey: ['contactDetails', listsData],
    queryFn: () => listsData,
  });

  const handleCreateNewList = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (selectedLists.length === 2) {
        const newList = createNewList(lists);
        setLists(newList);
        setSelectedLists([]);
        stFnSetArrowFlag(true)
        toast.success('New list created successfully!');
      } else {
        toast.error('You should select exactly 2 lists to create a new list.');
      }
    } catch (error) {
      console.error('Error during list creation:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleArrowClick = (listNumber, itemIndex, direction) => {
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
    const initialLists = Object.fromEntries(
      Object.entries(lists).filter(([listNumber]) => parseInt(listNumber) <= 2)
    );
    setLists(initialLists);
    console.log("🚀 ~ file: ListCreationView.js:72 ~ handleCancel ~ listsData:", listsData)
    setSelectedLists([]);
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
      {loading ? (
        <GridLoader margin={2} size={15} color={'#f94f5e'} loading={true} />
      ) : error ? (
        <>
          <p>Error during list creation</p>
          <img src={failureImage} alt="Error" />
        </>
      ) : (
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
      )}
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
