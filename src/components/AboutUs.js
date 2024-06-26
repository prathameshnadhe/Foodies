import useOnlineStatus from "../utils/useOnlineStatus";
import User from "./User";
import UserClass from "./UserClass";
import React from "react";

// class AboutUs extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   componentDidMount() {
//   console.log("Parent Component Did Mount");
//   }

//   render() {
//     return (
//       <div>
//         <h1>About Us Page</h1>
//         <h3>
//           This is my food delivery app project with Swiggies live API data.
//         </h3>
//         {/* <User name={"Prathamesh Nadhe (functions)"} /> */}

//         {/* <UserClass name={"first (class)"} location={"Pune (Class)"} /> */}
//         {/* <UserClass name={"Second (class)"} location={"Mumbai (Class)"} /> */}
//       </div>
//     );
//   }
// }

const AboutUs = () => {
  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false) {
    return (
      <h1 style={{ textAlign: "center" }}>
        Looks like you'are offline!! Please check your internet connection;
      </h1>
    );
  }

  return (
    <div className="other-components">
      <h1>About Us Page</h1>
      <h3>This is my food delivery app project with Swiggies live API data.</h3>
    </div>
  );
};

export default AboutUs;
