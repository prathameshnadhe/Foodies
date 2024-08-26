// import useOnlineStatus from "../utils/useOnlineStatus";
// import User from "./User";
// import UserClass from "./UserClass";
// import React from "react";

// // class AboutUs extends React.Component {
// //   constructor(props) {
// //     super(props);
// //   }

// //   componentDidMount() {
// //   console.log("Parent Component Did Mount");
// //   }

// //   render() {
// //     return (
// //       <div>
// //         <h1>About Us Page</h1>
// //         <h3>
// //           This is my food delivery app project with Swiggies live API data.
// //         </h3>
// //         {/* <User name={"Prathamesh Nadhe (functions)"} /> */}

// //         {/* <UserClass name={"first (class)"} location={"Pune (Class)"} /> */}
// //         {/* <UserClass name={"Second (class)"} location={"Mumbai (Class)"} /> */}
// //       </div>
// //     );
// //   }
// // }

// const AboutUs = () => {
//   const onlineStatus = useOnlineStatus();

//   if (onlineStatus === false) {
//     return (
//       <h1 className="text-center text-2xl mt-8">
//         Looks like you'are offline!! Please check your internet connection;
//       </h1>
//     );
//   }

//   return (
//     <div className="text-center">
//       <h1 className="text-3xl font-bold mb-4 mt-8 opacity-[0.9]">
//         About Us Page
//       </h1>
//       <h3 className="text-lg">
//         This is my food delivery app project with Swiggies live API data.
//       </h3>
//     </div>
//   );
// };

// export default AboutUs;

import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import RestaurantCard from "./RestaurantCard";

const AboutUs = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(2);

  useEffect(() => {
    axios
      .get("https://api.escuelajs.co/api/v1/products?offset=10&limit=30")
      .then((res) => setItems(res.data))
      .catch((err) => console.log(err));
  }, []);

  const fetchMoreData = () => {
    axios
      .get(`https://api.escuelajs.co/api/v1/products?offset=${index}0&limit=30`)
      .then((res) => {
        setItems((prevItems) => [...prevItems, ...res.data]);

        res.data.length > 0 ? setHasMore(true) : setHasMore(false);
      })
      .catch((err) => console.log(err));

    setIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<p>Loading...</p>}
    >
      <div className="container text-center">
        <div className="row">
          {items && items.map((item) => <li key={item.id}>{item.id}</li>)}
        </div>
      </div>
    </InfiniteScroll>
  );
};

export default AboutUs;
