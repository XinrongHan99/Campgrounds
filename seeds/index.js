const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: '62d716b8e1514e03ba06e5fa',
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum et maiores ipsam, debitis nostrum molestias vero at culpa maxime provident temporibus illo quas ipsum veniam non dolores amet rerum quia?',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dvgnkra8i/image/upload/v1658945081/YelpCamp/zrmdvffgp4ucsvjfn8hj.webp',
                    filename: 'YelpCamp/zrmdvffgp4ucsvjfn8hj',
                },
                {
                    url: 'https://res.cloudinary.com/dvgnkra8i/image/upload/v1658945082/YelpCamp/plbtbg1kyzygjauxdzwt.jpg',
                    filename: 'YelpCamp/plbtbg1kyzygjauxdzwt',
                }
            ]
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close()
})