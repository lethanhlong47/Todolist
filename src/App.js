import React, { Component } from 'react';
import './App.css';
import Taskform from './components/TaskForm'
import Control from './components/Control'
import TaskList from './components/TaskList'
import cryptoRandomString from 'crypto-random-string';

class App extends Component {

    

    constructor(props){
        super(props);
        this.state={
            tasks: [],
            isDisplayForm: false,
            taskEditing: null,
            fliter : {
                name: '',
                status: -1
            },
            keyword:''
            
        }

    
    }
    /*hiển thị ds cong việc và lưu trình duyệt bằng localstorage*/
    componentWillMount(){
        if (localStorage && localStorage.getItem('tasks')) {
            var tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasks: tasks
            });
        }
    }

    

    s4(){
        return Math.floor((1+ Math.random())* 0x10000).toString(16).substring(1);
    }
   GenarateID(){
    return this.s4() + this.s4()+'-'+ this.s4()+ '-' + this.s4()+ '-' + this.s4() + '-' + this.s4() + this.s4();
   }
    /*đóng mở form thêm công việc*/
  onToggleForm = () => {
    this.setState({
        isDisplayForm : !this.state.isDisplayForm,
        taskEditing: null
    });
  }

  /*đóng mở form thêm công việc*/
  onCloseForm = ()=>{
    this.setState({
        isDisplayForm : false
    });
  }

 onOpenForm = ()=>{
    this.setState({
        isDisplayForm : true
    });
  }

  onSubmit =(data)=>{
    var {tasks} = this.state
    if(data.id === ''){
        data.id = this.GenarateID();
        tasks.push(data);
    }else
    {
        var index = this.findindex(data.id);
        tasks[index]= data;
    }
    
    this.setState({
        tasks: tasks,
        taskEditing: null,
    });
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  onUpdateStatus =(id)=>{
    var {tasks} = this.state
    var index = this.findindex(id) ;
    if (index!== -1){
        tasks[index].status= !tasks[index].status;
        this.setState({
            tasks: tasks
        });
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }
  }

  findindex = (id) => {
    var {tasks} = this.state;
    var result = -1;
    tasks.forEach((task, index)=>{
        if(task.id===id) {
            result=  index;
        }
    });
    return result;
  }

  onDelete = (id) =>{
    var {tasks} = this.state
    var index = this.findindex(id) ;
    if (index!== -1){
        tasks.splice(index,1);
        this.setState({
            tasks: tasks
        });
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }
  }

  onUpdate = (id)=> {
   var {tasks} = this.state
   var index = this.findindex(id);
   var taskEditing = tasks[index];
    this.setState({
        taskEditing: taskEditing
    });
    this.onOpenForm();
   

  }

  onFilter =(filterName, filterStatus)=>{
    filterStatus= parseInt(filterStatus,10)
    this.setState ({
            filter : {
                name: filterName.toLowerCase(),
                status: filterStatus
            }
    });
  }

  onSearch =(keyword)=>{
    /*this.setState({
        keyword: keyword
    })*/
    console.log(keyword)
  }
  
render() {
    /*filter*/
    var {tasks, isDisplayForm, taskEditing, filter,keyword } = this.state;
    
    if (filter){
        if(filter.name){
           tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(filter.name) !== -1 ;
            });
        }
        tasks = tasks.filter((task)=>{
                if (filter.status===-1){
                    return task;
                }else{
                    return task.status === (filter.status===1 ? true : false)
                }
            });
    }

    /*tìm kiếm*/
    if(keyword){
      
           tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(keyword) !== -1 ;
        });
    }
    var elmTaskForm = isDisplayForm ? 
            <Taskform 
            onSubmit = {this.onSubmit}
            onCloseForm = {this.onCloseForm}
            task ={taskEditing}
            
            /> : '' 
  return(
           <div className="container">
            <div className="text-center">
            <h1>Quản Lý Công Việc</h1>
            <hr/>
        </div>
        <div className="row">
            <div className={ isDisplayForm === true ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4': ''}>
          {/*Taskform:thêm công việc*/}
                {elmTaskForm}
            </div> 

            <div className={ isDisplayForm===true ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                <button type="button" className="btn btn-primary"
                        onClick = {this.onToggleForm} >
                    <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                </button>
                 
              {/*Search-sort*/}
                <div className="row mt-15">
                <Control onSearch = {this.onSearch} />
                </div>
                    {/*Ds công việc*/}
                <div className="row mt-15">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 mt-15">
                        <TaskList tasks = { tasks }
                        onUpdateStatus = {this.onUpdateStatus}
                        onDelete = {this.onDelete}
                        onUpdate = {this.onUpdate}
                        onFilter = {this.onFilter}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>

        )
        }
  
}

export default App;
