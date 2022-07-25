import React, { Component } from "react";
import CardItem from "./CardItem";
import axios from "axios";

class Cards extends Component {
    state = {
        name: "",
        description: "",
        cards: [],
    };

    componentDidMount() {
        this.getItems();
    }

    getItems = (event) => {
        const baseUrl = process.env.REACT_APP_API_URL;

        const request = axios
            .get(baseUrl + "/drinks/")
            .then((response) => {
                console.log(response);
                const cards = response.data;
                this.setState({ cards });
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

        const data = { name, description };

        axios
            .post(baseUrl + "/drinks/", data)
            .then((response) => {
                console.log(response);
                this.getItems();
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

    render() {
        const { name, description } = this.state;

        return (
            <div className="App">
                <header className="App-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-4">
                                <form onSubmit={this.handleSubmit}>
                                    <h3>Drinks Form</h3>
                                    <label>
                                        Add drink:
                                        <input
                                            onChange={this.handleNameChange}
                                            value={name}
                                            type="text"
                                            name="name"
                                            placeholder="drink name"
                                            className="rounded bg-light"
                                        />
                                    </label>

                                    <label>
                                        Add description:
                                        <input
                                            onChange={
                                                this.handleDescriptionChange
                                            }
                                            value={description}
                                            type="text"
                                            name="Description"
                                            placeholder="Insert description..."
                                            className="rounded bg-light"
                                        />
                                    </label>
                                    <input
                                        type="submit"
                                        value="Submit"
                                        className="btn btn-outline-danger"
                                    />
                                </form>
                            </div>
                            <div
                                className="col-8"
                                style={{ display: "flex", flexWrap: "wrap" }}
                            >
                                {this.state.cards.map((card, index) => (
                                    <CardItem
                                        key={index}
                                        data={card}
                                        getItems={this.getItems}
                                    ></CardItem>
                                ))}
                            </div>
                            <div className="col-2"></div>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}

export default Cards;
