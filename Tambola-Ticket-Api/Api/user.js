import User from "../models/users-create.js";

export const getAllUser = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        console.log(err);
    }
    if (!users) {
        return res.status(404).json({ message: "No users found"});
    }
    return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
    const { name, email, passward } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        return console.log(err);
    }
    if (existingUser) {
        return res
            .status(400)
            .json({ message: "User Allery Exists! Login Instead" });
    }
    const hashedPassward = bcrypt.hashSync(passward);

    const user = new User({
        name,
        email,
        passward: hashedPassward,
        users: [],
    });

    try {
        await user.save();
    } catch (err) {
        return console.log(err);
    }
    return res.status(201).json({ user });
};

export const login = async (req, res, next) => {
    const { email, passward } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        return console.log(err);
    }
    if (!existingUser) {
        return res.status(400).json({ message: "coudn't Find User By This Email" });
    }

    const isPasswardCorrect = bcrypt.compareSync(passward, existingUser.passward);
    if (!isPasswardCorrect) {
        return res.status(400).json({ message: "Incorrect passward"});
    }
    return res
        .status(200)
        .json({ message: "Login Successfull", user: existingUser });
};