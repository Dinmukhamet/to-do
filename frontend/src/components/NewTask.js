import { Component, createRef } from 'react';

import { TasksContext } from '../store/Tasks';
import { TextField } from '@mui/material'

class NewTask extends Component {
    static contextType = TasksContext;

    constructor(props) {
        super(props)
        this.titleRef = createRef();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {

        event.preventDefault();
        const title = this.titleRef.current.value;

        fetch(
            'http://localhost:8000/tasks/',
            {
                body: JSON.stringify({ "title": title }),
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
            }
        ).then(() => {
            this.context.refreshTasks()
        })
    }

    render() {

        return (
            <div>
                <form>
                    <TextField hiddenLabel id="outlined-basic" size="small" variant="outlined" inputRef={this.titleRef} />
                    <button className='btn' type="submit" onClick={this.handleSubmit} />
                </form>
            </div>
        )
    }
};

export default NewTask;