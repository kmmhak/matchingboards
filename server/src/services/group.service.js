import Group from '../models/group.model.js';

const create = async (name, description, creatorId, isprivate) => {
  try {
    const newGroup = {
      name,
      description,
      creatorId,
      isprivate,
    };
    const createdGroup = await Group.create({ ...newGroup });
    return createdGroup;
  } catch (error) {
    throw Error(`Error trying to create group ${error.message}`);
  }
};

export default create;
