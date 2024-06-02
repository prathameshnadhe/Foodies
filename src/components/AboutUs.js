import User from "./User";
import UserClass from "./UserClass";
import React from "react";

class AboutUs extends React.Component {
  constructor(props) {
    super(props);

    console.log("Parent Constructor");
  }

  componentDidMount() {
    console.log("Parent Component Did Mount");
  }

  render() {
    console.log("Parent render");
    return (
      <div>
        <h1>About Us Page</h1>
        <h3>
          This is my food delivery app project with Swiggies live API data.
        </h3>
        <User name={"Prathamesh Nadhe (functions)"} />

        <UserClass
          name={"Prathamesh Nadhe (class)"}
          location={"Pune (Class)"}
        />
      </div>
    );
  }
}

// function AboutUs() {
//   return (
//     <div>
//       <h1>About Us Page</h1>
//       <h3>This is my food delivery app project with Swiggies live API data.</h3>
//       <User name={"Prathamesh Nadhe (functions)"} />

//       <UserClass name={"Prathamesh Nadhe (class)"} location={"Pune (Class)"} />
//     </div>
//   );
// }

export default AboutUs;
