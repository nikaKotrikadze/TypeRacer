import React,{useState,useEffect} from 'react'
var randomWords = require('random-words')

export default function App (){

    const [words, setWords] = useState([])
    useEffect(()=>{
        setWords(generateWords())
    },[])
    function generateWords(){
        return randomWords({min:10, max:20})
    }
    const [start, setStart]=useState(false)
    const [hideButton, setHideButton] = useState(true)
    const [changeColor, setChangeColor] = useState(false)
    const handleClick = () =>{
        setStart(prev=>!prev)
        setHideButton(prev=>!prev)
    }

    const randomWordsArray = words

    const inputWordsArray = []
    let lastIndex;
    const handleChange = ({target}) =>{
        // inputWordsArray.push({index:target.value.split(' ')})
        // lastIndex = (inputWordsArray[inputWordsArray.length-1].index)
        // if(lastIndex.length==randomWordsArray.length){
        //     console.log('truue as fuck my pos')
        //     setChangeColor(prev=>!prev)
    // }
        console.log('changed')    
    }
    

  return (
    <div className='App'>
        <div className='content'>
            <div className='flex-words'>
                {start===false?<div>click 'start' to begin</div>:
                <div className='words' style={{display:start?'block':'none', color:changeColor?'green':''}}>
                    {words.map((word,i)=>(
                     
                    <>
                    <span key={i}>
                        {word.split('').map((char,idx)=>(
                            <span key={idx}>{char}</span>
                        ))}
                    </span>
                    <span> </span>
                    </>
                    
                ))}
                </div>}
            </div>
            <div className='flex-input'>
                <input placeholder='start typing here..' type='text' className='input' disabled={start?false:true} onChange={handleChange}/>
            </div>
            <div className='flex-button'>
                <button className='start-button' onClick={handleClick} style={{display:hideButton?'block':'none'}}>Start</button>
            </div>
        </div>
    </div>
  )
}