import { Constants, SpecificCreator } from '../../../@types/redux-types';

const loadModalChunk: SpecificCreator<Constants.MODAL_LOAD_CHUNK> = (chunk: JSX.Element) => ({
  type: Constants.MODAL_LOAD_CHUNK,
  data: chunk,
});

export default loadModalChunk;
