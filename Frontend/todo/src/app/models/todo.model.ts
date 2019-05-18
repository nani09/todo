export class ToDo {
    _id:string;
    title: string;
    subTasks:string[] ;
    priority: string;
    taskId: Number;
    constructor( ) {
        this.title = ""
        this.subTasks = []
        this.priority = ""
        this.taskId = 0
    }
}