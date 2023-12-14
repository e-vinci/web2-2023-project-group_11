class GlobalState {
    constructor() {
      this.endDiv = null;
    }
  
    setEndDiv(div) {
      this.endDiv = div;
    }
  
    getEndDiv() {
      return this.endDiv;
    }
  
    clearEndDiv() {
      if (this.endDiv) {
        document.body.removeChild(this.endDiv);
        this.endDiv = null;
      }
    }
  }
  
  
  const globalState = new GlobalState();
  export default globalState;