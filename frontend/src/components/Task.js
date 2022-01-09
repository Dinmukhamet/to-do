import { Component } from "react";
import { FormControlLabel } from "@mui/material";
import { Radio } from '@mui/material'
import { TasksContext } from "../store/Tasks";

class Task extends Component {
    static contextType = TasksContext

    constructor(props) {
        super(props)

        this.task = props.task
        this.changeHandler = this.changeHandler.bind(this);
    }

    render() {
        return (
            <FormControlLabel control={
                <Radio onChange={this.changeHandler} checked={this.task.is_completed} />
            } label={this.task.title} />
        )
    }

    changeHandler() {
        if (!this.task.is_completed) {
            this.task.is_completed = true
            fetch(
                `http://localhost:8000/tasks/${this.task.id}/`,
                {
                    body: JSON.stringify(this.task),
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'PUT',
                }
            ).then(() => {
                this.context.refreshTasks();
            })

        };
    }
}

export default Task;