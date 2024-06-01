import User from "./User";
import UserClass from "./UserClass";

function AboutUs() {
  return (
    <div>
      <h1>About Us Page</h1>
      <h3>This is my food delivery app project with Swiggies live API data.</h3>
      <User name={"Prathamesh Nadhe (functions)"} />

      <UserClass name={"Prathamesh Nadhe (class)"} location={"Pune (Class)"} />
    </div>
  );
}

export default AboutUs;
