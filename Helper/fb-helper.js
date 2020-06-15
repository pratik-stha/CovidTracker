import * as firebase from 'firebase';
import 'firebase/database';
import {firebaseConfig} from '../Helper/fb-config';

export function initSearchHistoryDB(){

    firebase.initializeApp(firebaseConfig);
}

export function storeSearchItem(item){
    firebase.database().ref('SearchData/').push(item);
}

export function setupDataListener(key){
    firebase
        .database()
        .ref(`HistoryData/${key}`)
        .on('value',(snapshot)=>{
            console.log('data listener fires up with ',snapshot);
        });


}
export function updateSearch(item) {
  const key = item.id;
  delete item.id;
  firebase.database().ref(`HistoryData/${key}`).set(item);
}

export function deleteSearch(item) {
  firebase.database().ref(`HistoryData/${item.id}`).remove();
}

export function setupHistoryListener(updateFunc) {
    console.log('setupHistoryListener called');
    firebase
      .database()
      .ref('HistoryData/')
      .on('value', (snapshot) => {
        console.log('setupHistoryListener fires up with: ', snapshot);
        if (snapshot?.val()) {
          const fbObject = snapshot.val();
          const newArr = [];
          Object.keys(fbObject).map((key, index) => {
            console.log(key, '||', index, '||', fbObject[key]);
            newArr.push({ ...fbObject[key], id: key });
          });
          updateFunc(newArr);
        } else {
          updateFunc([]);
        }
      });
  }