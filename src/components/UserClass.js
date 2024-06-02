import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {
        name: "Dummy",
        location: "Default",
        avatar_url: "",
      },
    };
    console.log("First Constructor");
  }

  async componentDidMount() {
    console.log(this.props.name + "Child Component Did Mount");
    // API calls

    const data = await fetch("https://api.github.com/users/prathameshnadhe");
    const json = await data.json();

    this.setState({
      userInfo: json,
    });

    console.log(json);
  }

  componentDidUpdate(prevProps, prevState) {
    // if(this.state.count !== prevState.count) {}
    console.log("Component did update");
  }

  componentWillUnmount() {
    console.log("Component will unmount");
  }

  render() {
    console.log("render Component");
    const { name, location, avatar_url } = this.state.userInfo;

    return (
      <div className="user-card">
        <img src={avatar_url} alt="" />
        <h2>Name: {name}</h2>
        <h3>Location: {location}</h3>
        <h4>Contact: prathameshnadhe06@gmail.com</h4>
      </div>
    );
  }
}

export default UserClass;
