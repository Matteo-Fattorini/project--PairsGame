const app = new Vue({
  el: ".main-container",
  data: {
    difficulty: "", //v-modeled with difficulty select
    symbols, //symbols class array from data
    actualSymbols: [], //random symbols from data, based on difficulty
    game: false, //true when start is pressed
    currentCell: [], //current cell selected by user Maxlen 2
    firstStart: true, //first click on board. Will show the entire board for 2 sec
    guessedRight: 0, //if == symbols gameOver
    score: 5000, //max score
    gameOver: false //true when all guessed
  },
  computed: {
    diffSel() {
      if (this.difficulty == "0") {
        //how many cell needs to be generated
        return 12;
      } else if (this.difficulty == "1") {
        return 24;
      } //
    },
  },

 

  methods: {
    //check if player won the game
    checkWinner() {
      if (this.difficulty == 0 && this.guessedRight >= 12 || this.difficulty == 1 && this.guessedRight >= 24 ) {
        this.gameOver = true;
      } 
    },

    generateSymbols() {
      //this will generete the actualSymbols variable. Picks random from symbols.
      if (!this.game && this.difficulty != "") {
        this.game = true;
        let index = [];
        if (this.difficulty == 0) {
          index = this.randomNums(6);
        } else {
          index = this.randomNums(12);
        }

        for (numbers of index) {
          this.actualSymbols.push(symbols[numbers]);
          this.actualSymbols.push(symbols[numbers]);
        }
        this.shuffle(this.actualSymbols);
      }
    },

    randomNums(n) {
      //generate a random list of unique "n" numbers
      var arr = [];
      while (arr.length < n) {
        var r = Math.floor(Math.random() * 12);
        if (arr.indexOf(r) === -1) arr.push(r);
      }
      return arr;
    },

    shuffle(array) {
      //method that shuffle an array. Used on actualSymbols
      let currentIndex = array.length,
        temporaryValue,
        randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    },

    setgreen() {  //main function on click
      if (this.firstStart) {  //if first click, show entire board for 2 sec
        for (let cell of this.$refs.listCell) {
          cell.classList.add("temporaryDisplay");
        }

        setInterval(function () {
          for (let cell of app.$refs.listCell) {
            this.generating = true;
            cell.classList.remove("temporaryDisplay");
          }
        }, 2000);
      }
      this.firstStart = false;
      let current = this.currentCell;
    
      if (current.length == 2) {
        this.currentCell = [];

        currentClass = current[0].innerHTML;   //check if selected box have same symbols.

        if (current[1].innerHTML == currentClass) {  
          current.forEach((element) => element.classList.add("guessedRight"));
          this.guessedRight += 2
          this.checkWinner();
        } else {
          this.score -= 100
        }

        setTimeout(function () {
          //timeout to remove automatically the display block
          for (let cell of app.$refs.listCell) {
            cell.classList.remove("currentSelect");
          }
        }, 1000);
      }
      for (let cell of this.$refs.listCell) {
        if (
          cell.tabIndex == event.target.tabIndex &&
          current.indexOf(cell) == -1
        ) {
          current.push(cell);
          cell.classList.add("currentSelect");
        }
      }
    },

    /**
     * This Function handles the click. If guessed is < than 2 will add the clicked item to array. Else it
     * will reset the array and run the cicle again.
     * @param {event} event
     */

    selectBox(event) {
      
      let current = this.currentCell;
      if (current.length < 2) {
        this.setgreen();
      } else if (current.length == 2) {
        current = [];
        for (let cell of this.$refs.listCell) {
          cell.classList.remove("currentSelect");
        }
      }
      this.setgreen();
    },
  },
});
