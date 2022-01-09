import { FormControl, FormLabel, Grid, IconButton } from "@mui/material";

import ClearIcon from '@mui/icons-material/Clear';
import { Component } from "react";
import Task from "./Task";
import { TasksContext } from "../store/Tasks";

class TasksList extends Component {
    static contextType = TasksContext

    constructor(props) {
        super(props)

        this.deleteHandler = this.deleteHandler.bind(this);
    }

    deleteHandler(taskId) {
        fetch(
            `http://localhost:8000/tasks/${taskId}`,
            {
                method: 'DELETE',
                credentials: 'same-origin'
            }
        ).then( () => {
            this.context.refreshTasks();            
        })
    }

    render() {
        return (
            <FormControl component="fieldset">
                <FormLabel component="legend">Tasks</FormLabel>
                {this.context.tasks.map(task => {
                    return (
                        <Grid container>
                            <Grid item>
                                <Task task={task} key={task.id} />
                            </Grid>
                            <Grid item>
                                <IconButton aria-label="delete" onClick={() => {
                                    this.deleteHandler(task.id)
                                }}>
                                    <ClearIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    );
                })}
            </FormControl>
        )
    }
}

export default TasksList;