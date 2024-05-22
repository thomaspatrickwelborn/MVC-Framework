import { Schema } from 'mongoose'

const PhotoSchema = new Schema({
  img: {
    src: {
      origin: String,
      path: String,
    },
    alt: String,
    width: Number,
    height: Number,
  }
})

export default PhotoSchema