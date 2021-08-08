/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, Fragment } from 'react'
import { Modal, ModalContent } from './styles'
import { MdClose } from 'react-icons/md'
import styled from 'styled-components'
import { apiQuery } from '../../util/apiQuery'

const Heading = styled.input`
  font-size: 36px;
  font-weight: bold;
  border: none;
  width: 100%;
`

function Popup ({ toggle, task, tasks, onSave }) {
  const [edits, setEdits] = useState({})

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

  const edit = (field) => (event) => {
    setEdits({ ...edits, [field]: event.target.value })
  }

  const edited = (field) => edits[field] === undefined ? task[field] : edits[field]

  const save = async () => {
    const { title, allDay, start, end, ...rest } = edits
    let obj = {}
    if (title !== undefined) obj.name = title
    if (allDay !== undefined) obj.datetime = allDay
    if (start !== undefined || end !== undefined) {
      const s = start ?? task.start
      const e = end ?? task.end
      obj.start = s
      obj.duration = e.getTime() - s.getTime()
    }
    obj = { ...obj, ...rest }
    onSave(await apiQuery(`/tasks/${task._id}`, obj, { method: 'PATCH' }))
  }

  return (
    <Modal>
      <ModalContent>
        <span className='close' onClick={toggle}>
          <MdClose/>
        </span>
        <div>
          <Heading type='text' value={edited('title')} onChange={edit('title')} />
          <ul>
            {task.children.map(tree)}
          </ul>
          <div>
            <button onClick={save} disabled={Object.keys(edits).length === 0}>Save</button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  )
}

export default Popup
