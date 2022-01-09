import { Component } from 'react'
import { Grid } from '@mui/material';
import NewTask from '../components/NewTask';
import { TasksContext } from '../store/Tasks';
import TasksList from '../components/TasksList';

class AllTasksPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tasks: [],
            refreshTasks: this.getListOfTasks
        }

    }

    getListOfTasks = () => {
        fetch(
            "http://localhost:8000/tasks/",
            {
                credentials: 'same-origin',
                method: 'GET'
            }
        ).then((response) => {
            return response.json();
        }).then((data) => {
            this.setState({
                tasks: data,
                refreshTasks: this.getListOfTasks
            })
        });
    }

    componentDidMount() {
        this.getListOfTasks()
    }

    render() {
        return (
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <TasksContext.Provider value={this.state}>
                    <TasksList tasks={this.state.tasks} refreshTasks={() => this.getListOfTasks()} />
                    <NewTask refreshTasks={() => this.getListOfTasks()} />
                </TasksContext.Provider>
            </Grid>
        )
    }
}

export default AllTasksPage;