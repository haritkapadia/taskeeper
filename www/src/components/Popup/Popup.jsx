/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Modal, ModalContent } from './styles'
import { MdClose } from 'react-icons/md'
import OutsideClickHandler from 'react-outside-click-handler'

function Popup ({ toggle, onSubmit }) {
  const [task, setTaskName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(task)
  }

  function close () {
    if (task !== '') {
      setTaskName('')
    }
    toggle(null)
  }

  return (
    <Modal>
      <OutsideClickHandler onClick= {close}>
        <ModalContent>
          <span className='close' onClick={close}>
            <MdClose/>
          </span>
            <form onSubmit={handleSubmit}>
              <label>
                Enter Task name:
                <input
                  type="text"
                  value={task}
                  onChange={e => setTaskName(e.target.value)}
                />
              </label>
              <input type="submit" value="Submit" />
            </form>
        </ModalContent>
      </OutsideClickHandler>
    </Modal>
  )
}

export default Popup
