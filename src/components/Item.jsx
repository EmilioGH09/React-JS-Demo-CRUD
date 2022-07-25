import React, { Component } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

class Item extends Component {
    state = {
        item: "",
        edit: false,
        name: "",
        description: "",
    };

    componentDidMount() {
        this.getItem();
    }

    getItem = () => {
        const baseUrl = process.env.REACT_APP_API_URL;
        const id = this.props.params.id;

        const request = axios
            .get(baseUrl + "/drinks/" + id)
            .then((response) => {
                console.log(response);
                const item = response.data;
                this.setState({
                    item,
                    name: item.name,
                    description: item.description,
                });
            })
            .catch((error) => {
                console.log(error);
            });

        return request;
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const baseUrl = process.env.REACT_APP_API_URL;
        const { name, description } = this.state;
        const id = this.props.params.id;

        const data = { name, description };

        axios
            .put(baseUrl + "/drinks/" + id, data)
            .then((response) => {
                console.log(response);
                this.getItem();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    handleNameChange = (event) => {
        this.setState({
            name: event.target.value,
        });
    };

    handleDescriptionChange = (event) => {
        this.setState({
            description: event.target.value,
        });
    };

    changeEdit = (event) => {
        const { edit } = this.state;
        this.setState({
            edit: !edit,
        });
    };

    showItems() {
        this.props.navigate("/");
    }

    renderViewOrEdit() {
        const { item, edit, name, description } = this.state;

        if (edit) {
            return (
                <form onSubmit={this.handleSubmit}>
                    <div
                        style={{ display: "flex", flexWrap: "wrap" }}
                        className="m-2"
                    >
                        <h3>Drinks Form</h3>
                        <button
                            onClick={() => this.changeEdit()}
                            className="btn btn-outline-info ml-2"
                        >
                            View
                        </button>
                    </div>
                    <label>
                        Edit Name:
                        <input
                            onChange={this.handleNameChange}
                            value={name}
                            type="text"
                            name="name"
                            placeholder={item.name}
                            className="rounded bg-light"
                        />
                    </label>
                    <br />
                    <label>
                        Edit description:
                        <input
                            onChange={this.handleDescriptionChange}
                            value={description}
                            type="text"
                            name="Description"
                            placeholder={item.description}
                            className="rounded bg-light"
                        />
                    </label>
                    <br />
                    <input
                        type="submit"
                        value="Submit"
                        className="btn btn-outline-danger"
                    />
                </form>
            );
        }
        return (
            <div>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <h1>Drinks Details</h1>
                    <button
                        onClick={() => this.changeEdit()}
                        className="btn btn-outline-info m-2"
                    >
                        Edit
                    </button>
                </div>
                <h2>
                    Name:{" "}
                    <p style={{ fontSize: 20 }} className={"text-primary"}>
                        {item.name}
                    </p>
                </h2>
                <h2>
                    Description:{" "}
                    <p style={{ fontSize: 20 }} className={"text-primary"}>
                        {item.description}
                    </p>
                </h2>
                <button
                    onClick={() => this.showItems()}
                    className="btn btn-outline-danger mt-2"
                >
                    Home
                </button>
            </div>
        );
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">{this.renderViewOrEdit()}</div>
            </div>
        );
    }
}

function WithNavigate(props) {
    let params = useParams();
    let navigate = useNavigate();
    return <Item {...props} params={params} navigate={navigate} />;
}

export default WithNavigate;
