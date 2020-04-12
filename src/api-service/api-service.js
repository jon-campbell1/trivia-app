export default {

  getQuestions:
    () => fetch("https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean").then(res => res.json())

};
