import {useEffect, useState} from "react";
import {
    collection,
    getDocs,
    getFirestore,
    query,
    where,
  } from "firebase/firestore";

const useExpenses = (id: string) => {
    const [data, setData] = useState<any[]>()

    useEffect(() => {
        if (!id) return;
        const db = getFirestore() as any;
        const q = query(
          collection(db, "expenses"),
          where("recordId", "==", id)
        );
    
        let data = [];
        getDocs(q).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            data.push(doc.data());
          });
          setData(data);
        });
      }, [id]);

      return {data};
}

export default useExpenses;