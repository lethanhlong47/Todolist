import React, { Component } from 'react';
import '../App.css';

class TaskItem extends Component {

    onUpdateStatus = ()=> {
        this.props.onUpdateStatus(this.props.task.id)
    }
    onUpdate = ()=>{
            this.props.onUpdate(this.props.task.id);
        }
    onDelete = ()=>{
        this.props.onDelete(this.props.task.id);
    }

    

render() {
    
    var {task, index} = this.props;

  return(
           
               <tr>
                    <td>{index + 1}</td>
                    <td> { task.name } </td>
                    <td className="text-center">
                        <span 
                        onClick = {this.onUpdateStatus}
                        className= {task.status===true ? 'label label-success': 'label label-danger'}
                        
                        >
                                    {task.status === true ? 'Done' : 'Doing' }
                        </span>
                    </td>
                    <td className="text-center">
                        <button type="button" 
                                className="btn btn-warning"
                                onClick={this.onUpdate}
                                >
                            <span className="fa fa-pencil mr-5"></span>Sửa
                        </button>
                        &nbsp;
                        <button 
                        onClick = {this.onDelete}
                        type="button" className="btn btn-danger">
                            <span className="fa fa-trash mr-5"></span>Xóa
                        </button>
                    </td>
                </tr>
        )
        }
  
}
export default TaskItem;
