'use strict';

import React from 'react';
import {Entity} from 'draft-js';
import AudioPlayer from '../AudioPlayer.react'

export default ({ block }) => {
  const audioContent = Entity.get(block.getEntityAt(0)).getData()['source'];
  return <AudioPlayer
    src={audioContent}
    preload='none'
    />;
};
