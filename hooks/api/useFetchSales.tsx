import {useEffect, useState} from "react";
import {
    collection,
    getDocs,
    getFirestore,
    query,
    where,
  } from "firebase/firestore";

const useFetchSales = (id: string) => {
    const [sales, setSales] = useState<any[]>()

    useEffect(() => {
        if (!id) return;
        const db = getFirestore() as any;
        const q = query(
          collection(db, "sales"),
          where("broodId", "==", id)
        );
    
        let data = [];
        getDocs(q).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            data.push(doc.data());
          });
          setSales(data);
        });
      }, [id]);

      return {salesByBrood: sales};
}

export default useFetchSales;