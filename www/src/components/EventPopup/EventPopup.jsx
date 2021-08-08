/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, Fragment } from 'react'
import { Modal, ModalContent, Heading } from './styles'
import { MdClose } from 'react-icons/md'

function Popup ({ toggle, task, tasks }) {
  const tree = (id) => {
    const task = tasks.find((task) => task._id === id)
    return (
      <Fragment key={task._id}>
        <li>{task.name}</li>
        {(task.children && task.children.length > 0)
          ? (
            <ul>
              {task.children.map(tree)}
            </ul>
            )
          : undefined
        }
      </Fragment>
    )
  }

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
          <ul>
            {task.children.map(tree)}
          </ul>
        </div>
      </ModalContent>
    </Modal>
  )
}

export default Popup
