'use strict';
/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const contagem = [];

  for (const n of actions) {
    const lastState =
      contagem.length > 0 ? contagem[contagem.length - 1] : state;
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
