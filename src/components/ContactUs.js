import useOnlineStatus from "../utils/useOnlineStatus";

const ContactUs = () => {
  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false) {
    return (
      <h1 className="text-center">
        Looks like you'are offline!! Please check your internet connection;
      </h1>
    );
  }

  return (
    <div className="text-center">
      <h1>Contact Us Page</h1>
      <h3>This is my food delivery app project with Swiggies live API data.</h3>
    </div>
  );
};

export default ContactUs;
