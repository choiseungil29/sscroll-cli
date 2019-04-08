export const ALL_CONTENTS = 'ALL_CONTENTS';
export const BY_ID = 'BY_ID';

export default {
  [ALL_CONTENTS]: state => state.contents,
  [BY_ID]: (state) => (id) => state.contents.find(c => c.permanent_id === id),
};