import * as firebase from 'firebase';

function logError(err) {
  firebase.database().ref('/logs').push({
    message: err,
  });
}

export default logError;
