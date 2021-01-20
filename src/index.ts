import { connect } from "mongoose";
import { Schema, Document, model } from "mongoose";

interface User extends Document {
    name: string;
    email: string;
    password: string;
    secretSettings: Schema.Types.Mixed;
    secretObject: {
        child: {
            type: Schema.Types.Mixed;
        };
    };
}

(async function () {
    const mongooose = await connect("mongodb://localhost/mongoose-validation-example", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 1000
    });
    console.log("connected");
    await mongooose.connection.db.dropDatabase();
    console.log("drop");
    const UserSchema = new Schema<User>({
        name: String,
        email: String,
        password: {
            type: String
        },
        secretSettings: {
            type: Schema.Types.Mixed
        },
        secretObject: {
            child: {
                type: Schema.Types.Mixed
            }
        }
    });
    const User = model<User>("User", UserSchema);
    // test
    await User.create({
        name: {
            inject: "test" // assert
        },
        email: "joe@example.com",
        password: "secret",
        secretSettings: {
            age: 12
        }
    });

    const results = await User.find({});
    console.log(results);
})().catch((error) => {
    console.error(error);
    process.exit(1);
});
