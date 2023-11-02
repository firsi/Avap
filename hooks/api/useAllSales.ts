import {useEffect, useState} from "react";
import {
    collection,
    getDocs,
    getFirestore,
    query,
    where,
  } from "firebase/firestore";

const useAllSales = () => {
    const [sales, setSales] = useState<any[]>()

    useEffect(() => {
        try{
            const db = getFirestore() as any;
            const q = query(
              collection(db, "sales"),
            );
        
            let data: Record<string, any>[] = [];
            getDocs(q).then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                const sale = doc.data();
                            data.push({
                              ...sale,
                              id: doc.id,
                              date: new Date(sale.date.seconds * 1000),
                            });
              });
              setSales(data);
            });
        }catch(err){}
        
      }, [getFirestore]);

      return {data: sales};
}

export default useAllSales;