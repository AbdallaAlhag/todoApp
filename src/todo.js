
class todo{
    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

const arrayModule = (() => {
    const myTodo = [];
  
    return {
      getArray: () => myTodo,
      addToArray: (title, description, dueDate, priority) => {
        const t1 = new todo(title,description, dueDate, priority)
        myTodo.push(t1);
      }
    };
  })();


export default arrayModule;