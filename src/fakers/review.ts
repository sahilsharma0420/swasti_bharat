import _ from "lodash";
import users, { type User } from "./users";
import dayjs from "dayjs";

export interface review {
  id: number;
  user: User;
  rating: number;
  comment: string;
  date: string;
}

const fakers = {
  fakeReviews() {
    const review: Array<review> = [
      {
        id: 1,
        user: users.fakeUsers()[0],
        rating: 4.5,
        comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet deleniti debitis corrupti illo aut at temporibus libero, quaerat voluptate dicta earum accusantium tempora facer",
        date: dayjs
          .unix(_.random(1586584776897, 1672333200000) / 1000)
          .format("DD MMMM YYYY"),
      },
      {
        id: 2,
        user: users.fakeUsers()[0],
        rating: 3.2,
        comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet deleniti debitis corrupti illo aut at temporibus libero, quaerat voluptate dicta earum accusantium tempora facer",
        date: dayjs
          .unix(_.random(1586584776897, 1672333200000) / 1000)
          .format("DD MMMM YYYY"),
      },
      {
        id: 3,
        user: users.fakeUsers()[0],
        rating: 5.0,
        comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet deleniti debitis corrupti illo aut at temporibus libero, quaerat voluptate dicta earum accusantium tempora facer",
        date: dayjs
          .unix(_.random(1586584776897, 1672333200000) / 1000)
          .format("DD MMMM YYYY"),
      },
      {
        id: 4,
        user: users.fakeUsers()[0],
        rating: 2.8,
        comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet deleniti debitis corrupti illo aut at temporibus libero, quaerat voluptate dicta earum accusantium tempora facer",
        date: dayjs
          .unix(_.random(1586584776897, 1672333200000) / 1000)
          .format("DD MMMM YYYY"),
      },
      {
        id: 5,
        user: users.fakeUsers()[0],
        rating: 4.0,
        comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet deleniti debitis corrupti illo aut at temporibus libero, quaerat voluptate dicta earum accusantium tempora facer",
        date: dayjs
          .unix(_.random(1586584776897, 1672333200000) / 1000)
          .format("DD MMMM YYYY"),
      },
   
    ];

    return _.shuffle(review);
  },
};

export default fakers;
