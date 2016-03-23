'use strict';

import React from 'react';
import {Entity} from 'draft-js';

export default ({ block }) => {
  console.log(block)
  console.log(block.getEntityAt(0))
  const file = Entity.get(block.getEntityAt(0)).getData()['file'];
  const source = URL.createObjectURL(file);
  return <img src={source} />;
};
