import ItemList from "./ItemList";

const RestaurantCategory = ({
  data,
  showItems,
  setShowIndex,
  setShowIndexClose,
}) => {
  const handleClick = () => {
    setShowIndex();
    if (showItems) {
      setShowIndexClose();
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mx-auto my-4 bg-[#fff]">
        <div
          className="flex justify-between cursor-pointer bg-gray-50 p-4 mt-2 shadow-md rounded-md"
          onClick={handleClick}
        >
          <span className="font-bold text-lg max-mobile:text-base max-mobile:opacity-[0.9]">
            {data.title} ({data.itemCards.length})
          </span>
          <span>⬇️</span>
        </div>

        {/* Accordion body */}
        {showItems && <ItemList items={data.itemCards} />}
      </div>
    </div>
  );
};

export default RestaurantCategory;
