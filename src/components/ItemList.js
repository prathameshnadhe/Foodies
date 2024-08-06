import { useState } from "react";
import { MENU_ITEM_IMG } from "./../utils/constants";
import placeHolderImg from "./../utils/images/placeHolderDish.png";

const ItemList = ({ items }) => {
  return (
    <div>
      {items.map((item, index) => {
        const [imgSrc, setImgSrc] = useState(
          item?.card?.info?.imageId
            ? `${MENU_ITEM_IMG}${item?.card?.info?.imageId}`
            : placeHolderImg
        );
        const [addBtn, setAddBtn] = useState("true");
        const [counter, setCounter] = useState(1);

        const handleAddBtn = () => {
          setAddBtn(false);
          setCounter(1);
        };

        const handlncrementBtn = () => {
          setCounter(counter + 1);
        };

        const handleDecrementBtn = () => {
          setCounter(counter - 1);
          if (counter === 1) {
            setAddBtn(true);
          }
        };

        const handleError = () => {
          setImgSrc(placeHolderImg);
        };

        return (
          <div>
            <div
              key={item.card?.info?.id}
              className="p-2 m-2 border-b-4 text-left flex justify-between"
            >
              <div>
                <div className="flex justify-between p-2 m-2 text-xl font-bold text-gray-800">
                  <span>{item?.card?.info?.name}</span>
                  <span className="p2">
                    ₹
                    {item?.card?.info?.defaultPrice / 100 ||
                      item?.card?.info?.price / 100}
                  </span>
                </div>
                <p className="text-sm p-2 m-2">
                  {item?.card?.info?.description}
                </p>
              </div>
              <div>
                <img
                  src={imgSrc}
                  alt={item?.card?.info?.name}
                  className="w-[200px] h-[200px] object-cover rounded-lg"
                  onError={handleError}
                />
                {addBtn ? (
                  <button
                    className="absolute bg-white text-xl text-green-500 ml-[-10.2rem] m-[11rem] px-4 py-2 w-[8rem] rounded-lg font-bold border-none shadow-md"
                    onClick={handleAddBtn}
                  >
                    ADD
                  </button>
                ) : (
                  <button className="absolute bg-white text-xl text-green-500 ml-[-10.2rem] m-[11rem] px-4 py-2 w-[8rem] rounded-lg font-bold border-none shadow-md">
                    <div className="flex justify-between">
                      <button
                        onClick={handleDecrementBtn}
                        className="border-none text-green-500 bg-white font-bold text-xl"
                      >
                        -
                      </button>
                      <span>{counter}</span>
                      <button
                        onClick={handlncrementBtn}
                        className="border-none text-green-500 bg-white font-bold text-xl"
                      >
                        +
                      </button>
                    </div>
                  </button>
                )}
              </div>
            </div>
            {index !== items.length - 1 && (
              <div className="bg-gray-300 m-[20px] h-[0.5px]"> </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
