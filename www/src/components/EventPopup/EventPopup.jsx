/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, Fragment } from 'react'
import { Modal, ModalContent, Subtitle } from './styles'
import { MdClose } from 'react-icons/md'
import { format, getMinutes, getHours, getSeconds, addMinutes } from 'date-fns'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styled from 'styled-components'
import { apiQuery } from '../../util/apiQuery'
import OutsideClickHandler from 'react-outside-click-handler'

const Heading = styled.input`
  font-size: 36px;
  font-weight: bold;
  border: none;
  width: 100%;
`

const timeOptions = getTime()

const subtasks = [
  { value: 1, label: 'Subtask1' },
  { value: 1, label: 'Subtask2' },
  { value: 1, label: 'Subtask3' },
  { value: 1, label: 'Subtask4' },
  { value: 1, label: 'Subtask5' },
  { value: 1, label: 'Subtask6' },
  { value: 1, label: 'Subtask7' }
]

function getTime () {
  let i = 0
  // eslint-disable-next-line prefer-const
  let arr = []
  for (i = 0; i < 48; i++) {
    arr.push({
      value: i,
      label: format(addMinutes(new Date(2020, 1, 1, 0, 0, 0), i * 30), 'p')
    })
  }
  return arr
}

function Popup ({ toggle, task, tasks, onSave }) {
  const [startOption, setStartOption] = useState(null)
  const [endOption, setEndOption] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
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
    toggle()
  }

  return (
    <Modal>
      <OutsideClickHandler
        onOutsideClick={toggle}
      >
      <ModalContent>
        <span className='close' onClick={toggle}>
          <MdClose/>
        </span>
        <div>
          <Heading type='text' value={edited('title')} onChange={edit('title')} />
          {task.children &&
          (
            <ul>
              {task.children.map(tree)}
            </ul>
          )
          }
          { (getHours(task.end) !== 0 || getMinutes(task.end) !== 0 || getSeconds(task.end) !== 0) &&
            (
              <div>
                <Subtitle> <span>Start Date:</span> {format(task.start, 'PPPPpppp')} </Subtitle>
                <Subtitle> <span>End Date:</span> {format(task.end, 'PPPPpppp')} </Subtitle>
              </div>
            )}
          <Subtitle>
            Change start time:
          </Subtitle>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
          <Select
            defaultValue={startOption}
            onChange={setStartOption}
            options={timeOptions}
            loadingMessage = {'adfafd'}
          />
          <Subtitle>
            Change end time:
          </Subtitle>
          <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
          <Select
            defaultValue={endOption}
            onChange={setEndOption}
            options={timeOptions}
          />
          <Subtitle>
            Subtasks
            <Select
              options={subtasks}
            />
          </Subtitle>
          <div>
            <button onClick={save} disabled={Object.keys(edits).length === 0}>Save</button>
          </div>
        </div>
      </ModalContent>
      </OutsideClickHandler>
    </Modal>

  )
}

export default Popup
