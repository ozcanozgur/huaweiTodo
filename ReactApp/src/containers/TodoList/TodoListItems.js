import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import axios from '../../axios-orders';

class TodoListItems extends Component {

    state = {
        todoList: null,
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: 'http://localhost:8080/api/todoList/' + this.props.match.params.id
        }).then(res => {

            this.setState({ todoList: res.data });
        }).catch(error => {
            alert('Bir Hata Oluştu =>' + error);
            console.log(error);
        });
    }



    addItemHandler = (event, itemId) => {
        event.preventDefault();

        axios({
            method: 'post',
            url: 'http://localhost:8080/api/todoList/' + this.props.match.params.id + '/' + itemId
        }).then(res => {
            this.setState({ todoList: res.data });
        }).catch(error => {
            alert('Bir Hata Oluştu =>' + error);
            console.log(error);
        });

    }


    render() {

        let completedStyle = {
            textDecoration: 'line-through',
            color: 'red'
        }

        let tableItems = null;
        let counter = 0;
        if (this.state.todoList) {
            tableItems = this.state.todoList.items.map(item => {
                const date = new Date(item.deadline);
                counter++;

                return (
                    <tr key={item.id} style={item.status ? null : completedStyle}>
                        <th scope="row">{counter}</th>
                        <td colSpan="1">{item.name}</td>
                        <td colSpan="1">{date.getMonth() + "/" + date.getDay() + "/" + date.getFullYear()}</td>
                        <td colSpan="1">{date.getUTCHours() + ":" + date.getMinutes()}</td>
                        <td >{item.status ? "active" : "expired"}</td>
                        <td>
                            <Button
                                btnType="btn btn-warning btn-sm"
                                clicked={(event) => this.addItemHandler(event, item.id)}
                            > {item.status ? "expire" : "active"}
                            </Button>
                        </td>
                    </tr>
                )
            })
        }

        return (
            <div>
                <table className="table table-sm table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Date mm/dd/yyyy</th>
                            <th scope="col">Hour</th>
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableItems}
                    </tbody>
                </table>
            </div>
        )
    }
}


export default TodoListItems;