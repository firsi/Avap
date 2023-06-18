import { getFirestore, getDocs, collection } from 'firebase/firestore';
import { useEffect, useState } from 'react'

const useFetchBreeds = () => {
    const [breeds, setBreeds] = useState<any[]>([]);

    useEffect(() => {
        getAllBreeds().then(data => setBreeds(data))
   }, [])

   return {breeds}
}

export default useFetchBreeds

const getAllBreeds = async () => {
    const db = getFirestore();
    const querySnapshot = await getDocs(collection(db, "breed"));
    let data = [];
    querySnapshot.forEach((doc) => {
        data.push({id: doc.id, ...doc.data()})
    });
    return data;
    // const db = getFirestore();
    // const q = doc(db, "record", `${router.query.id}`);
    // const docSnapshot = await getDoc(q);

    // return docSnapshot.data();
};