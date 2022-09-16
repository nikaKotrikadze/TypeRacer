import React,{useState,useEffect,useRef} from 'react'
var randomWords = require('random-words')

export default function App (){

    const [words, setWords] = useState([])
    useEffect(()=>{
        setWords(generateWords())
    },[])

    function generateWords(){
        return randomWords({min:5, max:20})
    }
    
    const [start, setStart]=useState(false)
    const [hideButton, setHideButton] = useState(true)
    const [changeColor, setChangeColor] = useState(false)
    const [currInput, setCurrInput] = useState([])
    const [currWordIndex, setCurrWordIndex] = useState(0)
    const [currCharIndex, setCurrCharIndex] = useState(-1)
    const [currChar, setCurrChar] = useState("")

    const [correct, setCorrect]=useState(0)
    const [incorrect, setIncorrect]=useState(0)
    const textInput = useRef(null)

    useEffect(()=>{
        if(start){
            textInput.current.focus();
        }
    },[start])

    const handleClick = () =>{
        setStart(prev=>!prev)
        setHideButton(prev=>!prev)
    }

    const handleKeyDown = ({keyCode,key}) =>{
        if(keyCode === 32){
            checkMatch()
            setCurrInput('')
            setCurrWordIndex(currWordIndex+1)
            setCurrCharIndex(-1)
        }else if(keyCode===8){
            setCurrCharIndex(currCharIndex-1)
            setCurrChar("")
        } else{
            setCurrCharIndex(currCharIndex+1)
            setCurrChar(key)
        }

        if(currWordIndex==words.length){
            setHideButton(prev=>!prev)
            setStart(prev=>!prev)
            setChangeColor(prev=>!prev)
            setCurrWordIndex(0)
            setCurrInput([])
            setCorrect(0)
            setIncorrect(0)
            setWords(generateWords())
            setCurrCharIndex(-1);
            setCurrChar("")
        }
    }
    // console.log(currInput, words[words.length-1])
    function checkMatch(){
        const wordToCompare = words[currWordIndex]
        const doesItMatch = wordToCompare === currInput.trim()
        // console.log({doesItMatch})
        if(doesItMatch){
            setCorrect(prevCorrect=>prevCorrect+1)
        }else{
            setIncorrect(prevIncorrect=>prevIncorrect+1)
        }
    }

    function getCharClass(wordIdx, charIdx, char){
        if(wordIdx===currWordIndex && charIdx===currCharIndex && currChar && start){
            if(char === currChar){
                return 'has-background-success'
            } else {
                return 'has-background-fail'
            }
        }else if(wordIdx===currWordIndex && currCharIndex>= words[currWordIndex].length){
            return 'has-background-fail'
        } else {
            return ""
        }
    }


  return (
    <div className='App'>
        <div className='content'>
            <div className='flex-words'>
                {start===false?<div>click 'start' to begin</div>:
                <div className='words' style={{display:start?'block':'none'}}>
                    {words.map((word,i)=>(
                        <>
                            <span key={i}>
                                {word.split('').map((char,idx)=>(
                                    <span className={getCharClass(i,idx,char)} key={idx}>{char}</span>
                                ))}
                            </span>
                            <span> </span>
                        </>
                ))}
                </div>}
            </div>
            <div className='flex-input'>
                <input ref={textInput} placeholder='start typing here..' type='text' className='input' disabled={start?false:true} onKeyDown={handleKeyDown} value={currInput} onChange={(e)=>setCurrInput(e.target.value)}/>
            </div>
            <div className='flex-button'>
                <button disabled={hideButton?false:true} className='start-button' onClick={handleClick}>Start</button>
            </div>
            <div className='stats'>
                <div className='corr-words'>
                    <p className='stats-title'>correct words: </p>
                    <p className='stats-ans'>{correct}</p>
                </div>
                <div className='accuracy-words'>
                    <p className='stats-title'>accuracy: </p>
                    <p className='stats-ans'>{ Math.round((correct/(correct+incorrect))*100)? Math.round((correct/(correct+incorrect))*100):0} %</p>

                </div>
            </div>
        </div>
    </div>
  )
}