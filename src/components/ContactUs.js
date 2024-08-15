import useOnlineStatus from "../utils/useOnlineStatus";

const ContactUs = () => {
  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false) {
    return (
      <h1 className="text-center text-2xl">
        Looks like you'are offline!! Please check your internet connection;
      </h1>
    );
  }

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4 mt-8 opacity-[0.9]">
        Contact Us Page
      </h1>
      <h3 className="text-lg">
        This is my food delivery app project with Swiggies live API data.
      </h3>
    </div>
  );
};

export default ContactUs;
