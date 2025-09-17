'use strict';
/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const contagem = [{ ...state }];

  for (const n of actions) {
    const lastState = contagem[contagem.length - 1];
    let newState = { ...lastState };

    switch (n.type) {
      case 'addProperties':
        Object.assign(newState, n.extraData);
        break;

      case 'removeProperties':
        for (const key of n.keysToRemove) {
          delete newState[key];
        }
        break;

      case 'clear':
        newState = {};
        break;
    }
    contagem.push(newState);
  }

  return contagem;
}

module.exports = transformStateWithClones;
