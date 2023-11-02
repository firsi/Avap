import {useEffect, useState} from "react";
import {
    collection,
    getDocs,
    getFirestore,
    query,
    where,
  } from "firebase/firestore";

const useAllExpenses = () => {
        const [data, setData] = useState<any[]>()

        useEffect(() => {
                try{
                    const db = getFirestore() as any;
                const q = query(
                    collection(db, "expenses")
                );
        
                let data: any[] = [];
                getDocs(q).then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        data.push(doc.data());
                    });
                    setData(data);
                });
                }
                catch(err){
                    console.log(err);
                }
            }, []);

            return {data};
}

export default useAllExpenses;