const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const TrackScheme = new mongoose.Schema(
    {
        name: {
            type: String
        },
        album: {
            type: String
        },
        cover: {
            type: String,
            validate: {
                validator: (req) => {
                    return true; //TODO crear patrón
                },
                message: "ERROR_URL",
            }
        },
        artist: {
            name: {
                type: String,
            },
            nickname: {
                type: String
            },
            nationality: {
                type: String
            }
        },
        duration: {
            start: {
                type: Number
            },
            end: {
                type: Number
            }
        },
        mediaId: {
            type: mongoose.Types.ObjectId // Estructura (string) especial de mongo
        }
    },
    {
        timestamps: true, // TODO createdAt, updatedAt
        versionKey: false
    }
)
TrackScheme.plugin(mongooseDelete, {overrideMethods: "all"})
module.exports = mongoose.model("tracksModel", TrackScheme)