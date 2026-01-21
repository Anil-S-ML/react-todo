import React, {Component} from 'react';
import {FILTER_ALL} from '../../services/filter';
import {MODE_CREATE, MODE_NONE} from '../../services/mode';
import {objectWithOnly, wrapChildrenWith} from '../../util/common';
import {getAll, addTodo, addToList, updateStatus, updateStatusLocal, getInitialList} from '../../services/todo';

class StateProvider extends Component {
    constructor() {
        super();
        this.state = {
            query: '',
            mode: MODE_CREATE,
            filter: FILTER_ALL,
            list: getInitialList(),
            loading: true,
            error: null
        }
    }

    componentDidMount() {
        this.loadTodos();
    }

    async loadTodos() {
        try {
            this.setState({ loading: true, error: null });
            const todos = await getAll();
            this.setState({ list: todos, loading: false });
        } catch (error) {
            console.error('Failed to load todos:', error);
            this.setState({ error: 'Failed to load todos', loading: false });
        }
    }

    render() {
        let children = wrapChildrenWith(this.props.children, {
            data: this.state,
            actions: objectWithOnly(this, ['addNew', 'changeFilter', 'changeStatus', 'changeMode', 'setSearchQuery', 'reloadTodos'])
        });

        return <div>{children}</div>;
    }

    async addNew(text) {
        try {
            // Call API to create todo
            const newTodo = await addTodo(text);
            // Add to local state
            const updatedList = addToList(this.state.list, newTodo);
            this.setState({list: updatedList});
        } catch (error) {
            console.error('Failed to add todo:', error);
            this.setState({ error: 'Failed to add todo' });
        }
    }

    changeFilter(filter) {
        this.setState({filter});
    }

    async changeStatus(itemId, completed) {
        // Optimistic update
        const updatedList = updateStatusLocal(this.state.list, itemId, completed);
        this.setState({list: updatedList});

        try {
            // Call API to update
            await updateStatus(itemId, completed);
        } catch (error) {
            console.error('Failed to update todo:', error);
            // Revert on error
            const revertedList = updateStatusLocal(this.state.list, itemId, !completed);
            this.setState({list: revertedList, error: 'Failed to update todo'});
        }
    }

    changeMode(mode = MODE_NONE) {
        this.setState({mode});
    }

    setSearchQuery(text) {
        this.setState({query: text || ''});
    }

    reloadTodos() {
        this.loadTodos();
    }
}

export default StateProvider;
