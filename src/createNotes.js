class note{
    constructor(title, description, ){
        this._title = title;
        this._description = description;
    }

    get title(){
      return this._title;
    }

    get description(){
      return this._description;
    }

    set title(newTitle){
      this._title = newTitle;
    }

    set description(newdescription){
      this._description = newdescription;
    }

}

const noteModule = (() => {
    const myNote = [];
  
    return {
      getArray: () => myNote,
      addToArray: (title, description) => {
        const n1 = new note(title,description)
        myNote.push(n1);
      },
      remove: (index) => {
        myNote.splice(index,1);
      }
    };
  })();


export default noteModule;