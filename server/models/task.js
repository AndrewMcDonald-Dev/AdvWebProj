const userModel = require('./user');
const { StatusCodes } = require('http-status-codes');
const { db, ObjectId } = require('./mongo');

const taskCollection = db.db(process.env.DB_NAME).collection('tasks');

const list = [
    {
        title: 'Make Bulma great again',
        isCompleted: true,
        assignedTo: 'cool',
        createdBy: 'kool',
        dueDate: new Date().getTime() + 10000,
        timeCreated: new Date(),
    },
    {
        title: 'Add some more features',
        isCompleted: false,
        assignedTo: 'cool',
        createdBy: 'cool',
        dueDate: new Date().getTime() + 50000,
        timeCreated: new Date(),
    },
    {
        title: 'Make a github account',
        isCompleted: false,
        assignedTo: 'kool',
        createdBy: 'cool',
        dueDate: new Date().getTime() + 30000,
        timeCreated: new Date(),
    },
    {
        title: 'Learn how to use github',
        isCompleted: false,
        assignedTo: 'awesome',
        createdBy: 'kool',
        dueDate: new Date().getTime() + 40000,
        timeCreated: new Date(),
    },
    {
        title: 'add a .gitignore file',
        isCompleted: false,
        assignedTo: 'awesome',
        createdBy: 'awesome',
        dueDate: new Date().getTime() + 20000,
        timeCreated: new Date(),
    },
];

const includeUser = async (task) => ({
    ...task,
    createdBy: await userModel.getByHandle(task.createdBy),
    assignedTo: await userModel.getByHandle(task.assignedTo),
});

const get = async (id) => {
    const task = await taskCollection.findOne({ _id: new ObjectId(id) });
    if (!task)
        throw { statusCode: StatusCodes.NOT_FOUND, message: 'task not found' };
    return await includeUser(task);
};

const remove = async (id) => {
    const task = await taskCollection.findOneAndDelete({
        _id: new ObjectId(id),
    });
    return await includeUser(task.value);
};
const update = async (id, newtask) => {
    newtask = await taskCollection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: newtask },
        { returnDocument: 'after' }
    );
    return await includeUser(newtask.value);
};

const seed = () => taskCollection.insertMany(list);

module.exports = {
    async create(task) {
        task = {
            ...task,
            assignedTo: task.assignedTo.handle,
            createdBy: task.createdBy.handle,
            timeCreated: new Date(),
        };
        const result = await taskCollection.insertOne(task);
        return await get(result.insertedId);
    },
    remove,
    update,
    seed,
    taskCollection,
    async getList() {
        const tasks = await taskCollection.find().toArray();
        return Promise.all(tasks.map((task) => includeUser(task)));
    },
};

module.exports.get = get;
