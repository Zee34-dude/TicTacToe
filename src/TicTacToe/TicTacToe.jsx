import { useState, useEffect } from 'react'
import '../App.css'
import Buttons from './Buttons'
import Confetti from "react-confetti"
import clsx from 'clsx'

export function TicTacToe() {
  const [player, setPlayer] = useState('X')
  const [gameArr, setGameArr] = useState(new Array(9).fill(''))
  const [winner, setWinner] = useState(null)
  const [count, setCount] = useState(0)
  const [playComputer, setPlayComputer] = useState(true)
  const [score, setScore] = useState(JSON.parse(localStorage.getItem('score')) || {
    x: 0,
    o: 0,
  });
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  useEffect(() => {
    if (winner == 'X') {
      setScore({ ...score, x: score.x + 1 })

    }
    else if (winner == 'O') {
      setScore({ ...score, o: score.o + 1 })

    }
  }, [winner])
  localStorage.setItem('score', JSON.stringify(score))
  useEffect(() => {
    if (checkWinner(gameArr) == ("X" || 'O')) return
    if (winner === null && count > 0) {
      setTimeout(() => {
        playComputer && ComputerMove();
      }, 500); // Delay for the computer's move
    }

  }, [count])
  useEffect(() => {
    checkWinner(gameArr) && setWinner(checkWinner(gameArr))
  }, [gameArr])

  //Player move
  function changePlayer(index) { 
    if (winner || gameArr[index]) return;
    const newArr = [...gameArr]
    newArr[index] = playComputer ? 'X' : player
    setGameArr(newArr)
    setPlayer(player == 'X' ? 'O' : 'X')
    setCount(count + 1)
   
  }

  //Computer move
  function ComputerMove() {
    if (winner) return;
    else {
      const emptySpaces = gameArr.map((space, index) => space == '' ? index : null).filter(space => space !== null);
      const randomNo = Math.floor(Math.random() * emptySpaces.length)
      if (emptySpaces.length === 0) return;
      const randomIndex = emptySpaces[randomNo];
      const ComputerMove = getbestMove(gameArr, 'X', 'O', randomIndex)

      const newArr = [...gameArr]
      newArr[ComputerMove] = 'O'
      setGameArr(newArr)
    }
  }
  //Get the best possible Move for the computer
  function getbestMove(gameArr, opponent, computer, randomIndex) {
    //if computer is about to win
    for (const [a, b, c] of winningCombinations
    ) {
      if (gameArr[b] == computer && gameArr[c] == computer && gameArr[a] == '') return a
      if (gameArr[a] == computer && gameArr[c] == computer && gameArr[b] == '') return b
      if (gameArr[a] == computer && gameArr[b] == computer && gameArr[c] == '') return c

    }
    for (const [a, b, c] of winningCombinations) {
      if (gameArr[a] == opponent && gameArr[b] == opponent && gameArr[c] == '') return c
      if (gameArr[b] == opponent && gameArr[c] == opponent && gameArr[a] == '') return a
      if (gameArr[c] == opponent && gameArr[a] == opponent && gameArr[b] == '') return b

    }
    return randomIndex
  }
  //Determine the winner
  function checkWinner(dashBoard) {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination
      if (dashBoard[a] && dashBoard[a] == dashBoard[b] && dashBoard[a] == dashBoard[c]) {
        // setWinner(dashBoard[a]);
        return dashBoard[a]
      }
      if (!dashBoard.includes('')) {
        return 'Tie'
      }
    }
    return null
  }



  const buttonel = gameArr.map((value, index) =>
    <Buttons
      key={index}
      handleClick={changePlayer}
      value={value}
      index={index}

    />
  )
  const className = clsx(
    {
      green: winner == 'X',
      red: winner == 'O'
    }
  )
  function resetScore() {
    setScore({
      x: 0,
      o: 0,
    })
  }
  const resetGame = () => {
    setWinner(null)
    setGameArr(new Array(9).fill(''))
    setPlayer('X')
    setCount(0)
  }


  return (
    <main>
      <div className='main-container'>
        {winner && winner !== 'Tie' && <Confetti
          recycle={false}
          numberOfPieces={3000}
        />}

        {winner && <h1 className={className}>{winner !== 'Tie' ? `${winner} wins!` : "it's a tie"}</h1>}
        <div className='grid'>
          {buttonel}
        </div>
        {
          !winner && <h2 className={player == 'O' ? 'red' : 'green'}><span>Turn:</span>{player}</h2>
        }
        {<span className='reset-game' onClick={resetGame}>Reset Game</span>}
        {<button className='reset' onClick={() => setPlayComputer(!playComputer)}>{playComputer ? 'Two players' : 'Play vs Computer'}</button>}


      </div>
      <div className='flex'>
        <h5 style={{
          marginBottom:'5px'
        }}>Scores</h5>
        <div className='scores'>

          <h2 className="xo green">X</h2>
          <h2 className="xo red">O</h2>
          <div className="score">{score.x}</div>
          <div className="score">{score.o}</div>
        </div>
        <span onClick={resetScore} className='reset-game'>Reset Scores</span>
      </div>

    </main>
  )
}





