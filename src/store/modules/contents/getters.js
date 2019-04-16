export const ALL_CONTENTS = 'ALL_CONTENTS';
export const BY_ID = 'BY_ID';
export const BOARDS = 'BOARDS';
export const IS_LIKE = 'ISLIKE';
export const IS_DISLIKE = 'DISLIKE';

export default {
  [ALL_CONTENTS]: state => state.contents.filter(c => c.type.name === 'DOGDRIP'),
  [BY_ID]: (state) => (id) => state.contents.find(c => c.permanent_id === id),
  [BOARDS]: state => state.contents.filter(c => c.type.name === 'SSCROLL_BOARD'),
  [IS_LIKE]: (state) => (pid, nickname) => { 
    let c = state.contents.find(c => c.permanent_id === pid);
    return c.ups.find(u => u.nickname === nickname) ? true : false;
  },
  [IS_DISLIKE]: (state) => (pid, nickname) => {
    let c = state.contents.find(c => c.permanent_id === pid);
    return c.downs.find(d => d.nickname === nickname) ? true : false;
  },
};