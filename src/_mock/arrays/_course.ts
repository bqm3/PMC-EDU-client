import _mock from '../_mock';
import { randomInArray } from '../utils';


export const _courseList = [...Array(12)].map((_, index) => ({
    id: _mock.id(index),
    title: _mock.text.title(index),
    description: _mock.text.description(index),
    link: "https://www.youtube.com/embed/U6QLCwDxnns",
    quantity: _mock.number.rating(index) * 10,
    cover: `/assets/images/rooms/room_${index + 1}.jpg`,
  }));