import { types } from 'mobx-state-tree'
import { number } from 'mobx-state-tree/dist/internal';

const data = {
  'title': 'Meetjs #16',
  'description': 'lorem ipsum',
  'image': '/img/meetup.jpg'
}

export const Meetup = types.model({
  title: types.string,
  description: types.string,
  image: types.optional(types.string, '/img/default.jpg'),
  price: types.number
}).actions(self => ({
  changeTitle(newTitle) {
    self.title = newTitle
  },
}))

export const MeetupList = types.model({
  items: types.optional(types.array(Meetup), [])
}).actions(self => ({
  add(item) {
    self.items.push(item)
  }
}))
.views(self => ({
  get totalPrice() {
    return self.items.reduce((sum, entry) => sum + entry.price, 0)
  }
}))