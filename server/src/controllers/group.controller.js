import { handleResponse } from '../lib/utils.js';
import * as Group from '../services/group.service';

const createGroup = async (req, res) => {
  const { name, description, isprivate } = req.body;
  const { id } = req.user;
  await handleResponse(req, res, Group.create, [
    name,
    description,
    id,
    isprivate,
  ]);
};

export default createGroup;
