import { useCallback, useEffect, useState , useRef  } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'


function App() {
  const [password, setpassword] = useState("");
  const [character, setcharacter] = useState(false);
  const [number, setnumber] = useState(false);
  const [length, setlength] = useState(8);
  const[msg,setmsg]=useState("");


  const passwordgenerator=useCallback(()=>{
    let pass='';
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str+="0123456789";
    if (character) str+="!@#$%^&*-_+=[]{}~`";

    for(let i=1 ; i<=length ; i++){
       let char = Math.floor(Math.random() * str.length + 1)
       pass += str.charAt(char)
    }
    setpassword(pass)
  },[length,password,character,number])
  useEffect(()=>{
    passwordgenerator()


  },[length,character,number])
  const passwordRef = useRef(null);

  const copypassword =useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 20);
    window.navigator.clipboard.writeText(password)
    setmsg("copied")
    setTimeout(()=>{
     setmsg("");
    },1000)
  },[password])

  

  return (
    <>
    <div>
    
    <h1 className='text-white pt-4 text-4xl ml-16'>Password Generator</h1>
      <div className='text-black text-2xl bg-white min-h-32 w-lg my-6 align-middle'>
        <div className='flex'>
          <input type="text" placeholder='Password' value={password}  readOnly ref={passwordRef} 
          className='outline-none min-w-4/5 py-1 px-3 bg-amber-400 my-2.5 ml-2'  />
          <button className='w-auto h-10 bg-amber-950 py-1 px-4 my-2.5' onClick={copypassword}
          >Copy</button>
        </div>

        <div className='flex align-middle justify-evenly text-black mt-6'>
          <input type="range" value={length} min={8} max={20} 
          onChange={(e) => {setlength(e.target.value)}}
          /> 
          <label>{length}</label>

          <input type="checkBox" defaultChecked={number} 
          onChange={() => {
              setnumber((prev) => !prev);
          }}
          />
          <label>Numbers</label> 

          <input type="checkBox" 
          onChange={()=>{
            setcharacter((prev)=>!prev)
          }}
          /> 
          <label >Character</label>
        </div>


      </div>
   </div>
<p className='text-white ml-50 mt-3.5 min-block-14 text-3xl'>{msg}</p>
    </>
  )
}

export default App
