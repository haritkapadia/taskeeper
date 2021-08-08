/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { SidebarWrapper, Heading, CategoryWrapper, Title, Checkbox, Label } from './styles'

const user = 'Julia'

const categories = [
  {
    name: 'category1',
    label: 'Chemistry'
  },
  {
    name: 'category2',
    label: 'Mathematics'
  },
  {
    name: 'category3',
    label: 'Calculus'
  },
  {
    name: 'category4',
    label: 'Geography'
  },
  {
    name: 'category5',
    label: 'English'
  }
]

const Sidebar = () => {
  const [checkedItems, setCheckedItems] = useState({ category1: true, category2: true, category3: true, category4: true, category5: true })

  const handleChange = event => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked
    })
    console.log('checkedItems: ', checkedItems)
  }

  return (
    <SidebarWrapper>
      <Heading>
        {user}&apos;s Calendar
      </Heading>
      <Title>
        Categories
      </Title>
      <CategoryWrapper>
        {categories.map((el) => {
          return (
            <div key= {el} style = {{ display: 'flex', flexDirection: 'row' }}>
              <Checkbox
              type = 'checkbox'
                name={el.name}
                checked={checkedItems[el.name]}
                onChange={handleChange}
              />
              <Label>
                {el.label}
              </Label>
            </div>
          )
        })}
      </CategoryWrapper>
    </SidebarWrapper>
  )
}

export default Sidebar
