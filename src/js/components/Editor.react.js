import React from 'react';
import ReactDOM from 'react-dom';
import {
  convertToRaw,
  BlockMapBuilder,
  CharacterMetadata,
  ContentBlock,
  Modifier,
  genKey,
  Editor,
  EditorState,
  Entity,
  RichUtils
} from 'draft-js';
import {List, Repeat} from 'immutable';

import ImageBlock from './Editor/ImageBlock.react'
import AudioBlock from './Editor/AudioBlock.react'

/* ACCEPTED MEDIA TYPES:
* image/jpeg, image/jpg, image/gif, image/png,
* audio/mp3, audio/x-m4a, audio/m4a?, audio/flac
* video/???
* application/pdf
*/
const insertMedia = (editorState, file) => {
  const contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();

  const afterRemoval = Modifier.removeRange(
    contentState,
    selectionState,
    'backward'
  );

  const targetSelection = afterRemoval.getSelectionAfter();
  const afterSplit = Modifier.splitBlock(afterRemoval, targetSelection);
  const insertionTarget = afterSplit.getSelectionAfter();

  const asMedia = Modifier.setBlockType(afterSplit, insertionTarget, 'media');

  const entityKey = Entity.create(
    'TOKEN',
    'IMMUTABLE',
    {
      type: file.type,
      file: file
    }
  );

  const charData = CharacterMetadata.create({ entity: entityKey });

  const fragmentArray = [
    new ContentBlock({
      key: genKey(),
      type: 'media',
      text: ' ',
      characterList: List(Repeat(charData, 1))
    }),
    new ContentBlock({
      key: genKey(),
      type: 'unstyled',
      text: '',
      characterList: List()
    })
  ];

  const fragment = BlockMapBuilder.createFromArray(fragmentArray);

  const withMedia = Modifier.replaceWithFragment(
    asMedia,
    insertionTarget,
    fragment
  );

  const newContent = withMedia.merge({
    selectionBefore: selectionState,
    selectionAfter: withMedia.getSelectionAfter().set('hasFocus', true)
  });

  return EditorState.push(editorState, newContent, 'insert-fragment');
}

class MyEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = { editorState: EditorState.createEmpty() };

    this.focus = () => this.refs.editor.focus();
    this.clear = () => this._clear();
    this.exportJSON = () => this._exportJSON();
    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = (command) => this._handleKeyCommand(command);

    this.blockRenderer = (block) => {
      if (block.getType() === 'media') {
        const type = Entity.get(block.getEntityAt(0)).getData()['type'];
        if (type == "image/jpeg" || type == "image/jpg" || type == "image/gif" || type == "image/png")
          return { component: ImageBlock }
        if (type == "audio/mp3")
          return { component: AudioBlock }
      }
      return null;
    }

    this.blockStyler = (block) => {
      if (block.getType() === 'media') {
        return 'image';
      }
      if (block.getType() === 'unstyled') {
        return 'paragraph';
      }
      return null;
    }

    this._insertMedia = (media) => {
      this.setState({
        editorState: insertMedia(this.state.editorState, media)
      });
    };
  }

  _handleKeyCommand(command) {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _clear() {
    this.state = {
      editorState: EditorState.createEmpty()
    };
  }

  _exportJSON() {
    console.log("exporting json")
    const content = this.state.editorState.getCurrentContent();
    const blocks = content.getBlockMap().toArray();
    if (!blocks)
      return
    if (blocks.length == 1 && blocks[0].text == "")
      return

    let json = [];

    for (var i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      const type = block.getType();

      if (type == 'unstyled') {
        json.push({
          type: 'text/plain',
          data: block.getText()
        })
      }

      // styled -> text/markdown

      else if (type == 'media') {
        const file = Entity.get(block.getEntityAt(0)).getData()['file'];
        json.push({
          type: file.type,
          file: file
        })
      }
    }
    return json;
  }

  render() {
    const {editorState} = this.state;
    return (
      <div id="editor-container" className="center black-90 serif">
        <Editor
          editorState={editorState}
          blockRendererFn={this.blockRenderer}
          blockStyleFn={this.blockStyler}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
          ref='editor'/>
      </div>
    )
  }
}

module.exports = MyEditor;
