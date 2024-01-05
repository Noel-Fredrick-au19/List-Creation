export const listsData = {
    1: [
        {
            header: 'Cat',
            items: 'european',
        },
        {
            header: 'Whale',
            items: 'killer',
        },
        {
            header: 'Gemsbok',
            items: 'Oryx gazella',
        },
        {
            header: 'Dog',
            items: 'european',
        },
        {
            header: 'Mice',
            items: 'killer',
        },
        {
            header: 'spider',
            items: 'Oryx gazella',
        },
    ],
    2: [{
        header: 'Mouse',
        items: 'Felis silverstrics lybica',
    },
    {
        header: 'Shark',
        items: 'Orcinus orca',
    },
    {
        header: 'Crayons',
        items: 'Oryx gazella',
    },
    ],
};

export const getTotalItems = (listData) => {
    return Object.entries(listData).reduce((totals, [listNumber, currentList]) => {
        totals[listNumber] = currentList.length;
        return totals;
    }, {});
};

export const createNewList = (lists) => {
    const newListNumber = Object.keys(lists).length + 1;
    lists[newListNumber] = [];
    return lists;
};

export const updateListsData = (lists, newList) => {
    lists = { ...lists, ...newList };
    return lists;
};

export default listsData;
