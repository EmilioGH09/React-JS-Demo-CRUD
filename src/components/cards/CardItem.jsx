import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

class CardItem extends Component {
    state = {
        card: this.props.data,
    };

    showItem(id) {
        this.props.navigate("/items/" + id);
    }

    deleteItem = (id) => {
        const baseUrl = process.env.REACT_APP_API_URL;

        axios
            .delete(baseUrl + "/drinks/" + id)
            .then((response) => {
                console.log(response);
                //Call to Parent Function
                this.props.getItems();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    render() {
        const { id, name } = this.state.card;
        return (
            <div
                style={{
                    borderStyle: "solid",
                    borderWidth: 4,
                    flexBasis: "30%",
                }}
                className="m-2 rounded border-primary bg-dark"
            >
                <p>{name}</p>
                <button
                    onClick={() => this.showItem(id)}
                    className="btn btn-info m-1"
                >
                    Details
                </button>
                <button
                    onClick={() => this.deleteItem(id)}
                    className="btn btn-danger m-1"
                >
                    Delete
                </button>
            </div>
        );
    }
}

function WithNavigate(props) {
    let navigate = useNavigate();
    return <CardItem {...props} navigate={navigate} />;
}

export default WithNavigate;
