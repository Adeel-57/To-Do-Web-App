import { useState } from 'react'
import './App.css'
import downArrow from './assets/down-arrow.svg'
import tick from './assets/tick.svg'
import delete_icon from './assets/delete.svg'
import TaskInput from './Components/Form'
import useLocalStorage from './Hooks/LocalStorage'

function App() {
  const [data, setdata] = useLocalStorage('taskData', [])
  const [done, markDone] = useLocalStorage('taskDone', [])
  const [show, setShow] = useState()
  function showIcon(e, item) {
    e.stopPropagation();
    item.id === show ? setShow('') : setShow(item.id)
  }
  function deleteIcon(e, item) {
    e.stopPropagation();
    let founnd = false;
    data.some((el, i) => {
      if (el.id == item.id) {
        founnd = true;
        data.splice(i, 1)
        return true
      }
    })
    done.map((el) => {
      if (el.id == item.id) {
        MarkDone(item)
      }
    })
    if(founnd){setdata(pre => [...pre])}
  }
  function MarkDone(item) {
    let founnd = false;
    done.map((el, i) => {
      if (el.id === item.id) {
        founnd = true;
        done.splice(i, 1)
      }
    })
    founnd ? markDone(pre => [...pre]) : markDone(pre => [...pre, item])
  }
  function existing(item) {
    let a = false;
    done.map((el) => {
      if (el.id === item.id) {
        a = true
      }
    })
    return a
  }

  return (
    <>
      <div className="main">
        <div className="App-container">
          <h3>To-Do-List</h3>
          <div className="app-content">
            <TaskInput setdata={setdata} />
            <ul className='to-do-list'>
              {
                JSON.parse(JSON.stringify(data)).reverse().map((item, i) => <li key={i}>
                  <div className='li-content'>
                    <div className='li-head'>
                      {
                        existing(item) ? <img src={tick} alt='' className='circle circle1' onClick={() => { MarkDone(item) }} style={{ cursor: 'pointer' }} /> : <div className='circle' style={{ cursor: 'pointer' }} onClick={() => { MarkDone(item) }}><div className='circle-content'>ab</div></div>
                      }
                      <div className='head-content'>
                        <h5 className='head-title'>{item.title}</h5>
                        <div className='head-icons'>
                          <img className={item.id === show ? 'icon-rotate' : ''} style={{ cursor: 'pointer' }} src={downArrow} alt="" onClick={(e) => { showIcon(e, item) }} />
                          <img src={delete_icon} style={{ cursor: 'pointer' }} onClick={(e) => { deleteIcon(e, item) }}/>
                        </div>
                      </div>
                    </div>
                    {
                      item.id === show ? item.details.trim() ?<p>{item.details}</p>:<p className='empty'>empty</p>  : ''
                    }
                  </div>
                </li>)
              }
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
