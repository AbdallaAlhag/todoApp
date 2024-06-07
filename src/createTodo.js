class todo{
    constructor(title, description, dueDate, priority, project='home'){
        this._title = title;
        this._description = description;
        this._dueDate = dueDate;
        this._priority = priority;
        this._project = project;
    }

    get title(){
      return this._title;
    }

    get description(){
      return this._description;
    }

    get dueDate(){
      return this._dueDate;
    }

    get priority(){
      return this._priority;
    }

    get project(){
      return this._project;
    }

    set title(newTitle){
      this._title = newTitle;
    }

    set description(newdescription){
      this._description = newdescription;
    }

    set dueDate(newdueDate){
      this._dueDate = newdueDate;
    }

    set priority(newpriority){
      this._priority = newpriority;
    }

}

const arrayModule = (() => {
    const myTodo = [];
  
    return {
      getArray: () => myTodo,
      addToArray: (title, description, dueDate, priority,project) => {
        const t1 = new todo(title,description, dueDate, priority,project)
        myTodo.push(t1);
      },
      remove: (index) => {
        myTodo.splice(index,1);
      }
    };
  })();


export default arrayModule;