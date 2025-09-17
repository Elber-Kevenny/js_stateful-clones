'use strict';
/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const count = [];

  for (const n of actions) {
    const lastState = count.length > 0 ? count[count.length - 1] : state;
    let newState = { ...lastState };

    switch (n.type) {
      case 'addProperties':
        Object.assign(newState, n.extraData);
        break;

      case 'removeProperties':
        if (Array.isArray(n.keysToRemove)) {
          for (const key of n.keysToRemove) {
            delete newState[key];
          }
        } else {
          return 'keysToRemove is not a Array';
        }
        break;
      case 'clear':
        newState = {};
        break;

      default:
        throw new Error(`Unknown action type: ${n.type}`);
    }
    count.push(newState);
  }

  return count;
}

module.exports = transformStateWithClones;
