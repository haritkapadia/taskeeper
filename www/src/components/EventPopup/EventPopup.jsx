/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Modal, ModalContent, Heading } from './styles'
import { MdClose } from 'react-icons/md'

function Popup ({ toggle, task }) {
  return (
    <Modal>
      <ModalContent>
      <span className='close' onClick={toggle}>
          <MdClose/>
      </span>
      <div>
      <Heading>
        {task.title}
      </Heading>
      </div>
      </ModalContent>
    </Modal>
  )
}

export default Popup
