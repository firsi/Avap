import {useEffect, useState} from "react";
import {
    collection,
    getDocs,
    getFirestore,
    query,
    where,
  } from "firebase/firestore";

const useAllRecords = () => {
        const [data, setData] = useState<any[]>()

        useEffect(() => {
            try{
                const db = getFirestore() as any;
                const q = query(
                    collection(db, "record")
                );
        
                let data: any[] = [];
                getDocs(q).then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        const record = doc.data();
                        data.push({
                          ...record,
                          id: doc.id,
                          date: new Date(record.date.seconds * 1000),
                        });
                    });
                    setData(data);
                });
            }catch(err){}
                
            }, [getFirestore]);

            return {data};
}

export default useAllRecords;