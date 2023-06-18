import { getFirestore, getDocs, collection } from 'firebase/firestore';
import { useEffect, useState } from 'react'

const useCustomers = () => {
    const [customers, setCustomers] = useState<any[]>([]);

    useEffect(() => {
        getAllCustomers().then(data => setCustomers(data))
   }, [])

   return {customers}
}

export default useCustomers

const getAllCustomers = async () => {
    const db = getFirestore();
    const querySnapshot = await getDocs(collection(db, "customer"));
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