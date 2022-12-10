import { getFirestore, query, collection, getDocs, doc, getDoc } from "firebase/firestore";
import moment from "moment";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const useBatchList = (recordId?: string) => {
    const router = useRouter();
    const [batchList, setBatchList] = useState<Record<string, any>[]>();
    useEffect(() => {

        const fetchBatchList = async () => {
            if (!router.isReady) return;
            const data = [];
            const db = getFirestore();
            const record = await fetchRecord();
            const q = query(collection(db, `record/${router.query?.id}/batch`));
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                data.push(doc.data());
            });
            const batchData = data.map((item, index) => ({
                ...item,
                key: moment(item.date, "YYYY-MM-DD")
                .startOf("day")
                .diff(moment.unix(record?.date?.seconds).startOf("day"), "days") + 1,
                age: moment(item.date, "YYYY-MM-DD")
                    .startOf("day")
                    .diff(moment.unix(record?.date?.seconds).startOf("day"), "days") + 1,
            })).sort((a,b) => moment(a.date).valueOf() - moment(b.date).valueOf());
            setBatchList(batchData);
        };

        const fetchRecord = async () => {
            if (!router.isReady) return;
            const db = getFirestore();
            const q = doc(db, "record", `${router.query.id}`);
            const docSnapshot = await getDoc(q);

            return docSnapshot.data();
        };

        fetchBatchList();
    }, [router.isReady]);

    return { batchList }
}

export default useBatchList;