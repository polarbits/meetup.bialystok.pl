import { getSnapshot, onSnapshot, onPatch } from 'mobx-state-tree'
import { reaction } from "mobx"
import { MeetupList, Meetup } from './MeetupList' 
it('can create a meetup', () => {
  const item = Meetup.create({
    'title': 'Meetjs #16',
    'description': 'lorem ipsum',
    'image': '/img/meetup.jpg'
  })

  expect(item.title).toBe('Meetjs #16')
  item.changeTitle('Meetjs #17')
  expect(item.title).toBe('Meetjs #17')
})

it('can create a meetup list', () => {
  const list = MeetupList.create({
    items: [{
      'title': 'Meetjs #16',
      'description': 'lorem ipsum',
      'image': '/img/meetup.jpg',
      'price': 10
    },
    {
      'title': 'Meetjs #16',
      'description': 'lorem ipsum',
      'image': '/img/meetup.jpg',
      'price': 20
    },{
      'title': 'Meetjs #16',
      'description': 'lorem ipsum',
      'image': '/img/meetup.jpg',
      'price': 30
    }
    ]
  })
  expect(list.items.length).toBe(3)
})

it ('can add new items', () => {
  const list = MeetupList.create()
  const patches = []
  onPatch(list, patch => {
    patches.push(patch)
  })
  list.add({
    title: 'meetjs',
    description: 'lorem ipsum dolor',
    'price': 30
  })
  
  list.items[0].changeTitle('meetjs')

  expect(patches).toMatchSnapshot()
})

it('can calculate', () => {
  const list = MeetupList.create({ items: [
    {
      'title': 'Meetjs #16',
      'description': 'lorem ipsum',
      'image': '/img/meetup.jpg',
      'price': 10
    },
    {
      'title': 'Meetjs #16',
      'description': 'lorem ipsum',
      'image': '/img/meetup.jpg',
      'price': 20
    }
  ]})
  expect(list.totalPrice).toBe(30)
})
